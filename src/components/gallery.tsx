"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

const fetchKeys = async () => {
  const response = await fetch("/api/keys");
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des clés");
  }
  return response.json();
};

const ImageGallery = ({ bucketName }: { bucketName: string }) => {
  const {
    data: keys,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["keys"],
    queryFn: fetchKeys,
  });

  if (isLoading) return <p>Loading...</p>;
  if (!keys) return <p>No keys found.</p>;

  return (
    <div>
      {isFetching && <p>Fetching...</p>}
      {keys && keys.length === 0 ? (
        <p>No keys found.</p>
      ) : (
        <ul>
          {keys?.map((imageKey: string) => (
            <li key={imageKey}>
              <Image
                src={`https://${bucketName}.s3.us-east-1.amazonaws.com/${imageKey}`}
                alt={imageKey}
                style={{ width: "auto", height: "auto" }}
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
