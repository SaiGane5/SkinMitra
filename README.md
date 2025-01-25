# Image Classification Web Application

A web-based image classification system that identifies whether an image contains a dog or a cat using TensorFlow and MobileNet.

## How the System Works

### Frontend

The frontend is built with React and TypeScript. It allows users to upload an image, which is then sent to the backend for classification. The frontend displays the classification results, showing the confidence scores for "dog" and "cat".

### Backend

The backend is built with FastAPI and TensorFlow. It receives the uploaded image, preprocesses it, and uses a pre-trained MobileNet model to classify the image. The backend then returns the confidence scores for "dog" and "cat" to the frontend.

## Technical Stack

### Frontend

- React
- TypeScript
- Tailwind CSS
- Lucide React (icons)

### Backend

- FastAPI
- TensorFlow
- Pillow (for image processing)
- Uvicorn (ASGI server)

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

The frontend will be available at `http://localhost:5173.`

## Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Create a virtual environment:

```bash
python -m venv venv
```

3. Activate the virtual environment:

```bash
source .venv/bin/activate
```

4. Install dependencies:

```bash
pip install -r requirements.txt
```

5. Start the server:

```bash
uvicorn main:app --reload
```

The backend will be available at `http://localhost:8000`.

## Running the Application

- Ensure both the frontend and backend servers are running.
- Open your browser and navigate to `http://localhost:5173`.
- Upload an image to see the classification results.
