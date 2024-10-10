import { Resource } from "sst";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

export async function GET() {
  const command = new PutObjectCommand({
    Key: crypto.randomUUID(),
    Bucket: Resource.uploads.name,
  });

  const url = await getSignedUrl(new S3Client({}), command);

  return NextResponse.json(url);
}
