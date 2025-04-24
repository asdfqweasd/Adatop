"use client";

import React from "react";
import { Testimonial, TestimonialType } from "./Testimonial";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// 导入Swiper样式
import "swiper/css";
import "swiper/css/pagination";

interface TestimonialCarouselProps {
  testimonials: TestimonialType[];
}

export function TestimonialCarousel({
  testimonials,
}: TestimonialCarouselProps) {
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={false}
        modules={[Autoplay, Pagination]}
        className="testimonial-swiper"
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.slug}>
            <div className="p-2 md:p-4">
              <Testimonial testimonial={testimonial} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
