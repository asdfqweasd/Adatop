"use client";
import { useState } from "react";
import { ContactModal } from "./ContactModal";
import { motion } from "framer-motion";

interface Machine {
  img: {
    url: string;
    imgix_url: string;
  };
  text: string;
}

interface Series {
  slug: string;
  title: string;
  type: string;
  metadata: {
    machines: Machine[];
  };
}

interface PricingClientProps {
  machines: Series[];
}

// 提取按钮样式为常量
const BUTTON_STYLES = {
  basic:
    "w-full bg-[#15803D] text-white py-2 rounded-lg hover:bg-[#166534] transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg",
  pro: "w-full bg-gradient-to-r from-[#EA580C] to-[#F97316] text-white py-2 rounded-lg hover:from-[#C2410C] hover:to-[#EA580C] transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg",
  enterprise:
    "w-full bg-gradient-to-br from-[#111827] to-[#5B5B5B] text-white py-2 rounded-lg hover:from-[#0F172A] hover:to-[#4B4B4B] transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg",
  custom:
    "inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-[#EA580C] to-[#F97316] hover:from-[#C2410C] hover:to-[#EA580C] shadow-lg hover:shadow-xl transition-all duration-300",
};

// 提取动画配置为常量
const MOTION_CONFIG = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function PricingClient({ machines }: PricingClientProps) {
  const [isYearly, setIsYearly] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const prices = {
    basic: {
      monthly: 40,
      yearly: 1611,
    },
    pro: {
      monthly: 65,
      yearly: 2611,
    },
    enterprise: {
      monthly: 85,
      yearly: 3417,
    },
  };

  const handleOpenForm = () => setIsFormOpen(true);
  const handleCloseForm = () => setIsFormOpen(false);

  // 提取机器卡片渲染函数
  const renderMachineCard = (machine: Machine, index: number) => (
    <div
      key={index}
      className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="h-48 bg-gray-100 dark:bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
        <img
          src={machine.img.url}
          alt={machine.text.split("<h3>")[1]?.split("</h3>")[0] || ""}
          className="h-full w-full object-contain"
        />
      </div>
      <div dangerouslySetInnerHTML={{ __html: machine.text }} />
    </div>
  );

  // 提取系列渲染函数
  const renderSeries = (seriesSlug: string, title: string) => (
    <div className="mb-16">
      <h3 className="text-2xl font-bold mb-8 text-center">{title}</h3>
      <div className="grid md:grid-cols-3 gap-8">
        {machines && machines.length > 0 ? (
          machines
            .find((series) => series.slug === seriesSlug)
            ?.metadata.machines.map(renderMachineCard)
        ) : (
          <div className="col-span-3 text-center text-gray-500">
            No products found
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4">
      {/* Hardware Section */}
      <div className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Hardware Equipment</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Comprehensive hardware support for your business
            </p>
          </div>

          {renderSeries("pos-series", "POS Series")}
          {renderSeries("kds-series", "KDS Series")}
          {renderSeries("self-kiosk-series", "Self Kiosk Series")}
          {renderSeries(
            "printer-and-cash-drawer-series",
            "Printer and Cash Drawer Series"
          )}
        </div>
      </div>

      {/* Separator */}
      <div className="relative py-20">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="px-6 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 text-lg">
            Software Services
          </span>
        </div>
      </div>

      {/* Software Section */}
      <div className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              We offer flexible pricing plans to meet the needs of businesses of
              all sizes
            </p>

            {/* Price Toggle Switch */}
            <div className="flex items-center justify-center space-x-4">
              <span
                className={`text-lg ${!isYearly ? "text-blue-600 font-bold" : "text-gray-500"}`}
              >
                Weekly
              </span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700 transition-colors"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isYearly ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <span
                className={`text-lg ${isYearly ? "text-blue-600 font-bold" : "text-gray-500"}`}
              >
                Yearly{" "}
                <span className="text-sm text-green-500">(Save 15%)</span>
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <div className="border rounded-lg p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <h2 className="text-2xl font-bold mb-4">Basic</h2>
              <p className="text-4xl font-bold mb-6">
                ${isYearly ? prices.basic.yearly : prices.basic.monthly}
                <span className="text-lg text-gray-600">
                  /{isYearly ? "year(ex. GST)" : "week(ex. GST)"}
                </span>
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Basic POS Features
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Online Payment Support
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Basic Reporting
                </li>
              </ul>
              <button onClick={handleOpenForm} className={BUTTON_STYLES.basic}>
                Get Started
              </button>
            </div>

            {/* Pro Plan */}
            <div className="border rounded-lg p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 bg-blue-50 dark:bg-blue-900/20 relative">
              <div className="absolute -top-4 right-4 bg-blue-600 text-white px-4 py-1 rounded-full text-sm">
                Most Popular
              </div>
              <h2 className="text-2xl font-bold mb-4">Pro</h2>
              <p className="text-4xl font-bold mb-6">
                ${isYearly ? prices.pro.yearly : prices.pro.monthly}
                <span className="text-lg text-gray-600">
                  /{isYearly ? "year(ex. GST)" : "week(ex. GST)"}
                </span>
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  All Basic Features
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Advanced Inventory Management
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Multi-store Management
                </li>
              </ul>
              <button onClick={handleOpenForm} className={BUTTON_STYLES.pro}>
                Get Started
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="border rounded-lg p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <h2 className="text-2xl font-bold mb-4">Enterprise</h2>
              <p className="text-4xl font-bold mb-6">
                $
                {isYearly
                  ? prices.enterprise.yearly
                  : prices.enterprise.monthly}
                <span className="text-lg text-gray-600">
                  /{isYearly ? "year(ex. GST)" : "week(ex. GST)"}
                </span>
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  All Pro Features
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Custom Development
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Dedicated Account Manager
                </li>
              </ul>
              <button
                onClick={handleOpenForm}
                className={BUTTON_STYLES.enterprise}
              >
                Contact Us
              </button>
            </div>
          </div>

          {/* Plan Comparison Table */}
          <div className="overflow-x-auto mt-16">
            <table className="min-w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="py-3 px-4 text-left font-bold text-gray-700 dark:text-gray-200">
                    Features
                  </th>
                  <th className="py-3 px-4 text-center font-bold text-blue-700 dark:text-blue-400">
                    Basic
                  </th>
                  <th className="py-3 px-4 text-center font-bold text-blue-700 dark:text-blue-400">
                    Pro
                  </th>
                  <th className="py-3 px-4 text-center font-bold text-blue-700 dark:text-blue-400">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700 dark:text-gray-200">
                {/* POS Features */}
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="py-2 px-4 font-semibold" colSpan={4}>
                    POS Features
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4">Checkout</td>
                  <td className="text-center">✔</td>
                  <td className="text-center">✔</td>
                  <td className="text-center">✔</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="py-2 px-4">Menu Management</td>
                  <td className="text-center">✔</td>
                  <td className="text-center">✔</td>
                  <td className="text-center">✔</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">Staff Management</td>
                  <td className="text-center">✔</td>
                  <td className="text-center">✔</td>
                  <td className="text-center">✔</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="py-2 px-4">Membership Management</td>
                  <td className="text-center">—</td>
                  <td className="text-center">✔</td>
                  <td className="text-center">✔</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">Floor map</td>
                  <td className="text-center">✔</td>
                  <td className="text-center">✔</td>
                  <td className="text-center">✔</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="py-2 px-4">Number of Employees</td>
                  <td className="text-center">Unlimited</td>
                  <td className="text-center">Unlimited</td>
                  <td className="text-center">Unlimited</td>
                </tr>
                {/* Features */}
                <tr>
                  <td className="py-2 px-4 font-semibold" colSpan={4}>
                    Backend Features
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4">Reports&Analytics</td>
                  <td className="text-center">✔</td>
                  <td className="text-center">✔</td>
                  <td className="text-center">✔</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="py-2 px-4">Support</td>
                  <td className="text-center">Basic 24/7</td>
                  <td className="text-center">24/7</td>
                  <td className="text-center">Dedicated 24/7</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">Membership</td>
                  <td className="text-center">✔</td>
                  <td className="text-center">✔</td>
                  <td className="text-center">✔</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="py-2 px-4">Loyalty Program</td>
                  <td className="text-center">—</td>
                  <td className="text-center">✔</td>
                  <td className="text-center">✔</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">Marketing</td>
                  <td className="text-center">—</td>
                  <td className="text-center">✔</td>
                  <td className="text-center">✔</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="py-2 px-4">Multi-store Support</td>
                  <td className="text-center">—</td>
                  <td className="text-center">✔</td>
                  <td className="text-center">✔</td>
                </tr>
                {/* Online Ordering */}
                <tr>
                  <td className="py-2 px-4 font-semibold" colSpan={4}>
                    Online Ordering
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4">Third Party Integration</td>
                  <td className="text-center">✔</td>
                  <td className="text-center">✔</td>
                  <td className="text-center">✔</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="py-2 px-4">Table-side Ordering</td>
                  <td className="text-center">✔</td>
                  <td className="text-center">✔</td>
                  <td className="text-center">✔</td>
                </tr>
                {/* Optional Extensions */}
                <tr>
                  <td className="py-2 px-4 font-semibold" colSpan={4}>
                    Optional Extensions
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4">Smart paperless kitchen</td>
                  <td className="text-center">—</td>
                  <td className="text-center">✔</td>
                  <td className="text-center">✔</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">Kiosk</td>
                  <td className="text-center">—</td>
                  <td className="text-center">—</td>
                  <td className="text-center">✔</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">Hardware</td>
                  <td className="text-center">Included/Optional</td>
                  <td className="text-center">Included/Optional</td>
                  <td className="text-center">Included/Optional</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="py-2 px-4">Integrations</td>
                  <td className="text-center">Optional</td>
                  <td className="text-center">Optional</td>
                  <td className="text-center">Optional</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">Custom App</td>
                  <td className="text-center">Optional</td>
                  <td className="text-center">Optional</td>
                  <td className="text-center">Optional</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Customization Section */}
      <div className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <div className="border-t border-gray-200 dark:border-gray-700 pt-12">
            <motion.h2 {...MOTION_CONFIG} className="text-2xl font-bold mb-4">
              Need a Custom Solution?
            </motion.h2>
            <motion.p
              {...MOTION_CONFIG}
              transition={{ ...MOTION_CONFIG.transition, delay: 0.2 }}
              className="text-lg text-gray-600 dark:text-gray-400 mb-6"
            >
              We offer flexible customization services tailored to your specific
              needs. Whether you need special features or integration with
              existing systems, we provide professional solutions to help your
              business grow.
            </motion.p>
            <motion.button
              {...MOTION_CONFIG}
              transition={{ ...MOTION_CONFIG.transition, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              onClick={handleOpenForm}
              className={BUTTON_STYLES.custom}
            >
              Contact Us for Custom Solutions
            </motion.button>
          </div>
        </div>
      </div>

      {/* Page-level Contact Form Modal */}
      <ContactModal isOpen={isFormOpen} onClose={handleCloseForm} />
    </div>
  );
}
