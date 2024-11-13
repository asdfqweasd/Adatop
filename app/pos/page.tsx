import { cosmic } from "@/cosmic/client";
export const revalidate = 0; 
export default async function pos() {
  const { object: pos } = await cosmic.objects
    .findOne({
      type: "pos",
    })
    .props("slug,title,metadata")
    .depth(1);

  return (
    <div className="container mx-auto py-16 space-y-16">
      {/* First Section */}
      <section className="flex flex-col md:flex-row justify-between items-center">
        {/* Left Side - Text Content */}
        <div className="flex-1 mb-8 md:mb-0">
          <h1 className="text-3xl font-bold mb-4">{pos.metadata.h1}</h1>
          <p className="text-gray-600 mb-4">
            Delight shoppers, speed up sales, and grow your business. Tailor
            your Epos Now retail POS to your exact needs with our AppStore.
          </p>
          <p className="font-semibold mb-4">
            Get your retail POS now and{" "}
            <span className="text-pink-600">save up to 86%!</span>
          </p>
          <p className="text-lg mb-6">
            <del className="text-gray-500">WAS $1,199</del>, NOW FROM{" "}
            <span className="text-pink-600 text-2xl">$599*</span>
          </p>
          <div className="flex gap-4">
            <button className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700">
              Get your offer
            </button>
            <button className="bg-white text-blue-600 py-2 px-6 border border-blue-600 rounded-md hover:bg-blue-50">
              Talk to sales
            </button>
          </div>
        </div>

        {/* Right Side - Product Image */}
        <div className="flex-1 flex justify-center">
          <img
            src={`${pos.metadata.posimg1.imgix_url}`}
            alt="Retail POS System"
            className="w-full max-w-md h-auto"
          />
        </div>
      </section>

      {/* Second Section */}
      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Satisfy more customers with fast, secure payment methods
        </h2>
        <p className="text-gray-600 mb-8">
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
            <h3 className="text-xl font-semibold">Quicker admin</h3>
            <p className="text-gray-600">
              Save up to 10 hours every month on business management and staff
              admin.
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
            <p className="text-gray-600">
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
            <h3 className="text-xl font-semibold">Easier stock counts</h3>
            <p className="text-gray-600">
              Enjoy 80% faster stock counts with the AdaPos wireless scanner.
            </p>
          </div>
        </div>
      </section>

      {/* Third Section */}
      <section className="flex flex-col md:flex-row justify-between items-center">
        {/* Left Side - Image */}
        <div className="flex-1 flex justify-center">
          <img
            src={`${pos.metadata.posimg2.imgix_url}`}
            alt="POS system promotion"
            className="w-full max-w-md h-auto"
          />
        </div>

        {/* Right Side - Text */}
        <div className="flex-1 mb-8 md:mb-0">
          <h2 className="text-3xl font-bold mb-4">
            One system at the core of your business
          </h2>
          <p className="text-gray-600 mb-4">
            Whether you run a Restaurant, a Fast Food, a Café or a Food Truck,
            build it for success with a dedicated POS system.
          </p>
          <ul className="list-none space-y-2">
            <li>✔ Multi-site and omnichannel store management, all in one place</li>
            <li>✔ Detailed sales analytics that reveal top-performing products and employees</li>
            <li>✔ Extensive inventory management with real-time updates</li>
            <li>✔ Integrate with a fully loaded ecommerce platform that syncs with your pos</li>
            <li>✔ Choose from a suite of business automation apps and add ons, from marketing to bookkeeping, to ecommerce</li>
          </ul>
          <p className="text-gray-600 mt-4">
            The Complete Retail Solution includes POS software, terminal with
            built-in printer, and cash drawer - everything you need to trade.
          </p>
          <button className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 mt-6">
            Get your offer
          </button>
        </div>
      </section>

      {/* Fourth Section */}
      <section className="flex flex-col md:flex-row justify-between items-center">
        {/* Left Side - Text Content */}
        <div className="flex-1 mb-8 md:mb-0">
          <h2 className="text-3xl font-bold mb-4">Open your store to the world</h2>
          <p className="text-gray-600 mb-4">
            Building an online presence has never been more important. Manage omnichannel trading with ease when you integrate with your chosen ecommerce platform.
          </p>
          <ul className="list-none space-y-2 text-gray-600">
            <li>✔ Launch your online store using a reliable and versatile ecommerce platform</li>
            <li>✔ Offer choice, safety and convenience to your customers with Click & Collect services</li>
            <li>✔ Track your online orders and in-store purchases together for simplified money and stock management</li>
            <li>✔ Provide the payment options that work best for you and your customers</li>
            <li>✔ Manage multi-site trading with ease. See our <a href="#" className="text-blue-600 underline">enterprise</a> page for more details</li>
          </ul>
        </div>

        {/* Right Side - Image */}
        <div className="flex-1 flex justify-center">
          <img
            src={`${pos.metadata.posimg3.imgix_url}`}
            alt="POS system on tablet"
            className="w-full max-w-md h-auto"
          />
        </div>
      </section>
    </div>
  );
}
