"use client";

import Image from "next/image";
import ObjectMenu from "@/components/object-menu";
import { Badge } from "@/components/ui/badge";

const ImageGallery = ({
  bucketName,
  objects,
  refetch,
}: {
  bucketName: string;
  objects: {
    key: string | undefined;
    contentType: string | undefined;
    size: number | undefined;
    lastModified: string | undefined;
    fileName: string | undefined;
  }[];
  refetch: () => void;
}) => {
  if (!objects) return <p>No keys found.</p>;

  return (
    <div className="pb-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {objects.map((object) => (
          <div
            key={object.key}
            className="group aspect-square relative overflow-hidden border rounded-lg  ring-0 ring-offset-0 ring-primary/20 hover:ring-2 hover:border-primary/20 transition-all bg-primary/10"
          >
            <ObjectMenu
              object={object}
              refetch={refetch}
              bucketName={bucketName}
            >
              {object.contentType?.startsWith("image/") ? (
                <Image
                  src={`https://${bucketName}.s3.us-east-1.amazonaws.com/${object.key}`}
                  alt={object.key!}
                  layout="fill"
                  objectFit="cover"
                  onError={(e) =>
                    (e.currentTarget.src =
                      "https://dummyimage.com/400x400/000/fff")
                  }
                />
              ) : (
                <video
                  muted
                  className="w-full h-full"
                  src={`https://${bucketName}.s3.us-east-1.amazonaws.com/${object.key}`}
                />
              )}
            </ObjectMenu>
            <Badge
              variant="secondary"
              className="absolute bottom-2 left-2 pointer-events-none max-w-32 truncate opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {object.fileName?.split(".")[0]}
            </Badge>
            <Badge
              variant="secondary"
              className="absolute bottom-2 right-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {object.contentType?.split("/")[1].toUpperCase()}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
