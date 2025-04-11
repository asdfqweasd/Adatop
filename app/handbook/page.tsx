"use client";

import { useState, useRef, useEffect } from "react";
import { pos_AndroidLink, fetchVideoLinksFromAPI } from "@/lib/data";

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

function getYouTubeVideoId(url: string): string {
  try {
    // 尝试从URL中提取视频ID
    const urlObj = new URL(url);
    const videoId = urlObj.searchParams.get("v");
    return videoId || "";
  } catch (e) {
    // 如果URL解析失败，可能是直接提供的视频ID
    console.error("无法解析YouTube URL:", url);
    return url;
  }
}

export default function HandbookPage() {
  const [language, setLanguage] = useState<keyof LanguageData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const videoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const itemsPerPage = 10;

  // 从API获取数据
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        console.log("开始在页面中加载视频数据...");
        const success = await fetchVideoLinksFromAPI();

        if (success) {
          console.log(
            "成功加载视频数据，语言数量:",
            Object.keys(pos_AndroidLink).length
          );
          console.log("中文视频:", pos_AndroidLink.zh.length);
          console.log("英文视频:", pos_AndroidLink.en.length);
          setDataLoaded(true);
        } else {
          console.error("加载视频数据失败");
          setError("无法加载视频数据，请稍后再试");
        }
      } catch (err) {
        console.error("加载数据时发生错误:", err);
        setError("加载数据时发生错误");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleLanguageChange = (lang: keyof LanguageData) => {
    setLanguage(lang);
    setCurrentPage(1);
  };

  const handleScrollToVideo = (index: number) => {
    const videoElement = videoRefs.current[index];
    if (videoElement) {
      const elementRect = videoElement.getBoundingClientRect();
      const absoluteElementTop = elementRect.top + window.scrollY;
      const middle =
        absoluteElementTop - (window.innerHeight / 2 - elementRect.height / 2);
      window.scrollTo({ top: middle, behavior: "smooth" });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    if (language) {
      const totalPages = Math.ceil(
        pos_AndroidLink[language].length / itemsPerPage
      );
      setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    }
  };

  useEffect(() => {
    handleScrollToTop();
  }, [currentPage]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md">
          <strong className="font-bold">错误!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => window.location.reload()}
        >
          重试
        </button>
      </div>
    );
  }

  if (!language) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r ">
        <h1 className="font-bold text-4xl my-8 text-center text-black">
          Adatop User Manual
        </h1>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative group">
            <button
              className="bg-white text-blue-500 px-6 py-3 rounded-lg hover:bg-blue-100 transition duration-300 w-full sm:w-48"
              onClick={() => handleLanguageChange("zh")}
            >
              选择中文视频
            </button>
            {/* 中文下拉菜单 */}
          </div>
          <div className="relative group">
            <button
              className="bg-white text-blue-500 px-6 py-3 rounded-lg hover:bg-blue-100 transition duration-300 w-full sm:w-60"
              onClick={() => handleLanguageChange("en")}
            >
              Select English Videos
            </button>
            {/* 英文下拉菜单 */}
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div
            className="animate-spin inline-block w-8 h-8 border-4 rounded-full border-blue-500 border-t-transparent"
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
          <p className="mt-2">正在加载视频数据...</p>
        </div>
      </div>
    );
  }

  if (
    !isLoading &&
    dataLoaded &&
    language &&
    pos_AndroidLink[language].length === 0
  ) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative max-w-md">
          <strong className="font-bold">提示:</strong>
          <span className="block sm:inline"> 当前语言没有可用的视频</span>
        </div>
      </div>
    );
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pos_AndroidLink[language].slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(pos_AndroidLink[language].length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-r relative">
      <div className="relative z-10 flex flex-col items-center pt-8">
        <h1 className="font-bold text-4xl my-8 text-center text-black">
          Adatop User Manual
        </h1>
        {/* 导航栏在小屏幕时显示 */}
        <div className="w-full max-w-96 mx-auto px-4 mt-8 lg:hidden">
          <div className="bg-white rounded-lg shadow-lg p-6 mx-auto">
            <h2 className="font-bold text-2xl mb-4 truncate">
              {language.startsWith("zh") ? "导航" : "Navigation"}
            </h2>
            <ul className="space-y-2 mb-6 max-h-[50vh] overflow-y-auto">
              {currentItems.map((video: VideoItem, index: number) => (
                <li key={indexOfFirstItem + index}>
                  <button
                    className="text-blue-500 hover:text-blue-700 text-left w-full text-sm truncate"
                    onClick={() =>
                      handleScrollToVideo(indexOfFirstItem + index)
                    }
                  >
                    {indexOfFirstItem + index + 1 + " : " + video.name}
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center mb-4">
              <button
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                {language.startsWith("zh") ? "上一页" : "Prev"}
              </button>
              <span className="text-sm font-semibold">
                {currentPage} / {totalPages}
              </span>
              <button
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                {language.startsWith("zh") ? "下一页" : "Next"}
              </button>
            </div>
            <button
              className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-300 w-full"
              onClick={handleScrollToTop}
            >
              {language.startsWith("zh") ? "回到顶端" : "Scroll to Top"}
            </button>
          </div>
          {/* 回到顶部按钮 */}
          <button
            onClick={handleScrollToTop}
            className="fixed bottom-4 right-4 bg-black text-white py-3 w-10 mb-8 rounded-full shadow-lg hover:bg-blue-600 transition duration-300 z-10"
          >
            ⬆
          </button>
        </div>

        <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto px-4 items-start mt-8 space-y-8 lg:space-y-0">
          <div className="flex-1 flex flex-col items-center lg:mr-8">
            <div className="my-4 flex space-x-4">{/* 语言选择下拉菜单 */}</div>

            {/* 视频容器 */}
            <div className="video-container w-full flex flex-col items-center space-y-10">
              {currentItems.map((video: VideoItem, index: number) => (
                <div
                  key={indexOfFirstItem + index}
                  ref={(el) => {
                    videoRefs.current[indexOfFirstItem + index] = el;
                  }}
                  className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  <h2 className="text-xl font-semibold text-center py-4 bg-gray-200">
                    {indexOfFirstItem + index + 1 + " : " + video.name}
                  </h2>
                  <div>
                    <iframe
                      width="100%"
                      height="450"
                      src={`https://www.youtube.com/embed/${getYouTubeVideoId(video.value)}?vq=hd1080`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="mx-auto"
                    ></iframe>
                    <div className="text-center mt-2">
                      <a
                        href={video.value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {language.startsWith("zh")
                          ? "在YouTube上观看"
                          : "Watch on YouTube"}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 分页控制 */}
            <div className="flex justify-between w-full max-w-md my-8">
              <button
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                {language.startsWith("zh") ? "上一页" : "Previous"}
              </button>
              <span className="flex items-center font-semibold">
                {currentPage} / {totalPages}
              </span>
              <button
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                {language.startsWith("zh") ? "下一页" : "Next"}
              </button>
            </div>
          </div>

          {/* 导航栏在大屏幕时显示 */}
          <div className="hidden lg:block lg:w-80 mt-8 lg:mt-0 fixed right-4 top-1/2 transform -translate-y-1/2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="font-bold text-2xl mb-4">
                {language.startsWith("zh") ? "导航" : "Navigation"}
              </h2>
              <ul className="space-y-2 mb-6 max-h-[50vh] overflow-y-auto">
                {currentItems.map((video: VideoItem, index: number) => (
                  <li key={indexOfFirstItem + index}>
                    <button
                      className="text-blue-500 hover:text-blue-700 text-left w-full text-sm truncate"
                      onClick={() =>
                        handleScrollToVideo(indexOfFirstItem + index)
                      }
                    >
                      {indexOfFirstItem + index + 1 + " : " + video.name}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between items-center mb-4">
                <button
                  className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  {language.startsWith("zh") ? "上一页" : "Prev"}
                </button>
                <span className="text-sm font-semibold">
                  {currentPage} / {totalPages}
                </span>
                <button
                  className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  {language.startsWith("zh") ? "下一页" : "Next"}
                </button>
              </div>
              <button
                className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-300 w-full"
                onClick={handleScrollToTop}
              >
                {language.startsWith("zh") ? "回到顶端" : "Scroll to Top"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
