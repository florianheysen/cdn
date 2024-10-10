"use client";

import { greet } from "@/server/greet";
import { useQuery } from "@tanstack/react-query";

export default function Greeting({ name }: { name: string }) {
  const {
    data: greeting,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["greeting"],
    queryFn: async () => {
      return await greet({ username: name });
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return <div>Hello {greeting?.data?.name}</div>;
}
