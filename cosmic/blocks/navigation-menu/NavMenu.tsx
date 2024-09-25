"use client";

import Link from "next/link";
import { cosmic } from "@/cosmic/client";
import { MobileNav } from "./MobileNav";
import { useState, useEffect } from "react";

export type ItemType = {
  title: string;
  link: string;
  open_in_new_tab: boolean;
  children?: ItemType[];
  secondarynav?: string;
};

// 这个组件用于渲染单个导航项及其二级导航（如果存在）
function NavItem({ item, status }: { item: ItemType; status?: string }) {
  const [secondaryNav, setSecondaryNav] = useState<ItemType[]>([]);
  const [isHovered, setIsHovered] = useState(false); // 是否悬停的状态
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null); // 定时器状态

  useEffect(() => {
    // 如果有二级导航的ID，则进行异步加载
    const fetchSecondaryNav = async () => {
      if (item.secondarynav) {
        try {
          const { object: secondaryNavResponse } = await cosmic.objects
            .findOne({ id: item.secondarynav })
            .props("metadata")
            .depth(1)
            .status(status ? status : "published");

          setSecondaryNav(
            secondaryNavResponse?.metadata?.secondarymenus?.secitems || []
          );
        } catch (error) {
          console.error("Error fetching secondary nav:", error);
        }
      }
    };

    fetchSecondaryNav();
  }, [item.secondarynav, status]);
  // 鼠标进入时取消隐藏
  const handleMouseEnter = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout); // 清除定时器
    setIsHovered(true); // 显示二级导航
  };

  // 鼠标离开时设置定时器，2秒后隐藏二级导航
  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsHovered(false);
    }, 1000); // 延迟1秒
    setHoverTimeout(timeout); // 保存定时器
  };

  return (
    <div
      className="nav-item group relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 渲染一级导航 */}
      <Link
        href={item.link}
        key={item.title}
        target={item.open_in_new_tab ? "_blank" : ""}
        className="group inline-flex h-10 w-full items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:text-zinc-50 dark:hover:bg-zinc-800 md:w-max"
      >
        {item.title}
      </Link>

      {/* 如果有二级导航并且加载完成，则渲染二级导航 */}
      {secondaryNav.length > 0 && isHovered && (
        <div className="secondary-nav absolute left-0 ml-4 mt-2 bg-white shadow-md rounded-md">
          {secondaryNav.map((subItem) => (
            <Link
              href={subItem.link || "#"}
              key={subItem.title}
              target={subItem.open_in_new_tab ? "_blank" : ""}
               className="group inline-flex h-10 w-full items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:text-zinc-50 dark:hover:bg-zinc-800 md:w-max"
            >
              {subItem.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export async function NavMenu({
  query,
  className,
  status,
  hasMobileMenu,
}: {
  query: any;
  className?: string;
  status?: "draft" | "published" | "any";
  hasMobileMenu?: boolean;
}) {
  const { object: nav } = await cosmic.objects
    .findOne(query)
    .props("metadata")
    .depth(1)
    .status(status ? status : "published");

  return (
    <div className={className}>
      {/* Desktop */}
      <div className={hasMobileMenu ? "hidden md:flex" : ""}>
        {/* 渲染一级导航 */}
        {nav.metadata.items.map((item: ItemType) => (
          <NavItem key={item.title} item={item} status={status} />
        ))}
      </div>

      {/* Mobile */}
      {hasMobileMenu && <MobileNav items={nav.metadata.items} />}
    </div>
  );
}
