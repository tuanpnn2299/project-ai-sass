import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface ToolItemProps {
  title: string;
  url: string;
  icon: string;
  color?: string;
  slug: "code" | "audio" | "video" | "photo" | "conversation";
}

const toolItemColorVariants = cva("absolute inset-0 opacity-20 rounded-xl", {
  variants: {
    color: {
      code: "bg-yellow-500",
      audio: "bg-red-500",
      video: "bg-pink-500",
      photo: "bg-purple-500",
      conversation: "bg-blue-500",
    },
  },
  defaultVariants: {
    color: "code",
  },
});

const ToolItem: React.FC<ToolItemProps> = ({
  title,
  url,
  icon,
  color,
  slug,
}) => {
  return (
    <div
      className={cn(
        "group flex items-center mb-5 p-3.5 border rounded-xl transition-all",
        "hover:border-transparent hover:shadow-[0_0_1rem_0.25rem_rgba(0,0,0,0.04),0px_2rem_1.5rem_-1rem_rgba(0,0,0,0.12)]",
        "last:mb-0",
        "lg:p-3.55",
        "2xl:p-2.55"
      )}>
      <Link href={url} className="w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-6 rounded-lg p-1 w-16 h-16 relative flex justify-center">
              <div className={cn(toolItemColorVariants({ color: slug }))} />
              <Image src={icon} alt={title} width={24} height={24} />
            </div>
            <span className="font-medium">{title}</span>
          </div>
          <ArrowRight />
        </div>
      </Link>
    </div>
  );
};

export default ToolItem;
