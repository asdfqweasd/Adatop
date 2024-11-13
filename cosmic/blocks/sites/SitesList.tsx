import { cosmic } from "@/cosmic/client";
import { EventCard, EventCardType } from "./SitesCard";
export const revalidate = 0; 
export async function EventsList({
  query,
  className,
  preview,
}: {
  query: any;
  className?: string;
  preview?: boolean;
}) {
  const { objects: sites } = await cosmic.objects
    .find(query)
    .props("title,slug,metadata")
    .depth(1)
    .status(preview ? "any" : "published");
  
  return (
    <div className={className}>
      {sites?.map((site: EventCardType) => {
        return <EventCard event={site} key={site.slug} />;
      })}
    </div>
  );
}
