"use server";

import { Resource } from "sst";
import {
  HeadObjectCommand,
  ListObjectsCommand,
  S3Client,
} from "@aws-sdk/client-s3";

const formatSize = (bytes: number): string => {
  if (bytes >= 1e9) {
    return (bytes / 1e9).toFixed(2) + " gb";
  } else if (bytes >= 1e6) {
    return (bytes / 1e6).toFixed(2) + " mb";
  } else if (bytes >= 1e3) {
    return (bytes / 1e3).toFixed(2) + " kb";
  }
  return bytes + " bytes";
};

export const listObjects = async () => {
  const s3Client = new S3Client({});

  const command = new ListObjectsCommand({
    Bucket: Resource.uploads.name,
  });

  const data = await s3Client.send(command);

  const objects = await Promise.all(
    data.Contents?.map(async (item) => {
      const headCommand = new HeadObjectCommand({
        Bucket: Resource.uploads.name,
        Key: item.Key,
      });

      const metadata = await s3Client.send(headCommand);

      return {
        key: item.Key,
        contentType: metadata.ContentType,
        size: formatSize(metadata.ContentLength || 0),
        lastModified: item.LastModified?.toISOString(),
        fileName: metadata.ContentDisposition?.split("filename=")[1].replace(
          /"/g,
          ""
        ),
      };
    }) || []
  );

  return objects;
};
