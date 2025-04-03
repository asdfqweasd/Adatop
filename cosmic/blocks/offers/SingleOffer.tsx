"use client";
import { cosmic } from "@/cosmic/client";
import { useState, useEffect } from "react";

export async function SingleOffer({ query }: { query: any }) {
  const { object: post } = await cosmic.objects
    .findOne(query)
    .props("slug,title,metadata")
    .depth(1);

  if (!post) return null;

  return (
    <article className="mx-auto max-w-4xl">
      <header className="space-y-6">
        <div className="mx-auto max-w-3xl">
          <ImageCarousel
            images={[
              post.metadata.image?.imgix_url,
              post.metadata.image2?.imgix_url,
              post.metadata.image3?.imgix_url,
            ].filter(Boolean)}
          />
        </div>
        <div className="space-y-4 px-4">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
            {post.title}
          </h1>
          {post.metadata.short_intro && (
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              {post.metadata.short_intro}
            </p>
          )}
        </div>
      </header>
      <div className="mt-8 prose dark:prose-invert max-w-none px-4">
        <div
          dangerouslySetInnerHTML={{ __html: post.metadata.content }}
          className="prose-img:rounded-xl prose-headings:text-zinc-800 dark:prose-headings:text-zinc-100"
        />
      </div>
    </article>
  );
}

function ImageCarousel({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [images.length]);

  if (!images.length) return null;

  return (
    <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden rounded-lg bg-gray-100">
      {images.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={`${image}?w=1200&auto=format,compression`}
            alt=""
            className="h-full w-full object-contain"
          />
        </div>
      ))}

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 bg-black/10 rounded-full px-3 py-1.5">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? "bg-white w-4"
                : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>

      <button
        onClick={() =>
          setCurrentIndex(
            (current) => (current - 1 + images.length) % images.length
          )
        }
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition-all hover:scale-110"
      >
        ←
      </button>
      <button
        onClick={() =>
          setCurrentIndex((current) => (current + 1) % images.length)
        }
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition-all hover:scale-110"
      >
        →
      </button>
    </div>
  );
}
