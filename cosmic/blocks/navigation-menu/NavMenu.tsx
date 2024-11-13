// NavMenu.tsx
import React from 'react';
import NavItem from './NavItem'; // 导入客户端组件
import { MobileNav } from './MobileNav';
import { cosmic } from '@/cosmic/client';
export const revalidate = 0; 
export type ItemType = {
  title: string;
  link: string;
  open_in_new_tab: boolean;
  children?: ItemType[];
  secondarynav?: string;
};

interface NavMenuProps {
  query: any;
  className?: string;
  status?: 'draft' | 'published' | 'any';
  hasMobileMenu?: boolean;
}

export async function NavMenu({
  query,
  className,
  status,
  hasMobileMenu,
}: NavMenuProps) {
  const { object: nav } = await cosmic.objects
    .findOne(query)
    .props('metadata')
    .depth(1)
    .status(status ? status : 'published');

  return (
    <div className={className}>
      {/* Desktop */}
      <div className={hasMobileMenu ? 'hidden md:flex' : ''}>
        {nav.metadata.items.map((item: ItemType) => (
          <NavItem key={item.title} item={item} status={status} />
        ))}
      </div>

      {/* Mobile */}
      {hasMobileMenu && <MobileNav items={nav.metadata.items} />}
    </div>
  );
}
