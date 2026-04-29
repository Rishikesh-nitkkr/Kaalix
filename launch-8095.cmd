@echo off
cd /d R:\project\system
java -jar target\rishi-system-1.0.0.jar --server.port=8095 --spring.profiles.active=default 1>app-8095.out.log 2>app-8095.err.log
