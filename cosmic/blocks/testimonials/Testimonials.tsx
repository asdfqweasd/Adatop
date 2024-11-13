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
    // 添加调试日志，查看函数是否被调用
    console.log("getTestimonials called with params:", { query, sort, limit, skip, status });

    const { objects: testimonials } = await cosmic.objects
      .find(query)
      .props("id,slug,title,metadata")
      .depth(1)
      .sort(sort ? sort : "-order")
      .limit(limit ? limit : 100)
      .skip(skip ? skip : 0)
      .status(status ? status : "published");

    // 添加调试日志，查看返回的数据
    console.log("Testimonial data fetched:", testimonials);

    return testimonials;
  },
  ['testimonials-cache'],
  {
    revalidate: 1800, 
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
  console.log("Testimonials component called with:", { query, sort, limit, skip, className, status });

  const testimonials = await getTestimonials(query, sort, limit, skip, status);

  // 在组件内添加调试日志，查看 `testimonials` 数据
  console.log("Testimonials fetched:", testimonials);

  return (
    <div className={className}>
      {testimonials?.map((testimonial: TestimonialType) => {
        return <Testimonial testimonial={testimonial} key={testimonial.slug} />;
      })}
    </div>
  );
}
