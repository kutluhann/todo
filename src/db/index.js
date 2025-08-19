import { drizzle } from "drizzle-orm/d1";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { cache } from "react";

export const getDb = cache(() => {
  const { env } = getCloudflareContext();

  return drizzle(env.DB);
});