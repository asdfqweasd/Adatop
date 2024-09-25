import { createBucketClient } from "@cosmicjs/sdk";


// 使用环境变量初始化 Cosmic Client
export const cosmic = createBucketClient({
  bucketSlug: process.env.NEXT_PUBLIC_COSMIC_BUCKET_SLUG || "",
  readKey: process.env.NEXT_PUBLIC_COSMIC_READ_KEY || "",
  writeKey: process.env.NEXT_PUBLIC_COSMIC_WRITE_KEY || "",
});
