// components/ClientPage.tsx (Client Component)
"use client"; // This part handles the client-side logic
import { useState } from "react";
import Contact from "@/components/contact";
import { Section } from "./PageSection";

export default function ClientPage({
  page,
  className,
  formattedSubheadline,
}: {
  page: any;
  className?: string;
  formattedSubheadline: string;
}) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOpenForm = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  return (
    <div className={className}>
      <div className="mx-auto flex w-full max-w-6xl flex-col-reverse justify-between p-4 pb-16 text-zinc-950 dark:text-zinc-50 md:flex-row md:gap-12">
        <div className="flex w-full flex-col items-start justify-start md:w-1/2">
          <div className="py-4 md:pt-20">
            <h1 className="font-display text-4xl tracking-tight md:text-6xl">
              {page.metadata.h1}
            </h1>
          </div>
          <div className="pb-8">
            <div
              className="text-xl text-zinc-700 dark:text-zinc-300"
              dangerouslySetInnerHTML={{ __html: formattedSubheadline }}
            />
          </div>

          <div className="w-full md:pb-20">
            <div className="flex w-full gap-4 md:w-max">
              <button
                className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700"
                onClick={handleOpenForm}
              >
                Email Us
              </button>

              {/* Contact Form Modal */}
              {isFormOpen && <Contact onClose={handleCloseForm} />}
            </div>
          </div>
        </div>
        <div className="my-auto w-full px-4 md:w-1/2">
          <img
            src={`${page.metadata.image.imgix_url}?w=1600&auto=format,compression`}
            alt={page.title}
            className="w-full dark:hidden"
          />
          <img
            src={`${page.metadata.dark_image.imgix_url}?w=1600&auto=format,compression`}
            alt={page.title}
            className="hidden w-full dark:block"
          />
        </div>
      </div>

      <section className="grid items-center bg-zinc-50 p-4 py-10 dark:bg-zinc-900">
        <div className="relative m-auto flex max-w-6xl flex-col items-start gap-2">
          <h2 className="font-display m-auto max-w-[800px] pt-8 text-center text-3xl text-zinc-900 dark:text-zinc-100 md:text-6xl">
            {page.metadata.section_title}
          </h2>
          <div
            dangerouslySetInnerHTML={{ __html: page.metadata.content }}
            className="m-auto mb-16 max-w-[800px] text-center text-zinc-700 dark:text-zinc-300"
          />
          <div className="grid gap-y-28">
            {page.metadata.sections.map((section: any) => (
              <Section key={section.heading} section={section} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
