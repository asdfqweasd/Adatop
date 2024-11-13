import { cosmic } from "@/cosmic/client";
import { Testimonial, TestimonialType } from "./Testimonial";
import { unstable_cache } from 'next/cache';

// 创建一个缓存的获取函数
const getTestimonials = unstable_cache(
  async (
    query: any,
    sort?: string,
    limit?: number,
    skip?: number,
    status?: "draft" | "published" | "any"
  ) => {
    const { objects: testimonials } = await cosmic.objects
      .find(query)
      .props("id,slug,title,metadata")
      .depth(1)
      .sort(sort ? sort : "-order")
      .limit(limit ? limit : 100)
      .skip(skip ? skip : 0)
      .status(status ? status : "published");
    
    return testimonials;
  },
  ['testimonials-cache'],
  {
    revalidate: 1800, // 1小时后重新验证
    tags: ['testimonials']
  }
);

export async function Testimonials({
  query,
  sort,
  limit,
  skip,
  className,
  status,
}: {
  query: any;
  sort?: string;
  limit?: number;
  skip?: number;
  className?: string;
  status?: "draft" | "published" | "any";
}) {
  const testimonials = await getTestimonials(query, sort, limit, skip, status);

  return (
    <div className={className}>
      {testimonials?.map((testimonial: TestimonialType) => {
        return <Testimonial testimonial={testimonial} key={testimonial.slug} />;
      })}
    </div>
  );
}