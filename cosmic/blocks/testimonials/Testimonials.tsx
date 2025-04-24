import { cosmic } from "@/cosmic/client";
import { TestimonialClientComponent } from "./TestimonialClientComponent";

interface TestimonialsProps {
  query: any;
  status?: "draft" | "published" | "any";
}

export async function Testimonials({ query, status }: TestimonialsProps) {
  const { objects: testimonials } = await cosmic.objects
    .find(query)
    .props("id,slug,title,metadata")
    .depth(1)
    .status(status ? status : "published");

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return <TestimonialClientComponent testimonials={testimonials} />;
}
