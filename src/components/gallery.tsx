"use client";

import Image from "next/image";
import ImageMenu from "./image-menu";

const ImageGallery = ({
  bucketName,
  keys,
}: {
  bucketName: string;
  keys: (string | undefined)[] | undefined;
}) => {
  if (!keys) return <p>No keys found.</p>;

  const filteredKeys = keys?.filter((key): key is string => !!key);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredKeys.map((key) => (
          <div
            key={key}
            id={key}
            className="aspect-square relative overflow-hidden rounded-lg"
          >
            <ImageMenu id={key}>
              <Image
                className="border rounded-lg"
                src={`https://${bucketName}.s3.us-east-1.amazonaws.com/${key}`}
                alt={key}
                layout="fill"
                objectFit="cover"
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://dummyimage.com/400x400/000/fff")
                }
              />
            </ImageMenu>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
