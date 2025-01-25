# Image Classification Web Application

A web-based image classification system that identifies objects in images using TensorFlow.js and MobileNet.

## Features

- Real-time image classification
- Drag and drop image upload
- Preview of uploaded images
- Confidence scores for predictions
- Responsive design
- Error handling and loading states

## Technical Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- Lucide React (icons)

### Backend
- Node.js
- Express
- TensorFlow.js
- Multer (file handling)

## Setup Instructions

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## API Documentation

### POST /classify
Classifies an uploaded image.

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body: Form data with 'image' field containing the image file

**Response:**
```json
{
  "results": [
    {
      "label": "string",
      "confidence": number
    }
  ]
}
```

## Known Limitations

- Maximum file size: 5MB
- Supported formats: JPEG, PNG
- Requires internet connection for initial model loading
- Classification limited to ImageNet categories

## Future Improvements

- Add support for custom models
- Implement image preprocessing options
- Add batch processing capability
- Implement caching for faster predictions
- Add user authentication
- Add history of classifications
- Implement progressive image loading
- Add export functionality for results