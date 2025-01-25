export interface ClassificationResult {
  label: string;
  confidence: number;
}

export interface UploadResponse {
  results: ClassificationResult[];
  error?: string;
}