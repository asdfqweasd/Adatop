interface VideoItem {
  name: string;
  value: string;
}

interface LanguageData {
  zh: VideoItem[];
  en: VideoItem[];
  zhme: VideoItem[];
  enme: VideoItem[];
  zhbc: VideoItem[];
  enbc: VideoItem[];
}

// 定义Cosmic对象接口以解决类型问题
interface CosmicObject {
  slug: string;
  title: string;
  type: string;
  metadata: {
    video?: {
      zh?: VideoItem[];
      en?: VideoItem[];
      zhme?: VideoItem[];
      enme?: VideoItem[];
      zhbc?: VideoItem[];
      enbc?: VideoItem[];
    };
  };
}

// 初始化数据结构
export const pos_AndroidLink: LanguageData = {
  zh: [],
  en: [],
  zhme: [],
  enme: [],
  zhbc: [],
  enbc: [],
};

// 只保留API方式获取数据，删除直接从Cosmic获取的函数
export async function fetchVideoLinksFromAPI() {
  try {
    console.log("开始从API获取视频数据...");
    const response = await fetch("/api/videolinks");
    const result = await response.json();
    console.log("API返回结果:", result);

    if (
      result.success &&
      result.data &&
      result.data.metadata &&
      result.data.metadata.video
    ) {
      const videoData = result.data.metadata.video;
      console.log("成功获取到视频数据:", videoData);

      // 更新数据
      if (videoData.zh) {
        pos_AndroidLink.zh = videoData.zh;
        console.log("加载中文视频数据:", videoData.zh.length, "个视频");
        console.log(
          "中文视频ID示例:",
          videoData.zh.map((v: { value: any }) => v.value).slice(0, 3)
        );
      }
      if (videoData.en) {
        pos_AndroidLink.en = videoData.en;
        console.log("加载英文视频数据:", videoData.en.length, "个视频");
      }
      if (videoData.zhme) pos_AndroidLink.zhme = videoData.zhme;
      if (videoData.enme) pos_AndroidLink.enme = videoData.enme;
      if (videoData.zhbc) pos_AndroidLink.zhbc = videoData.zhbc;
      if (videoData.enbc) pos_AndroidLink.enbc = videoData.enbc;

      return true;
    } else {
      console.error("API返回了成功响应，但数据结构不符合预期:", result);
      return false;
    }
  } catch (error) {
    console.error("获取视频数据时出错:", error);
    return false;
  }
}

// 保存Cosmic凭据到本地存储的函数
export function saveCosmicCredentials(bucketSlug: string, readKey: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem("cosmic_bucket_slug", bucketSlug);
    localStorage.setItem("cosmic_read_key", readKey);
    return true;
  }
  return false;
}
