// app/page.tsx (Server Component)
import { cosmic } from "@/cosmic/client";
import { notFound } from "next/navigation";
import ClientPage from "./ClientPage"; 
export const revalidate = 0; 
export async function Page({
  query,
  className,
  status,
}: {
  query: any;
  className?: string;
  status?: "draft" | "published" | "any";
}) {
  try {
    const { object: page } = await cosmic.objects
      .findOne(query)
      .props("slug,title,metadata")
      .depth(1)
      .status(status ? status : "published");

    const formattedSubheadline: string = page.metadata.subheadline
      .replace(/(Save up to \d+%)/g, "<strong>$1</strong>")
      .replace(
        /(WAS) (\$\d+,\d+)/g,
        '<strong>$1</strong> <span class="line-through">$2</span>'
      )
      .replace(
        /(NOW FROM) (\$\d+)/g,
        '<strong>$1</strong> <span class="text-pink-600 font-bold text-3xl">$2</span>'
      )
      .replace(/\n/g, "<br>");

    return (
      <ClientPage
        className={className}
        page={page}
        formattedSubheadline={formattedSubheadline}
      />
    );
  } catch (e: any) {
    if (e.status === 404) return notFound();
  }
}
