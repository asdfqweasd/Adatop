import { OfferList } from "@/cosmic/blocks/offers/OfferList";

export const revalidate = 0;

export default async function ExclusiveOffersPage() {
  return (
    <main className="p-4">
      <section className="md:container pb-8 m-auto">
        <div className="m-auto flex max-w-[950px] flex-col items-start gap-2">
          <h1 className="mb-4 m-auto md:mx-0 text-3xl md:text-6xl font-display text-zinc-900 dark:text-zinc-100 leading-tight tracking-tighter">
            Exclusive Offers
          </h1>
          <OfferList
            query={{ type: "offers" }}
            sort="-created_at"
            limit={10}
            skip={0}
            className="mx-auto grid w-full max-w-screen-lg grid-cols-1 flex-col gap-5 pb-24 sm:grid-cols-2 lg:gap-10"
          />
        </div>
      </section>
    </main>
  );
}
