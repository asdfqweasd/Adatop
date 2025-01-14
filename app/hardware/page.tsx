// page.tsx
import { HardwareList } from "@/cosmic/blocks/hardware/HardwareList";
import { cosmic } from "@/cosmic/client";
import { ClientHero } from "@/components/ClientHero";
export default async function Hardware() {
  const { object: page } = await cosmic.objects
    .findOne({
      type: "pages",
      slug: "hardware",
    })
    .props("slug,title,metadata")
    .depth(1);

  if (!page) return <div>Something wrong</div>;

  return (
    <main className="p-4">
      <section className="md:container pb-8 m-auto dark:bg-black">
        <ClientHero pageData={page} />

        {/* Hardware List Section */}
        <HardwareList
          className="mt-6 w-full grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
          query={{ type: "hardwares" }}
        />
      </section>
    </main>
  );
}
