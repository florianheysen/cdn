import Image from "next/image";

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  if (!images) return <p>No images found.</p>;
  return (
    <div>
      {images && images.length === 0 ? (
        <p>No images found.</p>
      ) : (
        <ul>
          {images?.map((imageKey) => (
            <li key={imageKey}>
              <Image
                src={`https://aws-nextjs-2-florianheysen-mybucket-btbdbzaf.s3.us-east-1.amazonaws.com/${imageKey}`}
                alt={imageKey}
                style={{ width: "200px", height: "auto" }}
                width={200}
                height={200}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ImageGallery;
