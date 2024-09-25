'use client'

import Link from "next/link";
import { cosmic } from "@/cosmic/client";
import { MobileNav } from "./MobileNav";
import { useState, useEffect } from "react";

export type ItemType = {
  title: string;
  link: string;
  open_in_new_tab: boolean;
  children?: ItemType[];
  secondarynav?: string;  // 添加 secondarynav 属性，用于识别是否有二级导航
};

// 这个组件用于渲染单个导航项及其二级导航（如果存在）
function NavItem({ item, status }: { item: ItemType; status?: string }) {
  const [secondaryNav, setSecondaryNav] = useState<ItemType[]>([]);
  const [loading, setLoading] = useState(false);  // 添加加载状态

  useEffect(() => {
    // 如果有二级导航的ID，则进行异步加载
    const fetchSecondaryNav = async () => {
      if (item.secondarynav) {
        console.log("Fetching secondary nav for ID:", item.secondarynav); // 调试日志，检查 ID
        setLoading(true); // 开始加载

        try {
          const { object: secondaryNavResponse } = await cosmic.objects
            .findOne({ id: item.secondarynav })
            .props("metadata")
            .depth(1)
            .status(status ? status : "published");

          console.log("Fetched secondary nav response:", secondaryNavResponse); // 调试日志，检查 API 响应
          
          // 注意拼写是否正确，API 返回的字段应该是 sencondarymenus 或 secondarymenus
          setSecondaryNav(secondaryNavResponse?.metadata?.secondarymenus?.secitems || []);
        } catch (error) {
          console.error("Error fetching secondary nav:", error);
        } finally {
          setLoading(false); // 加载完成
        }
      }
    };

    fetchSecondaryNav();
  }, [item.secondarynav, status]);

  return (
    <div>
      {/* 渲染一级导航 */}
      <Link
        href={item.link}
        key={item.title}
        target={item.open_in_new_tab ? "_blank" : ""}
        className="group inline-flex h-10 w-full items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-zinc-100 data-[state=open]:bg-zinc-100 dark:text-zinc-50 dark:hover:bg-zinc-800 dark:data-[state=active]:bg-zinc-900 dark:data-[state=open]:bg-zinc-900 md:w-max"
      >
        {item.title}
      </Link>

      {/* 加载中状态 */}
      {loading && <p className="text-sm text-gray-500 mt-2">Loading secondary nav...</p>}

      {/* 如果有二级导航并且加载完成，则渲染二级导航 */}
      {!loading && secondaryNav.length > 0 && (
        <div className="ml-4 mt-2">
          {secondaryNav.map((subItem) => (
            <Link
              href={subItem.link || "#"}  // 如果 link 为 null，则提供占位符
              key={subItem.title}
              target={subItem.open_in_new_tab ? "_blank" : ""}
              className="group inline-flex h-8 w-full items-center justify-start rounded-md bg-transparent px-4 py-1 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:text-zinc-300 dark:hover:bg-zinc-800"
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
  // 获取主导航对象
  const { object: nav } = await cosmic.objects
    .findOne(query)
    .props("metadata")
    .depth(1)
    .status(status ? status : "published");

  return (
    <div className={className}>
      {/* Desktop */}
      <div className={hasMobileMenu ? "hidden md:block" : ""}>
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
