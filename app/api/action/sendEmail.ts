"use server";

import { getErrorMessage, validateString } from "@/cosmic/utils";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export const sendEmail = async (formData: FormData) => {
  const senderEmail = formData.get("senderEmail");
  const message = formData.get("message");

  if (!validateString(senderEmail, 500)) {
    return {
      error: "Invalid sender email",
    };
  }
  if (!validateString(message, 5000)) {
    return {
      error: "Invalid message",
    };
  }

  if (!message || typeof message !== "string") {
    return {
      error: "Invalid message!",
    };
  }

  try {
    resend.emails.send({
      from: "Contact From <onboarding@resend.dev>",
      to: "support@adatop.com.au",
      subject: "Message from contact form",
      replyTo: senderEmail as string,
      text: message as string,
    });
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};

