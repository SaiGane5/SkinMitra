import React from 'react';
import ImageUploader from './components/ImageUploader';
import { Camera } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3">
            <Camera className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">Image Classifier</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <ImageUploader />
      </main>

      <footer className="bg-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            Powered by TensorFlow.js • Built with React
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;