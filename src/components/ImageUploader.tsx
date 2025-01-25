import React, { useState, useRef } from "react";
import { Upload, Image as ImageIcon, Loader2 } from "lucide-react";
import { ClassificationResult } from "../types";

export default function ImageUploader() {
  const [image, setImage] = useState<string | null>(null);
  const [results, setResults] = useState<ClassificationResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset states
    setError(null);
    setResults([]);

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => setImage(e.target?.result as string);
    reader.readAsDataURL(file);

    // Prepare form data
    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);
      const response = await fetch("http://localhost:8000/classify", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to classify image");
      }

      setResults(data.results);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to classify image");
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && fileInputRef.current) {
      fileInputRef.current.files = e.dataTransfer.files;
      handleImageUpload({ target: { files: e.dataTransfer.files } } as any);
    }
  };

  const preventDefaults = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
        onDrop={handleDrop}
        onDragOver={preventDefaults}
        onDragEnter={preventDefaults}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          className="hidden"
          id="image-upload"
        />

        {!image && (
          <div className="space-y-4">
            <div className="flex justify-center">
              <Upload className="h-12 w-12 text-gray-400" />
            </div>
            <label
              htmlFor="image-upload"
              className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Choose Image
            </label>
            <p className="text-gray-500">or drag and drop</p>
          </div>
        )}

        {image && (
          <div className="space-y-6">
            <div className="relative max-w-md mx-auto">
              <img
                src={image}
                alt="Preview"
                className="rounded-lg shadow-lg max-h-96 mx-auto"
              />
              <label
                htmlFor="image-upload"
                className="absolute bottom-4 right-4 cursor-pointer bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
              >
                <ImageIcon className="h-5 w-5 text-gray-600" />
              </label>
            </div>

            {loading && (
              <div className="flex items-center justify-center space-x-2 text-indigo-600">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Analyzing image...</span>
              </div>
            )}

            {error && (
              <div className="text-red-500 bg-red-50 p-3 rounded-md">
                {error}
              </div>
            )}

            {results.length > 0 && (
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-4">
                  Classification Results
                </h3>
                <div className="space-y-3">
                  {results.map((result, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span className="text-gray-700 capitalize">
                        {result.label}
                      </span>
                      <div className="flex items-center">
                        <div className="w-48 bg-gray-200 rounded-full h-2.5 mr-2">
                          <div
                            className="bg-indigo-600 h-2.5 rounded-full"
                            style={{ width: `${result.confidence * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-500">
                          {(result.confidence * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
