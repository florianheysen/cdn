"use client";

import React from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { removeObject } from "@/server/removeObject";
import { useMutation } from "@tanstack/react-query";
import { Info, Link, Clipboard, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import Image from "next/image";
import { Input } from "./ui/input";
import { formatDate } from "@/lib/utils";

const ObjectMenu = ({
  children,
  object,
  bucketName,
  refetch,
}: {
  children: React.ReactNode;
  object: {
    key: string | undefined;
    contentType: string | undefined;
    size: number | undefined;
    lastModified: string | undefined;
    fileName: string | undefined;
  };
  bucketName: string;
  refetch: () => void;
}) => {
  const { toast } = useToast();

  const objectUrl = `https://${bucketName}.s3.us-east-1.amazonaws.com/${object.key!}`;

  const copyToClipboard = (toCopy: string, toastText: string) => {
    navigator.clipboard.writeText(toCopy);
    toast({
      description: toastText,
    });
  };
  const remove = useMutation({
    mutationFn: async () => {
      return await removeObject({ id: object.key! });
    },
  });

  const handleDelete = async () => {
    try {
      await remove.mutateAsync();
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-52">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="w-full justify-start p-2">
              <Info className="mr-2 w-4 h-4" />
              Open details
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Details</DialogTitle>
            </DialogHeader>
            <div className="relative overflow-hidden border rounded-lg aspect-video">
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
                  controls
                  className="w-full h-full"
                  src={`https://${bucketName}.s3.us-east-1.amazonaws.com/${object.key}`}
                />
              )}
            </div>
            <div className="flex flex-col gap-2">
              <p className="flex w-full items-center">
                <b>Public URL:</b>{" "}
                <Input
                  className="flex-1 ml-1 h-7 p-2"
                  type="text"
                  tabIndex={-1}
                  value={objectUrl}
                />
              </p>
              <p>
                <b>Key:</b> {object.key}
              </p>
              <p>
                <b>File Name:</b> {object.fileName}
              </p>
              <p>
                <b>Content-Type:</b> {object.contentType}
              </p>
              <p>
                <b>Size:</b> {object.size}
              </p>
              <p>
                <b>Upload date:</b> {formatDate(object.lastModified!)}
              </p>
            </div>
          </DialogContent>
        </Dialog>

        <ContextMenuItem
          onClick={() =>
            copyToClipboard(objectUrl, "Public URL copied to clipboard")
          }
          className="pl-2 cursor-pointer"
          inset
        >
          <Link className="mr-2 w-4 h-4" />
          Copy public URL
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => copyToClipboard(object.key!, "ID copied to clipboard")}
          className="pl-2 cursor-pointer"
          inset
        >
          <Clipboard className="mr-2 w-4 h-4" />
          Copy ID
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem
          disabled={remove.isPending}
          onClick={handleDelete}
          className="pl-2 cursor-pointer text-red-500 bg-red-100 dark:text-red-200 dark:bg-red-950 hover:!text-red-500 hover:!bg-red-200 hover:dark:!text-red-200 hover:dark:!bg-red-900 transition-all"
          inset
        >
          <Trash2 className="mr-2 w-4 h-4" />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default ObjectMenu;
