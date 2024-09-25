import { createBucketClient } from "@cosmicjs/sdk";

// Make sure to add/update your ENV variables
export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG || "adatop-production" ,
  readKey: process.env.COSMIC_READ_KEY || "",
  writeKey: process.env.COSMIC_WRITE_KEY || "", 
});
