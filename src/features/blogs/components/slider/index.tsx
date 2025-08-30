"use client";

import React, { useRef } from "react";
import { IBlog } from "../../types";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import Image from "next/image";
import ArrowRight from "../icons/arrow-right";
import Link from "next/link";
import CalenderIcon from "../icons/calender";
import { RelativeTime } from "../../libs";


const Slider = ({ slides }: { slides: IBlog[] }) => {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  return (
    <div className="relative w-full h-full">
      <div className="absolute bottom-0 right-0 flex gap-2 md:gap-3 z-10">
        <button
          ref={prevRef}
          className="w-[25px] h-[25px] md:w-[30px] md:h-[30px] lg:w-[35px] lg:h-[35px] bg-[rgba(207,255,17,1)] hover:bg-[rgba(207,255,17,0.6)] text-black rounded-full flex items-center justify-center transition"
        >
          <ArrowRight isArrowRight={false} />
        </button>
        <button
          ref={nextRef}
          className="w-[25px] h-[25px] md:w-[30px] md:h-[30px] lg:w-[35px] lg:h-[35px] bg-[rgba(207,255,17,1)] hover:bg-[rgba(207,255,17,0.6)] text-black rounded-full flex items-center justify-center transition"
        >
          <ArrowRight isArrowRight />
        </button>
      </div>
      <Swiper
        modules={[Navigation, Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        speed={1000}
        onInit={(swiper) => {
          // @ts-ignore
          swiper.params.navigation.prevEl = prevRef.current;
          // @ts-ignore
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        slidesPerView={1}
        loop
        // spaceBetween={20}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col gap-2 relative w-full h-full overflow-hidden rounded-xl">
              <Link
                href={`/${slide?.slug}`}
                className="w-full lg:h-[517px] md:h-[300px] h-[270px] rounded-xl"
              >
                <Image
                  src={slide?.first_image as string}
                  alt={slide?.title}
                  width={900}
                  height={500}
                  className="w-full h-full object-cover rounded-xl"
                  priority
                />
              </Link>
              <div className="flex flex-col gap-1 pl-2 items-start justify-start w-full">
                <Link
                  href={`/${slide?.slug}`}
                  className="w-full line-clamp-1 font-medium text-white text-[16px]"
                >
                  {slide.title}
                </Link>
                <div className="flex items-center justify-center gap-1">
                  <div className="flex items-center justify-center gap-1 text-[rgb(207,255,17)]">
                    <CalenderIcon />
                    <span className="font-medium text-[10px] pt-[3px]">
                      {slide?.date}
                    </span>
                  </div>

                  <span className="font-medium text-xs text-[#ffffff96]">
                    ({RelativeTime(slide?.date as string)})
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
