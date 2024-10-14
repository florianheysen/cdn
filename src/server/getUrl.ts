"use server";

import { action } from "@/lib/action";
import { Resource } from "sst";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export const getUrl = action.action(async () => {
  const command = new PutObjectCommand({
    Key: crypto.randomUUID(),
    Bucket: Resource.uploads.name,
  });

  return await getSignedUrl(new S3Client(), command);
});
