import Form from "@/components/form";
import ImageGallery from "@/components/gallery";
import Greeting from "@/components/greeting";
import { Resource } from "sst";

export default async function Home() {
  return (
    <main className="flex flex-col gap-8">
      <h1 className="text-2xl">CDN: {Resource.uploads.name}</h1>
      <Greeting name="Aya" />
      <Form />
      <ImageGallery bucketName={Resource.uploads.name} />
    </main>
  );
}
