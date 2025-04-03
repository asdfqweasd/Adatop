import { OfferCard, PostType } from "./OfferCard";
import { cosmic } from "@/cosmic/client";

export async function OfferList({
  query,
  sort,
  limit,
  skip,
  className,
  status,
}: {
  query: any;
  sort?: string;
  limit?: number;
  skip?: number;
  className?: string;
  status?: "draft" | "published" | "any";
}) {
  const { objects: posts } = await cosmic.objects
    .find(query)
    .props("id,slug,title,metadata")
    .depth(1)
    .sort(sort ? sort : "-order")
    .limit(limit ? limit : 100)
    .skip(skip ? skip : 0)
    .status(status ? status : "published");

  return (
    <div className={className}>
      {posts.map((post: PostType) => {
        return <OfferCard key={post.id} post={post} />;
      })}
    </div>
  );
}
