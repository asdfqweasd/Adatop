// ClientHero.tsx
"use client";
import { useState } from "react";
import Contact from "@/components/contact";

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
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOpenForm = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  return (
    <div className="bg-gray-50 flex items-center justify-center py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Text section */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-600 uppercase">
              New to AdaPos
            </h4>
            <h1 className="text-4xl font-bold text-gray-900">
              {pageData.metadata.h1}
              <br /> {pageData.metadata.section_title}
            </h1>
            <p className="text-lg text-gray-700 w-[71%]">
              {pageData.metadata.subheadline}
            </p>
            <div className="flex space-x-4">
              <button
                className="bg-orange-500 text-white py-2 px-6 rounded-md hover:bg-blue-700"
                onClick={handleOpenForm}
              >
                Contact Us
              </button>
              {isFormOpen && <Contact onClose={handleCloseForm} />}
            </div>
          </div>

          {/* Image section */}
          <div className="grid grid-cols-2 gap-4">
            {/* Larger image on the left */}
            <div className="flex items-center justify-center">
              <img
                src={pageData.metadata.image.imgix_url}
                alt="Main POS Image"
                className="rounded-lg w-full h-auto object-cover"
              />
            </div>

            {/* Two smaller images on the right */}
            <div className="grid grid-rows-2 gap-4">
              {pageData.metadata.sections.slice(0, 2).map((section, index) => (
                <div key={index} className="flex items-center justify-center">
                  <img
                    src={section.image.imgix_url}
                    alt={`POS Image ${index + 1}`}
                    className="rounded-lg w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}