$ErrorActionPreference = 'Stop'

$wrapperRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = Split-Path -Parent $wrapperRoot
$sdkRoot = Join-Path $wrapperRoot 'android-sdk'
$buildRoot = Join-Path $wrapperRoot 'build'
$classesRoot = Join-Path $buildRoot 'classes'
$dexRoot = Join-Path $buildRoot 'dex'
$distRoot = Join-Path $wrapperRoot 'dist'
$toolsZip = Join-Path $wrapperRoot 'commandlinetools-win-14742923_latest.zip'
$cmdlineTemp = Join-Path $wrapperRoot 'cmdline-tools-temp'
$cmdlineLatest = Join-Path $sdkRoot 'cmdline-tools\latest'
$manifestPath = Join-Path $wrapperRoot 'AndroidManifest.xml'
$sourceRoot = Join-Path $wrapperRoot 'src'
$assetsRoot = Join-Path $projectRoot 'src\main\resources\static'
$keystorePath = Join-Path $wrapperRoot 'debug.keystore'
$unsignedApk = Join-Path $distRoot 'rishi-system-unsigned.apk'
$alignedApk = Join-Path $distRoot 'rishi-system-aligned.apk'
$signedApk = Join-Path $distRoot 'rishi-system-debug.apk'

$cmdlineVersion = '14742923'
$platformVersion = 'android-34'
$buildToolsVersion = '34.0.0'
$javaSourceLevel = '8'

function Ensure-Directory([string]$path) {
    if (-not (Test-Path $path)) {
        New-Item -ItemType Directory -Path $path -Force | Out-Null
    }
}

Ensure-Directory $sdkRoot
Ensure-Directory $buildRoot
Ensure-Directory $classesRoot
Ensure-Directory $dexRoot
Ensure-Directory $distRoot

$sdkManagerPath = Join-Path $cmdlineLatest 'bin\sdkmanager.bat'

if (-not (Test-Path $sdkManagerPath)) {
    Write-Host 'Downloading Android command-line tools...'
    $downloadUrl = "https://dl.google.com/android/repository/commandlinetools-win-$cmdlineVersion`_latest.zip"
    Invoke-WebRequest -Uri $downloadUrl -OutFile $toolsZip

    if (Test-Path $cmdlineTemp) {
        Remove-Item $cmdlineTemp -Recurse -Force
    }

    Expand-Archive -Path $toolsZip -DestinationPath $cmdlineTemp -Force
    Ensure-Directory $cmdlineLatest
    Copy-Item (Join-Path $cmdlineTemp 'cmdline-tools\*') $cmdlineLatest -Recurse -Force
}

Write-Host 'Accepting Android SDK licenses...'
$licenseAnswers = 1..30 | ForEach-Object { 'y' }
$licenseAnswers | & $sdkManagerPath "--sdk_root=$sdkRoot" --licenses | Out-Null

Write-Host 'Installing Android SDK packages...'
& $sdkManagerPath "--sdk_root=$sdkRoot" `
    'platform-tools' `
    "platforms;$platformVersion" `
    "build-tools;$buildToolsVersion"

$androidJar = Join-Path $sdkRoot "platforms\$platformVersion\android.jar"
$aapt2Path = Join-Path $sdkRoot "build-tools\$buildToolsVersion\aapt2.exe"
$d8Path = Join-Path $sdkRoot "build-tools\$buildToolsVersion\d8.bat"
$zipalignPath = Join-Path $sdkRoot "build-tools\$buildToolsVersion\zipalign.exe"
$apksignerPath = Join-Path $sdkRoot "build-tools\$buildToolsVersion\apksigner.bat"

if (Test-Path $classesRoot) {
    Remove-Item $classesRoot -Recurse -Force
}
if (Test-Path $dexRoot) {
    Remove-Item $dexRoot -Recurse -Force
}

Ensure-Directory $classesRoot
Ensure-Directory $dexRoot
Ensure-Directory $distRoot

Write-Host 'Compiling Java sources...'
$javaSources = Get-ChildItem -Path $sourceRoot -Recurse -Filter *.java | Select-Object -ExpandProperty FullName
& javac `
    -source $javaSourceLevel `
    -target $javaSourceLevel `
    -Xlint:-options `
    -bootclasspath $androidJar `
    -classpath $androidJar `
    -d $classesRoot `
    $javaSources

Write-Host 'Building DEX...'
$classFiles = Get-ChildItem -Path $classesRoot -Recurse -Filter *.class | Select-Object -ExpandProperty FullName
& $d8Path --min-api 24 --output $dexRoot $classFiles

Write-Host 'Packaging unsigned APK...'
if (Test-Path $unsignedApk) {
    Remove-Item $unsignedApk -Force
}
if (Test-Path $alignedApk) {
    Remove-Item $alignedApk -Force
}
if (Test-Path $signedApk) {
    Remove-Item $signedApk -Force
}

& $aapt2Path link `
    --manifest $manifestPath `
    -I $androidJar `
    -A $assetsRoot `
    --min-sdk-version 24 `
    --target-sdk-version 34 `
    -o $unsignedApk

Copy-Item (Join-Path $dexRoot 'classes.dex') (Join-Path $buildRoot 'classes.dex') -Force
Push-Location $buildRoot
& jar uf $unsignedApk classes.dex
Pop-Location

Write-Host 'Aligning APK...'
& $zipalignPath -f 4 $unsignedApk $alignedApk

if (-not (Test-Path $keystorePath)) {
    Write-Host 'Generating debug keystore...'
    & keytool `
        -genkeypair `
        -v `
        -keystore $keystorePath `
        -storepass android `
        -keypass android `
        -alias androiddebugkey `
        -dname 'CN=Android Debug,O=Android,C=US' `
        -keyalg RSA `
        -keysize 2048 `
        -validity 10000
}

Write-Host 'Signing APK...'
& $apksignerPath sign `
    --ks $keystorePath `
    --ks-pass pass:android `
    --key-pass pass:android `
    --out $signedApk `
    $alignedApk

Write-Host 'Verifying APK...'
& $apksignerPath verify $signedApk

Write-Host "APK_READY=$signedApk"
