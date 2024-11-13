import { cosmic } from "@/cosmic/client";
import { HardwareCard,HardwareType } from "./HardwareCard";
export const revalidate = 0; 
export async function HardwareList({
  query,
  className,
  status,
}: {
  query: any;
  className?: string;
  status?: "draft" | "published" | "any";
}) {
  const { objects: Hardwares } = await cosmic.objects
    .find(query)
    .props("id,slug,title,metadata")
    .depth(1)
    .status(status ? status : "published");

  return (
    <div className={className}>
      {Hardwares.map((Hardware: HardwareType) => {
        return <HardwareCard key={Hardware.id} Hardware={Hardware} />;
      })}
    </div>
  );
}
