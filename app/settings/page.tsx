"use client";

import { useState } from "react";
import { saveCosmicCredentials } from "@/lib/data";

export default function SettingsPage() {
  const [bucketSlug, setBucketSlug] = useState("");
  const [readKey, setReadKey] = useState("");
  const [message, setMessage] = useState("");

  const handleSave = () => {
    if (bucketSlug && readKey) {
      const success = saveCosmicCredentials(bucketSlug, readKey);
      if (success) {
        setMessage("设置已保存！请刷新页面以使用新凭据获取数据。");
      } else {
        setMessage("保存设置失败。请确保您的浏览器支持本地存储。");
      }
    } else {
      setMessage("请输入Bucket Slug和Read Key");
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Cosmic CMS 设置</h1>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Bucket Slug</label>
        <input
          type="text"
          value={bucketSlug}
          onChange={(e) => setBucketSlug(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="adatop-production"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Read Key</label>
        <input
          type="text"
          value={readKey}
          onChange={(e) => setReadKey(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="输入你的Cosmic Read Key"
        />
      </div>

      <button
        onClick={handleSave}
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        保存设置
      </button>

      {message && <div className="mt-4 p-3 bg-gray-100 rounded">{message}</div>}
    </div>
  );
}
