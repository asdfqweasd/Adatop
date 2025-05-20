"use client";

import { useEffect } from "react";

const TawkMessenger = () => {
  useEffect(() => {
    // @ts-ignore
    const Tawk_API = window.Tawk_API || {};
    const Tawk_LoadStart = new Date();

    const s1 = document.createElement("script");
    s1.src = "https://embed.tawk.to/68218e8ef3613e190ca887ba/1ir1h9nub";
    s1.async = true;
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");

    const s0 = document.getElementsByTagName("script")[0];
    if (s0 && s0.parentNode) {
      s0.parentNode.insertBefore(s1, s0);
    } else {
      document.body.appendChild(s1);
    }
  }, []);

  return null;
};

export default TawkMessenger;
