"use client";

import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { listObjects } from "@/server/listObjects";
import Form from "@/components/form";
import ImageGallery from "@/components/gallery";
import { RefreshCw } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

const Shell = ({ bucketName }: { bucketName: string }) => {
  const {
    data: keys,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["keys"],
    queryFn: async () => {
      return await listObjects();
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (!keys) return <p>No keys found.</p>;

  return (
    <main className="flex flex-col pb-16">
      <div className="container mx-auto px-4 pt-8">
        <h1 className="text-2xl">CDN: {bucketName}</h1>
      </div>
      <ImageGallery bucketName={bucketName} keys={keys} />
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-background border border-border rounded-lg shadow-lg p-2">
        <div className="flex gap-2">
          <Form refetch={refetch} />
          <Button
            variant="outline"
            size="icon"
            disabled={isFetching}
            onClick={() => refetch()}
            aria-label="Refresh images"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </main>
  );
};

export default Shell;
