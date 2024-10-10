"use server";

import { z } from "zod";
import { actionClient } from "@/lib/action";

const schema = z.object({
  username: z.string().min(3).max(10),
});

export const greet = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { username } }) => {
    return {
      name: username,
    };
  });
