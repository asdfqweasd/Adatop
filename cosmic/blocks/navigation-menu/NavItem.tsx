"use client";

import React, { useState } from "react";
import Link from "next/link";
export const revalidate = 0;

export type ItemType = {
  title: string;
  link: string;
  open_in_new_tab: boolean;
  children?: ItemType[];
  secondarynav?: string;
  type?: "pdf" | "form" | "link";
};

interface NavItemProps {
  item: ItemType;
  status?: string;
}

export default function NavItem({ item }: NavItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  const handlePdfClick = async (e: React.MouseEvent, pdfItem: ItemType) => {
    if (pdfItem.type === "pdf") {
      e.preventDefault();
      try {
        const element = document.createElement("a");
        element.href = pdfItem.link;
        element.download = `${pdfItem.title}.pdf`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      } catch (error) {
        console.error("Download failed:", error);
        window.open(pdfItem.link, "_blank");
      }
    }
  };

  return (
    <div
      className="relative group"
      onMouseLeave={() => setIsOpen(false)}
      onMouseEnter={() => hasChildren && setIsOpen(true)}
    >
      <div className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white cursor-pointer transition-colors duration-200">
        {item.open_in_new_tab || item.title === "Payment" ? (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:scale-105 transition-transform duration-200 p-2 hover:border-gray-900 dark:hover:border-gray-200 border border-transparent rounded-md"
          >
            {item.title}
          </a>
        ) : (
          <Link
            href={item.link}
            className="flex items-center hover:scale-105 transition-transform duration-200 p-2 hover:border-gray-900 dark:hover:border-gray-200 border border-transparent rounded-md"
          >
            {item.title}
            {hasChildren && (
              <svg
                className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            )}
          </Link>
        )}
      </div>

      {hasChildren && (
        <div
          className={`absolute left-0 mt-0 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 transition-all duration-200 transform origin-top ${
            isOpen
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
          }`}
        >
          {item.children?.map((child) =>
            child.type === "pdf" ? (
              <button
                key={child.title}
                onClick={(e) => handlePdfClick(e, child)}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
              >
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  {child.title}
                </div>
              </button>
            ) : child.open_in_new_tab ? (
              <a
                key={child.title}
                href={child.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-explicit mr-2"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.826 10.88H10.5V12h-5V4.002h5v1.12H6.826V7.4h3.457v1.073H6.826z" />
                  <path d="M2.5 0A2.5 2.5 0 0 0 0 2.5v11A2.5 2.5 0 0 0 2.5 16h11a2.5 2.5 0 0 0 2.5-2.5v-11A2.5 2.5 0 0 0 13.5 0zM1 2.5A1.5 1.5 0 0 1 2.5 1h11A1.5 1.5 0 0 1 15 2.5v11a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 13.5z" />
                </svg>
                {child.title}
              </a>
            ) : (
              <Link
                key={child.title}
                href={child.link}
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
              >
                {child.title}
              </Link>
            )
          )}
        </div>
      )}
    </div>
  );
}
