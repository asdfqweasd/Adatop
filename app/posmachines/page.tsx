import { cosmic } from "@/cosmic/client";
// 待办  改成分类 然后集成single item

export default async function posmachines() {
  const { objects: posmachines } = await cosmic.objects
    .find({
      type: "posmachines",
    })
    .props("slug,title,metadata")
    .depth(1);
  if (!posmachines) return <div>Something went wrong</div>;

  return (
    <main className="p-4">
      <div className="relative m-auto flex max-w-[950px] flex-col items-start gap-2">
        <div className="flex justify-between w-full items-baseline mb-4">
          <h1 className="md:mx-0 text-3xl md:text-6xl font-display text-zinc-900 dark:text-zinc-100 leading-tight tracking-tighter">
            Machines
          </h1>
        </div>
        {/* <MachineList
          query={{ type: "blog-posts" }}
          sort="-created_at"
          limit={10}
          skip={0}
          className="mx-auto grid w-full max-w-screen-lg grid-cols-1 flex-col gap-5 pb-24 sm:grid-cols-2 lg:gap-10"
        /> */}
      </div>
    </main>
  );
}
