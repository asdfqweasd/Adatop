"use client";
import Image from "next/image";
import { ContactButton } from "@/components/ContactButton";

type SectionType = {
  id: string;
  title: string;
  image: {
    url: string;
    imgix_url: string;
  };
};

type PageData = {
  metadata: {
    h1: string;
    section_title: string;
    subheadline: string;
    image: {
      imgix_url: string;
    };
    sections: SectionType[];
  };
};

interface ClientHeroProps {
  pageData: PageData;
}

export function ClientHero({ pageData }: ClientHeroProps) {
  return (
    <div className="bg-gray-50 flex items-center justify-center pb-6 dark:bg-black transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Text section */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-600 uppercase dark:text-gray-400">
              New to AdaPos
            </h4>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
              {pageData.metadata.h1}
              <br /> {pageData.metadata.section_title}
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 w-[71%]">
              {pageData.metadata.subheadline}
            </p>
            <div className="flex space-x-4">
              <ContactButton />
            </div>
          </div>

          {/* Image section */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-center">
              <div className="w-full h-[200px] relative">
                <Image
                  src={pageData.metadata.image.imgix_url}
                  alt="Main POS Image"
                  width={500}
                  height={500}
                  priority
                  className="rounded-lg w-full h-full object-cover shadow-md dark:shadow-none"
                />
              </div>
            </div>

            <div className="grid grid-rows-2 gap-4">
              {pageData.metadata.sections.slice(0, 2).map((section, index) => (
                <div key={index} className="flex items-center justify-center">
                  <div className="w-full h-auto relative">
                    <Image
                      src={section.image.imgix_url}
                      alt={`POS Image ${index + 1}`}
                      width={300}
                      height={300}
                      loading="lazy"
                      className="rounded-lg w-full h-auto object-cover shadow-md dark:shadow-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
