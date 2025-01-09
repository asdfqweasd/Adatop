import React from "react";
import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Container,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

type ContactFormEmailProps = {
  firstName: string;
  lastName: string;
  company?: string;
  phone?: string;
  email: string;
  message: string;
};

export default function ContactFormEmail({
  firstName,
  lastName,
  company,
  phone,
  email,
  message,
}: ContactFormEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New Contact Form Submission from {firstName} {lastName}</Preview>
      <Tailwind>
        <Body className="bg-gray-100 text-black">
          <Container>
            <Section className="bg-white borderBlack my-10 px-10 py-4 rounded-md">
              <Heading className="leading-tight">
                New Contact Form Submission
              </Heading>
              <Text><strong>From:</strong> {firstName} {lastName}</Text>
              {company && <Text><strong>Company:</strong> {company}</Text>}
              {phone && <Text><strong>Phone:</strong> {phone}</Text>}
              <Text><strong>Email:</strong> {email}</Text>
              <Hr />
              <Text><strong>Message:</strong></Text>
              <Text>{message}</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}