import { z } from "zod";
import { action } from "@/lib/action";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
});

export const registerUser = action
  .use((action) => action)
  .schema(schema)
  .action(async ({ name, email }) => {
    // Pretend we're doing some database magic here
    console.log(`Registering ${name} with email ${email}`);
    return { success: true, message: `Welcome aboard, ${name}!` };
  });