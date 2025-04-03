import { SingleOffer } from "@/cosmic/blocks/offers/SingleOffer";

export const revalidate = 0;

export default async function OfferDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <main className="p-4">
      <SingleOffer query={{ slug: params.slug, type: "offers" }} />
    </main>
  );
}
