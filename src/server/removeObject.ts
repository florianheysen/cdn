"use server";

import { z } from "zod";
import { action } from "@/lib/action";
import { Resource } from "sst";
import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";

const schema = z.object({
  id: z.string(),
});

export const removeObject = action
  .schema(schema)
  .action(async ({ parsedInput: { id } }) => {
    const command = new DeleteObjectCommand({
      Bucket: Resource.uploads.name,
      Key: id,
    });

    const data = await new S3Client({}).send(command);

    return data;
  });
