import { cosmic } from "@/cosmic/client";
import { ContactButton } from "@/components/ContactButton";
import { TalkToSales } from "@/components/TalkToSales";

export const revalidate = 0;
export default async function pos() {
  const { object: pos } = await cosmic.objects
    .findOne({
      type: "pos",
    })
    .props("slug,title,metadata")
    .depth(1);

  return (
    <div className="container mx-auto py-16 space-y-16 bg-white dark:bg-black text-gray-800 dark:text-white">
      {/* First Section */}
      <section className="flex flex-col md:flex-row justify-between items-center">
        {/* Left Side - Text Content */}
        <div className="flex-1 mb-8 md:mb-0">
          <h1 className="text-3xl font-bold mb-4">{pos.metadata.h1}</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            RestoSuite is the best software solution for hospitality and
            restaurants that value service quality and seek innovation.
            Integrate your business into the digital world today!
          </p>
          <div className="flex gap-4">
            <ContactButton className="bg-blue-700 text-white dark:bg-blue-600 dark:hover:bg-blue-500" />
            <TalkToSales />
          </div>
        </div>

        {/* Right Side - Product Image */}
        <div className="flex-1 flex justify-center">
          <img
            src={`${pos.metadata.posimg1.imgix_url}`}
            alt="Retail POS System"
            className="w-full max-w-md h-auto rounded-lg shadow dark:shadow-lg"
          />
        </div>
      </section>

      {/* Second Section */}
      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Satisfy more customers with fast, secure payment methods
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Keep up with consumer demand by accepting the most wanted payment
          services on the market. You can accept a range of payment options,
          from online payments, pay via digital wallet, or link.
        </p>

        {/* Icon and Text Rows */}
        <div className="flex flex-col md:flex-row justify-around items-center">
          {/* Chip and Pin */}
          <div className="md:w-1/4 text-center mb-8 md:mb-0">
            <div className="mx-auto mb-4 w-16 h-16">
              <img
                src="/Icon/debitcard.svg"
                alt="debitcard"
                className="w-full h-full"
              />
            </div>
            <h3 className="text-xl font-semibold">Apple / Google Wallet</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Apple and Google Wallet support the use of digital membership
              cards for added convenience.
            </p>
          </div>

          {/* Contactless */}
          <div className="md:w-1/4 text-center mb-8 md:mb-0">
            <div className="mx-auto mb-4 w-16 h-16">
              <img
                src="/Icon/atmtool.svg"
                alt="atmtool"
                className="w-full h-full"
              />
            </div>
            <h3 className="text-xl font-semibold">Effective sales</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Save 4+ hours per month during sales with the AdaPos Payments
              integration.
            </p>
          </div>

          {/* Remote Payments */}
          <div className="md:w-1/4 text-center">
            <div className="mx-auto mb-4 w-16 h-16">
              <img
                src="/Icon/scanning.svg"
                alt="scanning"
                className="w-full h-full"
              />
            </div>
            <h3 className="text-xl font-semibold">Gift Card</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Purchase or transfer gift cards online (online payment, invite to
              receive rewards).
            </p>
          </div>
        </div>
      </section>

      {/* Third Section */}
      <section className="flex flex-col pt-10 md:flex-row justify-between items-center">
        {/* Left Side - Image */}
        <div className="flex-1 flex justify-center">
          <img
            src={`${pos.metadata.posimg2.imgix_url}`}
            alt="POS system promotion"
            className="w-full max-w-md h-auto rounded-lg shadow dark:shadow-lg"
          />
        </div>

        {/* Right Side - Text */}
        <div className="flex-1 mb-10 md:mb-0">
          <h2 className="text-3xl font-bold mb-4">
            One system at the core of your business
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Whether you run a Restaurant, a Fast Food, a Café or a Food Truck,
            build it for success with a dedicated POS system.
          </p>
          <ul className="list-none space-y-2 text-gray-600 dark:text-gray-400">
            <li>
              ✔ Multi-site and omnichannel store management, all in one place
            </li>
            <li>
              ✔ Detailed sales analytics that reveal top-performing products
              and employees
            </li>
            <li>✔ Extensive inventory management with real-time updates</li>
            <li>
              ✔ Integrate with a fully loaded ecommerce platform that syncs
              with your POS
            </li>
            <li>
              ✔ Choose from a suite of business automation apps and add-ons,
              from marketing to bookkeeping, to ecommerce
            </li>
          </ul>
          <p className="text-gray-600 dark:text-gray-400 mt-4">
            The Complete Retail Solution includes POS software, terminal with
            built-in printer, and cash drawer - everything you need to trade.
          </p>
        </div>
      </section>

      <section className="flex flex-col md:flex-row justify-between items-center">
        <div className="container mx-auto grid md:grid-cols-2 items-center gap-8 px-4">
          {/* Left: Image */}
          <div className="relative">
            <img
              src={`${pos.metadata.posimg4.imgix_url}`}
              alt="POS system on tablet"
              className="w-full max-w-md h-auto"
            />
          </div>
          {/* Right: Text Content */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Eliminate confusion with real-time kitchen management
            </h2>
            <p className="mb-6 text-gray-700 dark:text-gray-400">
              Increase table turnover and effortlessly connect your kitchen with
              real-time management.
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-400 space-y-2">
              <li>Track time-at-table and manage floor plans in real-time</li>
              <li>Speed up service with tableside ordering and payment</li>
              <li>
                Sync with major restaurant management apps to boost revenue and
                productivity
              </li>
              <li>
                Make sure customers get what they ordered. On-time, every time!
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white dark:bg-black">
        <div className="container mx-auto grid md:grid-cols-2 items-center gap-8 px-4">
          {/* Left: Text Content */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Hospitality POS hardware
            </h2>
            <p className="mb-6 text-gray-700 dark:text-gray-400">
              Get started scaling your business with a fully customisable
              hospitality point of sale system.
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-400 space-y-2">
              <li>
                Duo Countertop POS terminal, with 15.6" full HD touchscreen,
                10.1" HD customer touchscreen, and built-in 80mm thermal receipt
                printer
              </li>
              <li>Air card machine with Adatop Payments</li>
              <li>High-quality, secure all-metal cash drawer</li>
              <li>Hardware add-ons to complete your system</li>
            </ul>
            <p className="mt-6 text-gray-700 dark:text-gray-400">
              Running a larger hospitality business with multiple sites? We are
              also good at this!
            </p>
          </div>
          {/* Right: Image */}
          <div className="relative">
            <img
              src={`${pos.metadata.posimg5.imgix_url}`}
              alt="POS system on tablet"
              className="w-full max-w-md h-auto"
            />
          </div>
        </div>
      </section>

      <section className="bg-gray-100 dark:bg-gray-800 py-12">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Got multiple hospitality businesses? Try Adapos Enterprise!
          </h2>
          <div className="flex justify-center gap-4">
            <ContactButton text="Request a Demon" />
          </div>
        </div>
      </section>
    </div>
  );
}
