import { cosmic } from "@/cosmic/client";
import { Button } from "@/cosmic/elements/Button";

export default async function payments() {
  const { object: payment } = await cosmic.objects
    .findOne({
      type: "payments",
    })
    .props("slug,title,metadata")
    .depth(1);

  type Image = {
    url: string;
    imgix_url: string;
  };
  return (
    <div className="container mx-auto py-16">
      {/* Section 1 */}
      <section className="flex flex-col md:flex-row items-center mb-16">
        {/* Text Section */}
        <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <div className="flex items-center justify-center md:justify-start mb-4">
            <span className="bg-blue-500 p-2 rounded-full">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 22C6.48 22 2 17.52 2 12S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10zm0-18c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm1 13h-2v-6h2v6zm0-8h-2V7h2v2z" />
              </svg>
            </span>
            <h2 className="text-2xl font-semibold ml-2">
              {payment.metadata.h1}
            </h2>
          </div>
          <h1 className="text-4xl font-bold mb-4">{payment.metadata.title}</h1>
          <p className="text-gray-600 mb-8">{payment.metadata.description}</p>
          <div>
            <a
              href="#"
              className="bg-blue-600 text-white px-6 py-2 rounded-full mr-4"
            >
              Get your offer
            </a>
            <a
              href="#"
              className="text-blue-600 px-6 py-2 rounded-full border border-blue-600"
            >
              Talk to sales
            </a>
          </div>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={`${payment.metadata.machineimg.imgix_url}`}
            alt="Payment Device"
            className="w-3/4 md:w-2/3"
          />
        </div>
      </section>

      {/* Section 2 */}
      <section className="flex flex-col md:flex-row items-center">
        {/* Image Section */}
        <div className="md:w-1/2 mb-8 md:mb-0 flex justify-center">
          <img
            src={`${payment.metadata.secondlineimg.imgix_url}`}
            alt="People in a cafe"
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Text Section */}
        <div className="md:w-1/2 text-center md:text-left ml-16">
          <h1 className="text-3xl font-bold mb-4">
            Payments designed for your business
            占位符h1 or 写死
          </h1>
          <p className="text-gray-600 mb-4">
            Our{" "}
            <a href="#" className="text-blue-600 underline">
              payment processing
              占位符a or 写死
            </a>{" "}
            service seamlessly integrates into your
            <a href="#" className="text-blue-600 underline">
              {" "}
              retail
            </a>{" "}
            or{" "}
            <a href="#" className="text-blue-600 underline">
              hospitality
            </a>{" "}
            point of sale system. Get everything from a single portal, all
            managed by one payment provider.
            占位符p or 写死
          </p>
          <ul className="list-none space-y-3 mb-8">
            <li>
              ✔ Offer customers their preferred payment option and accept
              payments at a fixed rate.**
            </li>
            <li>
              ✔ Process payments quickly and efficiently with Epos Now
              Payments.
            </li>
            <li>
              ✔ Create and enhance your experience with our wide range of
              partners in the{" "}
              <a href="#" className="text-blue-600 underline">
                AppStore
              </a>
              .
            </li>
          </ul>
          <a href="#" className="bg-blue-600 text-white px-6 py-2 rounded-full">
            Get your offer
          </a>
        </div>
      </section>
    </div>
  );
}
