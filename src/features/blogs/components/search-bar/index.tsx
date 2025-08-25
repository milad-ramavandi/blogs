"use client";
import Image from "next/image";
import SearchIcon from "../icons/search";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import useDebounce from "../../hooks/useDebounce";

type Props = {
  searchValue: string;
};

const SearchBar = ({ searchValue }: Props) => {
  const [search, setSearch] = useState<string>(searchValue);
  const { debouncedValue } = useDebounce(search);
  const initialRender = useRef(true);
  const router = useRouter();
  const pathname = usePathname();
  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    const params = new URLSearchParams(window.location.search);
    params.delete("page");
    if (debouncedValue) {
      params.delete("tag");
      params.delete("category");
      params.set("search", debouncedValue);
    } else {
      params.delete("search");
    }
    router.push(`${pathname}?${params.toString()}#tab-search`);

  }, [debouncedValue]);

  return (
    <div className="w-full h-[52px] flex justify-center lg:justify-end xl:w-auto p-[2px] bg-[rgba(94,194,238,0.08)] rounded-full">
      <div
        className="
          xl:transition-all !duration-300 ease-in-out 
          xl:focus-within:w-[400px] 
          xl:w-[291px] 
          w-full
          rounded-full 
          bg-slate-800 
          py-3.5 pl-[19px] pr-1.5
          shadow-md 
          flex items-center
          gap-2
        "
      >
        <div className="flex flex-grow items-center gap-3 overflow-visible">
          <input
            type="text"
            placeholder="Search anything privately..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full bg-transparent outline-none text-white placeholder:text-gray-400 text-sm"
          />
        </div>
        <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[rgb(207,255,17)] p-1">
          <SearchIcon />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
