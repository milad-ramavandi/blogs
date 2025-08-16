"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ChevronRightIcon from "../icons/chevron-right";
import { tabs, tagsList } from "../../constants/defaultData";
import { usePathname, useSearchParams } from "next/navigation";

export default function TabBar() {
  const searchParams = useSearchParams();
  const currentTag = tagsList.find((tag) => tag.id === searchParams.get("tag_id"));
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const pathname = usePathname();
  const activeTab = searchParams.get("category_id") || "all"

  const checkForScrollPosition = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth + 1 < scrollWidth);
  };

  useEffect(() => {
    checkForScrollPosition();
    const handleResize = () => {
      checkForScrollPosition();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  

  const scroll = (offset: number) => {
    scrollRef?.current?.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <>
      <div className="relative w-full lg:w-auto md:my-4 xl:my-0">
        {canScrollLeft && (
          <button
            onClick={() => scroll(-150)}
            className="w-[50px] h-full block absolute left-0 top-0 bg-gradient-to-l from-transparent to-black z-50"
          >
            <ChevronRightIcon
              isChevronRight={false}
              className="text-[rgb(207,255,17)] opacity-50 absolute left-0 -translate-y-1/2"
            />
          </button>
        )}
        <div
          ref={scrollRef}
          onScroll={checkForScrollPosition}
          className="flex items-center justify-start sm:justify-center xl:justify-start gap-2 py-4 scrollbar-hide lg:ml-6 overflow-x-scroll"
        >
          {tabs.map((tab) => {
            return (
              <Link
                key={tab.value}
                href={{
                  pathname,
                  query: tab?.value === "all" ? {} : {category_id:tab?.id}
                }}
                scroll={false}
                className={`px-1.5 py-1 text-[16px] font-bold rounded-full transition-colors duration-300 whitespace-nowrap text-[#ffffffcc] ${
                  ((!currentTag && ((activeTab === tab?.id) ||
                    activeTab === tab.value))) &&
                  "bg-[rgb(207,255,17)] shadow-[0_0_5px_5px_rgba(207,255,17,0.5)] text-black"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
          {currentTag && (
            <Link
              href={`/blog?tag_id=${currentTag.id}`}
              className="px-1.5 py-1 bg-[rgb(207,255,17)] shadow-[0_0_5px_5px_rgba(207,255,17,0.5)] text-black text-[16px] rounded-full font-bold transition-colors duration-300 whitespace-nowrap"
            >
              {currentTag.label}
            </Link>
          )}
        </div>
        {canScrollRight && (
          <button
            onClick={() => scroll(150)}
            className="w-[50px] block h-full absolute right-0 top-0 bg-gradient-to-r from-transparent to-black z-50"
          >
            <ChevronRightIcon isChevronRight className="text-[rgb(207,255,17)] opacity-50 absolute right-0 -translate-y-1/2" />
          </button>
        )}
      </div>
    </>
  );
}
