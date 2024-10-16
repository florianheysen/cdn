"use client";

import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { listObjects } from "@/server/listObjects";
import Form from "@/components/form";
import ImageGallery from "@/components/gallery";
import { Grid3x3, Logs, RefreshCw } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const Shell = ({ bucketName }: { bucketName: string }) => {
  const {
    data: objects,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["objects"],
    queryFn: async () => {
      return await listObjects();
    },
  });

  return (
    <main className="flex flex-col pb-16">
      <div className="flex flex-col gap-4 container mx-auto px-4 pt-8">
        <h1 className="text-2xl">Bucket: {bucketName}</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <Tabs defaultValue="grid">
            <TabsList>
              <TabsTrigger value="grid">
                <Grid3x3 className="size-4 mr-2" />
                Grid
              </TabsTrigger>
              <TabsTrigger value="list">
                <Logs className="size-4 mr-2" />
                List
              </TabsTrigger>
            </TabsList>
            <TabsContent value="grid">
              {objects ? (
                <ImageGallery
                  bucketName={bucketName}
                  objects={objects}
                  refetch={refetch}
                />
              ) : (
                <p>No objects found.</p>
              )}
            </TabsContent>
            <TabsContent value="list">Change your password here.</TabsContent>
          </Tabs>
        )}
      </div>

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
            <RefreshCw
              className={cn("w-4 h-4", isFetching && "animate-spin")}
            />
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </main>
  );
};

export default Shell;
