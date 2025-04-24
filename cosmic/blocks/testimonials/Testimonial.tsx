import { cn } from "@/cosmic/utils";

export type TestimonialType = {
  title: string;
  slug: string;
  metadata: {
    company: string;
    position: string;
    quote: string;
    image: {
      imgix_url: string;
    };
  };
};

export function Testimonial({
  testimonial,
  className,
}: {
  testimonial: TestimonialType;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "mb-6 flex flex-col gap-6 overflow-hidden rounded-xl bg-zinc-100 p-6 dark:bg-zinc-800 md:flex-row md:gap-8 md:p-6",
        className
      )}
    >
      <div className="flex-shrink-0">
        <img
          className="mx-auto h-30 w-24 rounded-full object-cover shadow-md md:h-32 md:w-32"
          src={`${testimonial.metadata.image.imgix_url}?w=500&h=500&auto=format,compression&fit=facearea&facepad=3`}
          alt={testimonial.title}
        />
      </div>
      <div className="flex flex-col justify-center space-y-4 text-center md:text-left">
        <blockquote className="relative">
          <p className="relative z-10 text-lg text-zinc-600 dark:text-zinc-300">
            &quot;{testimonial.metadata.quote}&quot;
          </p>
        </blockquote>
        <figcaption className="font-medium">
          <div className="text-sky-500 dark:text-sky-400">
            {testimonial.title}
          </div>
          <div className="text-zinc-500 dark:text-zinc-400">
            {testimonial.metadata.position}
            {testimonial.metadata.company &&
              `, ${testimonial.metadata.company}`}
          </div>
        </figcaption>
      </div>
    </figure>
  );
}
