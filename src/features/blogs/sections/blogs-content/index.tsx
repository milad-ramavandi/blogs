import TabBar from "../../components/tab-bar";
import SearchBar from "../../components/search-bar";
import { Suspense } from "react";
import BlogsListWrapper from "../../components/blog-list-wrapper";
import Skeleton from "../../components/skeleton";
import SiderAndSlider from "../../components/sider-and-slider";

const BlogsContent = ({
  page,
  tag,
  search,
  category,
}: {
  page: number;
  tag: string;
  search: string;
  category: string;
}) => {
  return (
    <div className="md:container xl:max-w-[1300px] 3xl:max-w-[1300px] flex flex-col items-center px-2 md:px-10 2xl:p-0 gap-12 min-h-screen mx-auto text-white my-4">
      <section className="max-w-full mt-7 mb-0 md:mb-10 z-30 sm:max-w-[612px] lg:max-w-[717px]">
        <h1 className="text-3xl md:text-5xl lg:text-7xl text-center">
          <span className="text-[rgb(207,255,17)]">Blog</span>
          : Your gateway {" "}
          to{" "} <br/>
          <span className="text-[rgb(207,255,17)]">Web3 & Crypto</span>{" "}
        </h1>
      </section>
      <SiderAndSlider />
    
      <section id="tab-search" className="w-full xl:h-[72px] flex flex-col xl:flex-row md:gap-0 gap-5 justify-start lg:items-center md:justify-center xl:justify-between xl:bg-white/15 xl:backdrop-blur-0 p-2.5 xl:rounded-full xl:border xl:border-white/15">
        <TabBar />
        <SearchBar searchValue={search} />
      </section>

      <section className="w-full mx-auto px-2 lg:px-0">
        <Suspense
          key={`${page}-${search}-${tag}-${category}`}
          fallback={<Skeleton />}
        >
          <BlogsListWrapper
            page={page}
            search={search}
            tag={tag}
            category={category}
          />
        </Suspense>
      </section>
    </div>
  );
};

export default BlogsContent;
