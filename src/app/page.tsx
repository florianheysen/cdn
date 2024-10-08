import { Resource } from "sst";
import Form from "@/components/form";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
  S3Client,
  PutObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import ImageGallery from "@/components/images";

export default async function Home() {
  const s3 = new S3Client({});

  const command = new PutObjectCommand({
    Key: crypto.randomUUID(),
    Bucket: Resource.MyBucket.name,
  });
  const url = await getSignedUrl(new S3Client({}), command);

  const command2 = new ListObjectsV2Command({
    Bucket: Resource.MyBucket.name,
  });

  const data = await s3.send(command2);

  const keys = data?.Contents?.map((item) => item.Key);

  console.log(keys);

  return (
    <main>
      <Form url={url} />
      <ImageGallery images={keys as string[]} />
    </main>
  );
}
