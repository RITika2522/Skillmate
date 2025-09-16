"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// ✅ Import images from assets
import banner1 from "@/assets/images/image1.png";
import banner2 from "@/assets/images/image2.png";
import banner3 from "@/assets/images/image3.png";

export default function Banner() {
  return (
    <section className="w-full h-[500px] mt-16">
      <Carousel
        className="w-full h-full"
        opts={{ loop: true }}
        plugins={[Autoplay({ delay: 3000 })]} // auto-slide every 3s
      >
        <CarouselContent>
          {/* Slide 1 */}
          <CarouselItem>
            <div className="w-full h-[500px]">
              <img
                src={banner1}
                alt="Banner 1"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </CarouselItem>

          {/* Slide 2 */}
          <CarouselItem>
            <div className="w-full h-[500px]">
              <img
                src={banner2}
                alt="Banner 2"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </CarouselItem>

          {/* Slide 3 */}
          <CarouselItem>
            <div className="w-full h-[500px]">
              <img
                src={banner3}
                alt="Banner 3"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </CarouselItem>
        </CarouselContent>

        {/* Controls */}
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
