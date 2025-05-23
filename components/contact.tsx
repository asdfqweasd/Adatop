import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { sendEmail } from "@/app/api/action/sendEmail";
import SubmitBtn from "@/cosmic/elements/submit-btn";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { X } from "lucide-react";

interface ContactProps {
  onClose: () => void;
}

export default function Contact({ onClose }: ContactProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [phone, setPhone] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    const formData = new FormData(event.currentTarget);

    try {
      const result = await sendEmail(formData);

      if (result === undefined) {
        onClose();
      } else {
        setErrorMessage(result.error);
      }
    } catch (error) {
      console.error("Failed to send email:", error);
      setErrorMessage("An unexpected error occurred. Please try again later.");
    }
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all parentheses and any spaces after the country code
    return value
      .replace(/[()]/g, "")
      .replace(/^\+\d+\s/, "+$&")
      .trim();
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  console.log("Contact form rendered, close function available:", !!onClose);

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4 overflow-y-auto mt-16 sm:mt-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg relative w-full max-w-md mx-auto my-4"
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 p-2"
          onClick={() => {
            console.log("Close button clicked");
            onClose();
          }}
          aria-label="Close"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          Contact Me
        </h2>
        <p className="text-gray-700 dark:text-white/80 mb-6">
          Please contact me directly at{" "}
          <a className="underline" href="mailto:pos@adatop.com.au">
            pos@adatop.com.au
          </a>{" "}
          or through this form.
        </p>

        {errorMessage && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {errorMessage}
          </div>
        )}

        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              className="h-14 px-4 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="firstName"
              type="text"
              required
              placeholder="First Name"
            />
            <input
              className="h-14 px-4 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="lastName"
              type="text"
              required
              placeholder="Last Name"
            />
          </div>

          <input
            className="h-14 px-4 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="company"
            type="text"
            placeholder="Company"
          />

          <PhoneInput
            country={"au"}
            value={phone}
            onChange={(value: string) => setPhone(formatPhoneNumber(value))}
            inputProps={{
              name: "phone",
              required: true,
              className:
                "h-14 pl-12 pr-4 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-base",
            }}
            containerClass="relative w-full"
            dropdownClass="bg-white dark:bg-gray-700 text-black dark:text-white max-h-60 overflow-y-auto"
            specialLabel=""
            placeholder="Phone"
            disableCountryCode={false}
            enableAreaCodes={true}
            autoFormat={false}
            buttonClass="absolute left-0 top-0 bottom-0 flex items-center justify-center px-3 z-10"
          />

          <input
            className="h-14 px-4 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="email"
            type="email"
            required
            placeholder="Email"
          />

          <textarea
            className="h-32 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="message"
            placeholder="Your message"
            required
            maxLength={5000}
          />

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-14 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 h-14 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
