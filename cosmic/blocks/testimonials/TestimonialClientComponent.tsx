"use client";

import React from "react";
import { TestimonialType } from "./Testimonial";
import { TestimonialCarousel } from "./TestimonialCarousel";

interface TestimonialClientComponentProps {
  testimonials: TestimonialType[];
}

export function TestimonialClientComponent({
  testimonials,
}: TestimonialClientComponentProps) {
  return <TestimonialCarousel testimonials={testimonials} />;
}
