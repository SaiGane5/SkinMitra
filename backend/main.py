from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import tensorflow as tf
import numpy as np
from PIL import Image
import io

app = FastAPI(title="Image Classification API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the MobileNet model
model = None

async def load_model():
    global model
    model = tf.keras.applications.MobileNetV2(weights="imagenet")
    print("Model loaded successfully")

@app.on_event("startup")
async def startup_event():
    await load_model()

@app.post("/classify")
async def classify_image(image: UploadFile = File(...)):
    try:
        # Read the image file
        contents = await image.read()
        pil_image = Image.open(io.BytesIO(contents)).convert("RGB")
        pil_image = pil_image.resize((224, 224))
        
        # Preprocess the image
        img_array = tf.keras.preprocessing.image.img_to_array(pil_image)
        img_array = np.expand_dims(img_array, axis=0)
        img_array = tf.keras.applications.mobilenet_v2.preprocess_input(img_array)
        
        # Make predictions
        predictions = model.predict(img_array)
        decoded_predictions = tf.keras.applications.mobilenet_v2.decode_predictions(predictions, top=3)[0]
        
        # Filter predictions for dog and cat
        dog_confidence = 0.0
        cat_confidence = 0.0
        for pred in decoded_predictions:
            if "dog" in pred[1]:
                dog_confidence += pred[2]
            elif "cat" in pred[1]:
                cat_confidence += pred[2]
        
        # Format the response to match frontend's ClassificationResult type
        response = {
            "results": [
                {"label": "dog", "confidence": dog_confidence},
                {"label": "cat", "confidence": cat_confidence}
            ]
        }
        return JSONResponse(content=response)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))