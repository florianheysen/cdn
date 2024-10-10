"use client";

import { useQuery } from "@tanstack/react-query";

const fetchUrl = async () => {
  const response = await fetch("/api/url");
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération de l'URL");
  }
  return response.json();
};

export default function Form() {
  const {
    data: url,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["url"],
    queryFn: fetchUrl,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        const fileInput = (e.target as HTMLFormElement).file;
        const file = fileInput?.files?.[0];

        if (!file) {
          console.error("No file selected.");
          return;
        }

        try {
          const image = await fetch(url, {
            body: file,
            method: "PUT",
            headers: {
              "Content-Type": file.type,
              "Content-Disposition": `attachment; filename="${file.name}"`,
            },
          });

          console.log(image.url.split("?")[0]);
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      }}
    >
      <input name="file" type="file" accept="image/png, image/jpeg" />
      <button type="submit">Upload</button>
    </form>
  );
}
