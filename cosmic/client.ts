import { createBucketClient } from "@cosmicjs/sdk";


//  Cosmic Client
export const cosmic = createBucketClient({
  bucketSlug: process.env.NEXT_PUBLIC_COSMIC_BUCKET_SLUG || "",
  readKey: process.env.NEXT_PUBLIC_COSMIC_READ_KEY || "",
  writeKey: process.env.NEXT_PUBLIC_COSMIC_WRITE_KEY || "",
});
