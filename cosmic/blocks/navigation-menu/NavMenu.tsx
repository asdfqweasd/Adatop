// NavMenu.tsx
import React from "react";
import NavItem from "./NavItem";
import { MobileNav } from "./MobileNav";
import { cosmic } from "@/cosmic/client";
export const revalidate = 0;

export type ItemType = {
  title: string;
  link: string;
  open_in_new_tab: boolean;
  children?: ItemType[];
  secondarynav?: string;
  type?: "pdf" | "form" | "link" | "video";
};

interface NavMenuProps {
  query: any;
  className?: string;
  status?: "draft" | "published" | "any";
  hasMobileMenu?: boolean;
}

interface HardwareItem {
  title: string;
  slug: string;
}

export async function NavMenu({
  query,
  className,
  status,
  hasMobileMenu,
}: NavMenuProps) {
  const { object: nav } = await cosmic.objects
    .findOne(query)
    .props("metadata")
    .depth(2)
    .status(status ? status : "published");

  const { objects: Hardwares } = await cosmic.objects
    .find({
      type: "hardwares",
    })
    .props("id,slug,title,metadata")
    .depth(1)
    .status(status ? status : "published");

  const processedItems = nav.metadata.items.map((item: ItemType) => {
    if (item.title === "Products") {
      const children = Hardwares.map((hardware: HardwareItem) => ({
        title: hardware.title,
        link: `/${hardware.slug}`,
        open_in_new_tab: false,
        type: "link",
      }));
      return { ...item, children };
    }
    if (item.title === "Help") {
      const children = [
        {
          title: "KYC Form",
          link: "https://forms.gle/jc1xWbfJEvN8FdPX6",
          open_in_new_tab: true,
          type: "form",
        },
        {
          title: "Pos Handbook_EN",
          link: "/pdf/adatop_handbook.pdf",
          open_in_new_tab: false,
          type: "pdf",
        },
        {
          title: "Pos Video",
          link: "/handbook",
          open_in_new_tab: false,
          type: "link",
        },
      ];
      return { ...item, children };
    }
    return { ...item, type: "link" };
  });

  return (
    <div className={className}>
      <div
        className={`
        ${hasMobileMenu ? "hidden md:flex" : "flex"} 
        flex-row justify-center w-full mt-5
      `}
      >
        {processedItems.map((item: ItemType) => (
          <NavItem key={item.title} item={item} status={status} />
        ))}
      </div>

      {hasMobileMenu && <MobileNav items={processedItems} />}
    </div>
  );
}
