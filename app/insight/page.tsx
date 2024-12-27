import { cosmic } from "@/cosmic/client";
import ReactMarkdown from "react-markdown";
import { ContactButton } from "@/components/ContactButton";

export default async function Insight() {
  const { object: insight } = await cosmic.objects
    .findOne({
      type: "insight",
      slug: "insight",
    })
    .props("slug,title,metadata,type")
    .depth(1);

  if (!insight) return <div>Something went wrong</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-16 pt-32 flex flex-col items-center max-w-7xl mx-auto">
        <h1 className="text-6xl text-center mb-4 text-gray-800 dark:text-gray-100">
          <span className="block mb-4">
            <ReactMarkdown>{insight.metadata.title}</ReactMarkdown>
          </span>
        </h1>
        <p className="text-center text-gray-700 dark:text-gray-300 mb-16 max-w-3xl text-lg leading-relaxed">
          {insight.metadata.title_detail}
        </p>
        <div className="flex justify-center w-full mb-24">
          <ContactButton
            className="text-lg py-4 px-8 rounded-full font-medium"
            text="Request your demo"
          ></ContactButton>
        </div>
      </div>

      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="space-y-10 px-4">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                Mobile Business Data Analysis and Abnormal Transaction Alerts
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                RS Insight provides rich business data analysis and abnormal
                transaction alerts, purchase order management, report analysis,
                financial account reconciliation and other functions
              </p>
            </div>
            <div className="relative w-full h-[500px]">
              <img
                src={`${insight.metadata.img[0].imgix_url}?w=1600&fm=gif`}
                alt="rsInsight"
                className="object-contain w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
