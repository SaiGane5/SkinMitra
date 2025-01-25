# Backend API Documentation

**Endpoint**: `/classify`

**Method**: `POST`

**Description**: Receives an uploaded image, preprocesses it, and classifies it as either "dog" or "cat" using a pre-trained MobileNet model.

**Request**:

- Content-Type: multipart/form-data
- Body: An image file with the key image.

**Response**:

- Content-Type: application/json
- Body:

```json
{
  "results": [
    { "label": "dog", "confidence": 0.85 },
    { "label": "cat", "confidence": 0.15 }
  ]
}
```
