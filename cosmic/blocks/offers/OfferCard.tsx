import Link from "next/link";

export type PostType = {
  id: string;
  slug: string;
  title: string;
  metadata: {
    image?: {
      imgix_url?: string;
    };
    summary?: string;
    content?: string;
  };
};

export function OfferCard({ post }: { post: PostType }) {
  return (
    <Link
      href={`/exclusive-offers/${post.slug}`}
      className="group relative flex flex-col items-start"
    >
      <div className="relative w-full">
        <img
          src={`${post.metadata.image?.imgix_url}?w=800&auto=format,compression`}
          alt={post.title}
          className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
        />
      </div>
      <h2 className="mt-3 text-lg font-semibold leading-6 text-gray-900 dark:text-gray-100 group-hover:text-gray-600 dark:group-hover:text-gray-300">
        {post.title}
      </h2>
      <div
        className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400"
        dangerouslySetInnerHTML={{ __html: post.metadata.summary || "" }}
      />
    </Link>
  );
}
