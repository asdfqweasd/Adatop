import { Metadata } from "next";
import { cosmic } from "@/cosmic/client";
import PricingClient from "./PricingClient";

export const metadata: Metadata = {
  title: "Pricing | Adatop",
  description: "View our product and service pricing plans",
};

export default async function PricingPage() {
  const { objects: machines } = await cosmic.objects
    .find({
      type: "machines",
    })
    .props("slug,title,metadata")
    .depth(1);

  if (!machines) return <div>Something went wrong</div>;

  return <PricingClient machines={machines} />;
}
