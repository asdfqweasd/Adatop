import { cosmic } from "@/cosmic/client";

export default async function kds() {
  const { object: kds } = await cosmic.objects
    .findOne({
      type: "kds",
      slug: "kds",
    })
    .props("slug,title,metadata,type")
    .depth(1);

  if (!kds) return <div>Something went wrong</div>;

  return (
    <main className="p-8 min-h-screen flex flex-col items-center bg-gray-50 dark:bg-gray-900">
      <h1 className="mt-4 text-4xl text-center mb-6 font-extrabold text-gray-800 dark:text-gray-100">
        {kds.metadata.title}
      </h1>
      <p className="text-center text-gray-700 dark:text-gray-300 mb-12 max-w-4xl text-lg leading-relaxed whitespace-pre-line">
        {kds.metadata.p1}
      </p>

      <div className="flex flex-col md:flex-row justify-center gap-12 w-full mb-16">
        <div className="flex-1 max-w-xl h-[400px] flex items-center justify-center rounded-lg shadow-lg bg-white dark:bg-gray-800">
          <img
            src={`${kds.metadata.image_gif[0].imgix_url}?w=1600&fm=gif`}
            alt={kds.metadata.title}
            className="max-h-full max-w-full object-contain rounded-lg"
          />
        </div>

        <div className="flex-1 max-w-xl h-[400px] items-center justify-center rounded-lg shadow-lg bg-white dark:bg-gray-800 hidden md:flex">
          <img
            src={`${kds.metadata.image_right.imgix_url}?w=1600&auto=format,compression`}
            alt={kds.metadata.title}
            className="max-h-full max-w-full object-contain rounded-lg"
          />
        </div>
      </div>

      <section className="flex flex-col md:flex-row justify-between items-center my-12 gap-12 max-w-6xl">
        <div className="flex-1">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            {kds.metadata.title2}
          </h2>
          <div
            className="prose dark:prose-invert text-left max-w-4xl mb-12 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: kds.metadata.title2_detail }}
          />
        </div>
        <div className="flex-1 flex justify-center">
          <img
            src={`${kds.metadata.title2_img.imgix_url}?w=1600&auto=format,compression`}
            alt={kds.metadata.title2_detail}
            className="rounded-lg shadow-lg max-w-full h-auto"
          />
        </div>
      </section>

      <section className="flex flex-col md:flex-row-reverse justify-between items-center my-12 gap-12 max-w-6xl">
        <div className="flex-1">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            {kds.metadata.title3}
          </h2>
          <div
            className="prose dark:prose-invert text-left max-w-4xl mb-12 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: kds.metadata.title3_detail }}
          />
        </div>
        <div className="flex-1 flex justify-center">
          <img
            src={`${kds.metadata.title3_img.imgix_url}?w=1600&auto=format,compression`}
            alt={kds.metadata.title3_detail}
            className="rounded-lg shadow-lg max-w-full h-auto"
          />
        </div>
      </section>
    </main>
  );
}
