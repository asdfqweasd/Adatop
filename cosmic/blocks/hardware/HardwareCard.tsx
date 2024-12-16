// components/Hardware-card.tsx
import Link from "next/link";
import { cn } from "@/cosmic/utils";

export type HardwareType = {
  id: string;
  title: string;
  slug: string;
  metadata: {
    image: {
      imgix_url: string;
    };
    description: string;
    price: number;
  };
};

export function HardwareCard({
  Hardware,
  className,
}: {
  Hardware: HardwareType;
  className?: string;
}) {
  return (
    <Link
      href={`/${Hardware.slug}`}
      className={cn("group relative", className)}
    >
      <div className="h-52 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
        <img
          src={`${Hardware.metadata.image.imgix_url}?w=1200&auto=format,compression`}
          alt={Hardware.title}
          className="h-full w-full bg-white  object-cover object-center dark:border-zinc-800 lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-2 flex justify-between">
        <div>
          <h3 className="text-sm text-zinc-700 dark:text-zinc-300">
            <span aria-hidden="true" className="absolute inset-0"></span>
            {Hardware.title}
          </h3>
        </div>
        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
          ${Hardware.metadata.price.toLocaleString("en-US")}
        </p>
      </div>
    </Link>
  );
}
