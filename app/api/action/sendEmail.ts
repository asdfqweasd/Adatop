// sendEmail.ts
"use server";

import { getErrorMessage, validateString } from "@/cosmic/utils";
import { Resend } from "resend";
import ContactFormEmail from "@/components/ContactFormEmail";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export const sendEmail = async (formData: FormData) => {
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const company = formData.get("company");
  const phone = formData.get("phone");
  const email = formData.get("email");
  const message = formData.get("message");

  if (!validateString(firstName, 100)) {
    return {
      error: "Invalid first name",
    };
  }
  if (!validateString(lastName, 100)) {
    return {
      error: "Invalid last name",
    };
  }
  if (!validateString(email, 500)) {
    return {
      error: "Invalid email",
    };
  }
  if (!validateString(message, 5000)) {
    return {
      error: "Invalid message",
    };
  }

  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: "support@adatop.com.au",
      subject: `New Contact Form Submission - ${firstName} ${lastName}`,
      replyTo: email as string,
      react: ContactFormEmail({
        firstName: firstName as string,
        lastName: lastName as string,
        company: company as string,
        phone: phone as string,
        email: email as string,
        message: message as string,
      }),
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      error: getErrorMessage(error),
    };
  }
};