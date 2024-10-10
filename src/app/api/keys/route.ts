import { ListObjectsCommand, S3Client } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { Resource } from "sst";

export async function GET() {
  const command = new ListObjectsCommand({
    Bucket: Resource.uploads.name,
  });

  const data = await new S3Client({}).send(command);

  const keys = data.Contents?.map((item) => item.Key);

  return new NextResponse(JSON.stringify(keys), {
    status: 200,
  });
}
