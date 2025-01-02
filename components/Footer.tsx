// components/footer.tsx
import { cosmic } from "@/cosmic/client";
import { buttonVariants } from "@/cosmic/elements/Button";
import { MailIcon, PhoneIcon } from "lucide-react";
import { ModeToggle } from "./theme-toggle";
import { NavMenu } from "@/cosmic/blocks/navigation-menu/NavMenu";

export default async function Footer() {
  const { object: settings } = await cosmic.objects
    .findOne({
      type: "global-settings",
      slug: "settings",
    })
    .props("metadata")
    .depth(1);

  type Link = {
    url: string;
    company: string;
    icon: {
      imgix_url: string;
    };
  };

  return (
    <footer className="container mx-auto pb-12 flex flex-col items-center border-t-2 border-gray-200 border-b-2 dark:border-gray-800 mt-16">
      <div className="w-full justify-center hidden md:flex dark:border-gray-800 mb-16">
        <NavMenu
          query={{ type: "navigation-menus", slug: "footer" }}
          className="flex flex-row gap-8"
        />
      </div>
      

      <div className="w-full flex flex-wrap items-center justify-between gap-4 mb-16">
        <div className=" mt-8 ml-10 flex gap-x-14 text-zinc-700 dark:text-zinc-300">
          <div>
            <a
              href={`mailto:${settings.metadata.email}`}
              className={buttonVariants({ variant: "outline" })}
            >
              <MailIcon className="w-4 inline-block mr-2" />
              Email us
            </a>
          </div>
          <div>
            <a
              href={`tel:${settings.metadata.phone}`}
              className={buttonVariants({ variant: "outline" })}
            >
              <PhoneIcon className="w-4 inline-block mr-2" />
              Call us
            </a>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-8 mr-10">
          {settings.metadata.links.map((link: Link, index: number) => (
            <a
              key={`${link.url}-${index}`}
              href={link.url}
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="h-[26px]"
                src={`${link.icon.imgix_url}?w=500&auto=format,compression`}
                alt={link.company}
              />
            </a>
          ))}
        </div>
        <ModeToggle />
      </div>
    </footer>
  );
}
