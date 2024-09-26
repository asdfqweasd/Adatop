import { SingleEvent } from "@/cosmic/blocks/sites/SingleEvent";

export default async function SingleEventPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <main className="p-4">
      <SingleEvent query={{ slug: params.slug, type: "sites" }} />
    </main>
  );
}
