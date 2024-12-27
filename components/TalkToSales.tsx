"use client";

import { useState } from "react";

export const TalkToSales = () => {
  const [showPhone, setShowPhone] = useState(false);
  const phoneNumber = "(+61) 416 576 066";

  return (
    <button
      onClick={() => setShowPhone(!showPhone)}
      className="text-blue-600 py-2 px-6 border border-blue-600 rounded-md hover:bg-blue-50 transition-all"
    >
      {showPhone ? phoneNumber : "Talk to Sales"}
    </button>
  );
};
