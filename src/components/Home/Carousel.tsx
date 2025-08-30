/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";

const reviews = [
    {
      img: "/images/a1.jpg",
    },
    {
      img: "/images/a2.jpg",
    },
    {
      img: "/images/a3.jpg",
    },
    {
      img: "/images/a4.jpg",
    },
    {
      img: "/images/a5.jpg",
    },
    {
      img: "/images/a6.jpg",
    }
];

import { Card } from "@/components/ui/card"


interface VerticalCardProps {
  img: string
}

export function VerticalCard({ img}: VerticalCardProps) {
  return (
    <Card
      className={cn(
        "relative w-full overflow-hidden rounded-xl",
        "h-[23rem]",
        "cursor-pointer border border-gray-950/[0.1] dark:border-gray-50/[0.1]"
      )}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${img})` }}
      />
    </Card>
  )
}

export function MarqueeDemoVertical() {
  return (
    <div className="relative flex h-full w-full flex-row items-center justify-center overflow-hidden">
     
      <Marquee reverse pauseOnHover vertical className="[--duration:20s] w-full">
        {reviews.map((review) => (
          <VerticalCard key={review.img} {...review} />
        ))}
      </Marquee>
     
    </div>
  );
}
