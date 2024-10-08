"use client";

export default function Form({ url }: { url: string }) {
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
