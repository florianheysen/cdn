import { Resource } from "sst";
import Greeting from "@/components/greeting";
import Shell from "@/components/shell";

export default async function Home() {
  return (
    <main className="flex flex-col gap-8">
      <Shell bucketName={Resource.uploads.name} />
    </main>
  );
}
