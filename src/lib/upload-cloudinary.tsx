export async function uploadImageToCloudinary(file: File): Promise<string | null> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'ml_default');
  // unsigned upload cloud -> unauthenticated
  const response = await fetch('https://api.cloudinary.com/v1_1/dpvxkt76d/image/upload', {
    method: 'POST',
    body: formData,
  });

  const result = await response.json();
  if (response.ok) return result.url;
  return null
}