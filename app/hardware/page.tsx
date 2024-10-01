

import { HardwareList } from "@/cosmic/blocks/hardware/HardwareList";
import { cosmic } from "@/cosmic/client";
import { Button } from "@/cosmic/elements/Button";

export default async function hardware() {
  const { object: page } = await cosmic.objects
    .findOne({
      type: "pages",
      slug: "hardware",
    })
    .props("slug,title,metadata")
    .depth(1);

  type SectionType = {
    id: string;
    title: string;
    image: Image;
  };

  type Image = {
    url: string;
    imgix_url: string;
  };

  return (
    <main className="p-4">
      <section className="md:container pb-8 m-auto">
        <div className="bg-gray-50 flex items-center justify-center py-6">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Text section */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-600 uppercase">
                  New to AdaPos
                </h4>
                <h1 className="text-4xl font-bold text-gray-900">
                  {page.metadata.h1}
                  <br /> {page.metadata.section_title}
                </h1>
                <p className="text-lg text-gray-700 w-[71%]">
                  {page.metadata.subheadline}
                </p>
                <div className="flex space-x-4">
                  <Button>
                    <p>Contact Us</p>
                  </Button>
                </div>
              </div>

              {/* Image section */}
              <div className="grid grid-cols-2 gap-4">
                {/* Larger image on the left */}
                <div className="flex items-center justify-center">
                  <img
                    src={`${page.metadata.image.imgix_url}`}
                    alt="Main POS Image"
                    className="rounded-lg w-full h-auto object-cover"
                  />
                </div>

                {/* Two smaller images on the right */}
                <div className="grid grid-rows-2 gap-4">
                  {page.metadata.sections.slice(0, 2).map(
                    (section: SectionType, index: number) => (
                      <div
                        key={index}
                        className="flex items-center justify-center"
                      >
                        <img
                          src={`${section.image.imgix_url}`}
                          alt={`POS Image ${index + 1}`}
                          className="rounded-lg w-full h-auto object-cover"
                        />
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hardware List Section */}
        <HardwareList
          className="mt-6 w-full grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
          query={{ type: "hardwares" }}
        />
      </section>
    </main>
  );
}
