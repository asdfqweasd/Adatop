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

  // return (
  //   // <div>
  //   //   <h1>{posmachines.metadata.machines[0].title}</h1>
  //   //   <p>{posmachines.metadata.machines[0].price}</p>
  //   //   <p>{posmachines.metadata.machines[0].description}</p>
  //   //   <img
  //   //     src={`${posmachines.metadata.machines[0].img1.imgix_url}?w=1600&auto=format,compression`}
  //   //     alt={posmachines.metadata.machines[0].title}
  //   //     className="w-full h-auto"
  //   //   />
  //   // </div>
  //   <div>
  //     <h1>POS Machines {}</h1>
  //     {posmachines?.map((machine: any) => (
  //       <div key={machine.id}>
  //         <h1>{machine.title}</h1>
  //       </div>
  //     ))}
  //   </div>
  // );

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
