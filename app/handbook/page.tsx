"use client";

import { useState, useRef, useEffect } from "react";
import { pos_AndroidLink, fetchVideoLinksFromAPI } from "@/lib/data";
import React from "react";

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
    const urlObj = new URL(url);
    const videoId = urlObj.searchParams.get("v");
    return videoId || "";
  } catch (e) {
    console.error("无法解析YouTube URL:", url);
    return url;
  }
}

// 提取出导航组件
function NavigationMenu({
  language,
  currentItems,
  indexOfFirstItem,
  currentPage,
  totalPages,
  handleScrollToVideo,
  handlePrevPage,
  handleNextPage,
  handleScrollToTop,
  isMobile = false,
}: {
  language: keyof LanguageData;
  currentItems: VideoItem[];
  indexOfFirstItem: number;
  currentPage: number;
  totalPages: number;
  handleScrollToVideo: (index: number) => void;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  handleScrollToTop: () => void;
  isMobile?: boolean;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mx-auto">
      <h2 className="font-bold text-2xl mb-4 truncate text-gray-900 dark:text-gray-100">
        {language.startsWith("zh") ? "导航" : "Navigation"}
      </h2>
      <ul className="space-y-2 mb-6 max-h-[50vh] overflow-y-auto">
        {currentItems.map((video: VideoItem, index: number) => (
          <li key={indexOfFirstItem + index}>
            <button
              className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 text-left w-full text-sm truncate"
              onClick={() => handleScrollToVideo(indexOfFirstItem + index)}
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
        <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
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
        className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300 w-full"
        onClick={handleScrollToTop}
      >
        {language.startsWith("zh") ? "回到顶端" : "Scroll to Top"}
      </button>
    </div>
  );
}

// 提取出分页控件组件
function Pagination({
  currentPage,
  totalPages,
  handlePrevPage,
  handleNextPage,
  language,
}: {
  currentPage: number;
  totalPages: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  language: keyof LanguageData;
}) {
  return (
    <div className="flex justify-between w-full max-w-md my-8">
      <button
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        {language.startsWith("zh") ? "上一页" : "Previous"}
      </button>
      <span className="flex items-center font-semibold text-gray-900 dark:text-gray-100">
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
  );
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
      <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 dark:bg-black pt-32">
        <h1 className="font-bold text-4xl mb-8 text-center text-gray-900 dark:text-gray-100">
          Adatop User Manual
        </h1>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            className="bg-white dark:bg-gray-800 text-blue-500 dark:text-blue-400 px-6 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition duration-300 w-full sm:w-48 shadow-md"
            onClick={() => handleLanguageChange("zh")}
          >
            选择中文视频
          </button>
          <button
            className="bg-white dark:bg-gray-800 text-blue-500 dark:text-blue-400 px-6 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition duration-300 w-full sm:w-60 shadow-md"
            onClick={() => handleLanguageChange("en")}
          >
            Select English Videos
          </button>
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
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative max-w-md mb-4">
          <strong className="font-bold">提示:</strong>
          <span className="block sm:inline"> 当前语言没有可用的视频</span>
        </div>
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          onClick={() => setLanguage(null)}
        >
          返回语言选择
        </button>
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
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <div className="relative z-10 flex flex-col items-center pt-8">
        <h1 className="font-bold text-4xl my-8 text-center text-gray-900 dark:text-gray-100">
          Adatop User Manual
        </h1>

        {/* 语言切换按钮 */}
        <div className="flex flex-row space-x-4 mb-6">
          <button
            className={`px-4 py-2 rounded-lg transition duration-300 ${
              language === "zh"
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500 hover:bg-blue-100 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
            }`}
            onClick={() => handleLanguageChange("zh")}
          >
            中文
          </button>
          <button
            className={`px-4 py-2 rounded-lg transition duration-300 ${
              language === "en"
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500 hover:bg-blue-100 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
            }`}
            onClick={() => handleLanguageChange("en")}
          >
            English
          </button>
        </div>

        {/* 移动端导航 */}
        <div className="w-full max-w-96 mx-auto px-4 mt-8 lg:hidden">
          <NavigationMenu
            language={language}
            currentItems={currentItems}
            indexOfFirstItem={indexOfFirstItem}
            currentPage={currentPage}
            totalPages={totalPages}
            handleScrollToVideo={handleScrollToVideo}
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
            handleScrollToTop={handleScrollToTop}
            isMobile={true}
          />
          {/* 回到顶部按钮 */}
          <button
            onClick={handleScrollToTop}
            className="fixed bottom-4 right-4 bg-blue-500 text-white py-3 w-10 mb-8 rounded-full shadow-lg hover:bg-blue-600 transition duration-300 z-10"
          >
            ⬆
          </button>
        </div>

        <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto px-4 items-start mt-8 space-y-8 lg:space-y-0">
          <div className="flex-1 flex flex-col items-center lg:mr-8">
            <div className="my-4 flex space-x-4">{/* 语言选择下拉菜单 */}</div>

            {/* 视频容器 */}
            <div className="video-container w-full flex flex-col items-center space-y-10">
              {currentItems.map((video: VideoItem, index: number) => {
                const itemIndex = indexOfFirstItem + index;
                return (
                  <div
                    key={itemIndex}
                    ref={(el) => {
                      videoRefs.current[itemIndex] = el;
                    }}
                    className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                  >
                    <h2 className="text-xl font-semibold text-center py-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                      {itemIndex + 1 + " : " + video.name}
                    </h2>
                    <div>
                      <iframe
                        width="100%"
                        height="450"
                        src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                          video.value
                        )}?vq=hd1080`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="mx-auto"
                      ></iframe>
                      <div className="text-center mt-2">
                        <a
                          href={video.value}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          {language.startsWith("zh")
                            ? "在YouTube上观看"
                            : "Watch on YouTube"}
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 分页控制 */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              handlePrevPage={handlePrevPage}
              handleNextPage={handleNextPage}
              language={language}
            />
          </div>

          {/* 桌面端导航 */}
          <div className="hidden lg:block lg:w-80 mt-8 lg:mt-0 fixed right-4 top-1/2 transform -translate-y-1/2">
            <NavigationMenu
              language={language}
              currentItems={currentItems}
              indexOfFirstItem={indexOfFirstItem}
              currentPage={currentPage}
              totalPages={totalPages}
              handleScrollToVideo={handleScrollToVideo}
              handlePrevPage={handlePrevPage}
              handleNextPage={handleNextPage}
              handleScrollToTop={handleScrollToTop}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
