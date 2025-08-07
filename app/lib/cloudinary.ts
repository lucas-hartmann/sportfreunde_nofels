const cloudName = 'YOUR_CLOUD_NAME';
const folder = 'YOUR_FOLDER_NAME';
const apiKey = 'YOUR_API_KEY';
const apiSecret = 'YOUR_API_SECRET';

export async function fetchCloudinaryImages() {
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/image`;

  const res = await fetch(`${url}?prefix=${folder}/&max_results=100`, {
    headers: {
      Authorization: 'Basic ' + Buffer.from(`${apiKey}:${apiSecret}`).toString('base64'),
    },
    next: { revalidate: 60 }, // ISR (optional)
  });

  const data = await res.json();

  return data.resources.map((img: any) => ({
    id: img.asset_id,
    public_id: img.public_id,
    width: img.width,
    height: img.height,
    format: img.format,
    src: img.secure_url.replace('/upload/', '/upload/w_800,q_auto,f_auto/'),
    fullSrc: img.secure_url,
    blurDataUrl: img.secure_url.replace('/upload/', '/upload/w_20,q_10,f_auto/'),
  }));
}
