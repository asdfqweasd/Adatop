import { NextResponse } from "next/server";
import { createBucketClient } from "@cosmicjs/sdk";

// 初始化Cosmic客户端
const cosmic = createBucketClient({
  bucketSlug: "adatop-production",
  readKey: "nwMkGb73AMtAO1vYcCKWYdwyVGb8oKAdkJo2AniOV3luivbVRf",
});

export async function GET() {
  try {
    const response = await cosmic.objects
      .findOne({
        type: "videolinks",
        slug: "adaposlink",
      })
      .props("slug,title,metadata,type")
      .depth(1);

    console.log("API响应:", JSON.stringify(response));

    // 如果找到数据，返回它
    if (response && response.object) {
      return NextResponse.json({
        success: true,
        data: response.object,
      });
    }

    // 如果没有找到数据，返回错误
    return NextResponse.json(
      { success: false, message: "视频链接数据未找到" },
      { status: 404 }
    );
  } catch (error) {
    console.error("Error fetching video links:", error);
    return NextResponse.json(
      { success: false, message: "获取视频链接数据失败" },
      { status: 500 }
    );
  }
}
