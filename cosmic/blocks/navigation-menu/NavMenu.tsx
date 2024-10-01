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

function NavItem({ item, status }: { item: ItemType; status?: string }) {
  const [secondaryNav, setSecondaryNav] = useState<ItemType[]>([]);
  const [isHovered, setIsHovered] = useState(false); 
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null); 

  useEffect(() => {

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

  const handleMouseEnter = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout); 
    setIsHovered(true);
  };


  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsHovered(false);
    }, 1000);
    setHoverTimeout(timeout); 
  };

  return (
    <div
      className="nav-item group relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={item.link}
        key={item.title}
        target={item.open_in_new_tab ? "_blank" : ""}
        className="group inline-flex h-10 w-full items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:text-zinc-50 dark:hover:bg-zinc-800 md:w-max"
      >
        {item.title}
      </Link>

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
        {nav.metadata.items.map((item: ItemType) => (
          <NavItem key={item.title} item={item} status={status} />
        ))}
      </div>

      {/* Mobile */}
      {hasMobileMenu && <MobileNav items={nav.metadata.items} />}
    </div>
  );
}
