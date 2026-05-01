from fastapi import FastAPI, File, UploadFile

app = FastAPI(title="KAALIX Wardrobe ML Service", version="0.1.0")


def detect_category(name: str) -> str:
    source = name.lower()
    if "tshirt" in source or "tee" in source:
        return "T-shirts"
    if "shirt" in source or "top" in source:
        return "Shirts"
    if "jean" in source:
        return "Jeans"
    if "pant" in source or "trouser" in source:
        return "Pants"
    if "shoe" in source or "sneaker" in source:
        return "Shoes"
    if "watch" in source:
        return "Watches"
    if "jacket" in source:
        return "Jackets"
    if "hoodie" in source:
        return "Hoodies"
    if any(word in source for word in ["belt", "cap", "bag", "glass"]):
        return "Accessories"
    return "Others"


def detect_color(name: str) -> str:
    source = name.lower()
    for color in ["black", "white", "blue", "navy", "grey", "gray", "red", "green", "brown", "beige", "cream"]:
        if color in source:
            return "Grey" if color == "gray" else color.title()
    return "Black"


@app.post("/ml/wardrobe/process-image")
async def process_image(file: UploadFile = File(...)):
    """MVP placeholder.

    Replace this function later with YOLOv8 detection, SAM segmentation,
    rembg background removal, and color extraction. The API contract is
    already compatible with the Spring Boot wardrobe service.
    """
    category = detect_category(file.filename or "wardrobe-item.png")
    color = detect_color(file.filename or "")
    return [
        {
            "name": f"{color} {category.rstrip('s')}",
            "category": category,
            "color": color,
            "imageUrl": "",
            "confidence": 0.72,
        }
    ]
