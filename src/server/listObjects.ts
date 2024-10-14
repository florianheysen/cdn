"use server";

import { Resource } from "sst";
import { ListObjectsCommand, S3Client } from "@aws-sdk/client-s3";

export const listObjects = async () => {
  const command = new ListObjectsCommand({
    Bucket: Resource.uploads.name,
  });

  const data = await new S3Client({}).send(command);

  const keys = data.Contents?.map((item) => item.Key);

  return keys;
};
