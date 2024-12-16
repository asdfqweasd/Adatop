"use client";

import { motion } from "framer-motion";
import { ContactButton } from "@/components/ContactButton";

interface QRCodePageProps {
  qrcode: any;
}

export function QRCodePage({ qrcode }: QRCodePageProps) {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const fadeInLeft = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6 },
  };

  const fadeInRight = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="grid md:grid-cols-2 gap-8 items-center max-w-7xl mx-auto px-4 py-20">
        <motion.div
          className="flex flex-col space-y-6 md:pr-12"
          {...fadeInLeft}
        >
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            <span className="text-indigo-600">Say goodbye</span>
            <br />
            to waiting!
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Digitize your menu and enhance your restaurant's efficiency.
          </p>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Revolutionize the interaction your customers have with your
            restaurant. With a simple QR code scan, your diners can access an
            interactive menu, view the menu, customize their favorite dishes,
            and make payments.
          </p>
          <div className="pt-4">
            <ContactButton
              text="Request your Demo"
              className="bg-indigo-600 hover:bg-indigo-700 text-lg py-4 px-8 rounded-lg font-medium"
            />
          </div>
        </motion.div>
        <motion.div
          className="relative h-[600px] md:h-[700px]"
          {...fadeInRight}
        >
          <img
            src={`${qrcode.metadata.qrimg1?.imgix_url}?w=1600&auto=format,compression`}
            alt="QR Code Scanning"
            className="absolute right-0 top-0 w-full h-full object-contain"
          />
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-24">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              className="space-y-8"
              {...fadeInLeft}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                Scan the QR and order from the table!
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                Revolutionize the interaction your customers have with your
                restaurant. With a simple QR code scan, your diners can access
                an interactive menu, view the menu, customize their favorite
                dishes, and make payments.
              </p>
            </motion.div>
            <motion.div
              className="relative"
              {...fadeInRight}
              viewport={{ once: true }}
            >
              <div className="absolute -left-4 -top-4 w-32 h-32 bg-indigo-600/10 rounded-full" />
              <div className="relative z-10">
                <img
                  src={`${qrcode.metadata.qrimg2?.imgix_url}?w=1200&auto=format,compression`}
                  alt="Digital Menu"
                  className="w-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Kitchen Integration Section */}
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <motion.div
            className="relative order-2 md:order-1"
            {...fadeInLeft}
            viewport={{ once: true }}
          >
            <div className="relative flex justify-center">
              <motion.img
                src={`${qrcode.metadata.qrimg3?.imgix_url}?w=800&auto=format,compression`}
                alt="Kitchen Display"
                className="w-4/5"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
              <motion.img
                src={`${qrcode.metadata.qrimg4?.imgix_url}?w=400&auto=format,compression`}
                alt="Printer"
                className="absolute -bottom-20 -left-56 w-2/3"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
          <motion.div
            className="space-y-8 order-1 md:order-2"
            {...fadeInRight}
            viewport={{ once: true }}
          >
            <div className="inline-block">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                Delivery Order
              </h2>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                Right in the kitchen.
              </h2>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Orders go directly to your kitchen display system and printer,
              ensuring quick and accurate preparation. Streamline your kitchen
              operations and reduce wait times.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Service Efficiency Section */}
      <div className="bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-24">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <motion.div
              className="space-y-8"
              {...fadeInLeft}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                Improve Service Efficiency
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                Reduce wait times and optimize your staff's workflow. With
                self-ordering and direct payments, your servers can focus on
                providing an exceptional service rather than taking orders and
                processing payments.
              </p>
              <ContactButton
                text="Learn more"
                className="bg-indigo-600 hover:bg-indigo-700 text-lg py-3 px-6 rounded-lg transform transition hover:scale-105"
              />
            </motion.div>
            <motion.div
              className="relative"
              {...fadeInRight}
              viewport={{ once: true }}
            >
              <div className="relative">
                <img
                  src={`${qrcode.metadata.qrimg5?.imgix_url}?w=800&auto=format,compression`}
                  alt="Service Staff"
                  className="relative z-10 w-full transition-transform hover:scale-[1.02]"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* All-in-One Payment Section */}
      <motion.div
        className="max-w-7xl mx-auto px-4 py-24 text-center"
        {...fadeInUp}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-16">
          All-in-One Payment
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-4">
          Accept payments from all your online platforms
        </p>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
          Offer your customers the ability to pay online from any device. Our
          solutions are designed to help you improve conversion by optimizing
          the user experience at payment
        </p>

        <motion.div
          className="grid grid-cols-4 md:grid-cols-7 gap-8 items-center justify-items-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
          viewport={{ once: true }}
        >
          <motion.img
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            src="/Icon/mastercard-full-svgrepo-com.svg"
            alt="Mastercard"
            className="h-32 w-auto"
          />
          <motion.img
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            src="/Icon/visa-classic-svgrepo-com.svg"
            alt="Visa"
            className="h-32 w-auto"
          />
          <motion.img
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            src="/Icon/amex-svgrepo-com.svg"
            alt="American Express"
            className="h-32 w-auto"
          />
          <motion.img
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            src="/Icon/union-pay-svgrepo-com.svg"
            alt="Unionpay"
            className="h-32 w-auto"
          />
          <motion.img
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            src="/Icon/apple-pay-svgrepo-com.svg"
            alt="Apple Pay"
            className="h-32 w-auto"
          />
          <motion.img
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true }}
            src="/Icon/google-pay-svgrepo-com.svg"
            alt="Google Pay"
            className="h-32 w-auto"
          />
          <motion.img
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            viewport={{ once: true }}
            src="/Icon/paypal-svgrepo-com.svg"
            alt="PayPal"
            className="h-32 w-auto"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
