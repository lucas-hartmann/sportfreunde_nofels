// app/gallery/page.tsx
import Gallery from '../components/GalleryNew';
import { fetchCloudinaryImages } from '../lib/cloudinary';

export default async function GalleryPage() {
  const images = await fetchCloudinaryImages();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">📸 Cloudinary Gallery</h1>
      <Gallery images={images} />
    </div>
  );
}
