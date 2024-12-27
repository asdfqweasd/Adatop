// NavItem.tsx
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
};

interface NavItemProps {
  item: ItemType;
  status?: string;
}

export default function NavItem({ item}: NavItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div
      className="relative group"
      onMouseLeave={() => setIsOpen(false)}
      onMouseEnter={() => hasChildren && setIsOpen(true)}
    >
      <div className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 cursor-pointer transition-colors duration-200">
        {item.open_in_new_tab ? (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:scale-105 transition-transform duration-200"
          >
            {item.title}
          </a>
        ) : (
          <Link
            href={item.link}
            className="flex items-center hover:scale-105 transition-transform duration-200 p-2 hover:border-gray-900 border border-transparent rounded-md"
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
          className={`absolute left-0 mt-0 w-48 bg-white rounded-md shadow-lg py-1 z-50 transition-all duration-200 transform origin-top ${
            isOpen
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
          }`}
        >
          {item.children?.map((child) => (
            <Link
              key={child.title}
              href={child.link}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
            >
              {child.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
