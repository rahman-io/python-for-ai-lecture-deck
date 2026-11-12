export interface GenerateImageParams {
  prompt: string;
  aspectRatio?: '1:1' | '3:4' | '4:3' | '9:16' | '16:9';
  imageSize?: '1K' | '2K' | '4K';
  baseImage?: string;
  editInstructions?: string;
}

export async function generateSlideImage(params: GenerateImageParams): Promise<{ imageUrl: string; text?: string }> {
  const response = await fetch('/api/gemini/generate-image', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || errorData.details || 'Failed to generate image');
  }

  const data = await response.json();
  return data;
}
