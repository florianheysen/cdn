"use client";

import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getUrl } from "@/server/getUrl";

export default function Form({ refetch }: { refetch: () => void }) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    data: url,
    isLoading,
    error,
    refetch: refetchUrl,
  } = useQuery({
    queryKey: ["url"],
    queryFn: async () => {
      return await getUrl();
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);

      if (!file) {
        console.error("No file selected.");
        return;
      }

      try {
        const image = await fetch(url?.data!, {
          body: file,
          method: "PUT",
          headers: {
            "Content-Type": file.type,
            "Content-Disposition": `attachment; filename="${file.name}"`,
          },
        });

        console.log(image.url.split("?")[0]);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
      try {
      } finally {
        setIsUploading(false);
        refetchUrl();
        refetch();
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <input
        ref={fileInputRef}
        onChange={handleImageUpload}
        type="file"
        accept="image/*"
        className="hidden"
        id="image-upload"
      />
      <Button
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
        className="flex-1"
      >
        {isUploading ? (
          <span className="flex items-center justify-center space-x-2">
            <Upload className="w-4 h-4 animate-spin" />
            <span>Uploading...</span>
          </span>
        ) : (
          <span className="flex items-center justify-center space-x-2">
            <Upload className="w-4 h-4" />
            <span>Upload</span>
          </span>
        )}
      </Button>
    </div>
  );
}
