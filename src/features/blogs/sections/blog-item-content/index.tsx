import TagIcon from "@/features/blogs/components/icons/tag";
import Link from "next/link";
import { IBlogsListResponse, ICategory } from "../../types";
import CategoriesList from "../../components/categories-list";
import BlogCard from "../../components/blog-card";
import BlogShare from "../../components/blog-share";
import { tagsList } from "../../constants/defaultData";
import { BackgroundBeams } from "../../components/background-beams";
import { RelativeTime } from "../../libs";

const BlogItemContent = ({
  date,
  htmlContent,
  title,
  categoriesList,
  tags,
  popularBlogs,
}: {
  date: string;
  htmlContent: string;
  title: string;
  categoriesList: ICategory[];
  tags: number[];
  popularBlogs: IBlogsListResponse;
}) => {
  
  return (
    <>
      <div className="min-h-screen md:container xl:max-w-[1300px] mx-auto flex flex-col space-y-10 sm:grid sm:grid-cols-12 gap-6 sm:space-y-0 text-white p-6 relative">
        <BackgroundBeams />
        <div className="col-span-12 xl:col-span-3 order-2 xl:w-[300px] xl:order-1">
          <div className="flex items-center gap-3 mb-4">
            <hr className="w-4 border-[1px] border-[rgb(207,255,17)]" />
            <p>Popular</p>
            <hr className="border-[1px] border-white/15 flex-grow" />
          </div>
          <div className="mb-4">
            <BlogCard blog={popularBlogs?.posts?.[0]} />
          </div>
          <CategoriesList categoriesList={categoriesList} />
          <div className="flex items-center gap-3 my-4">
            <hr className="w-4 border-[1px] border-[rgb(207,255,17)]" />
            <p>Popular</p>
            <hr className="border-[1px] border-white/15 flex-grow" />
          </div>

          <div className="space-y-4">
            {popularBlogs?.posts?.slice(1)?.map((item) => {
              return <BlogCard blog={item} key={item?.id} />;
            })}
          </div>
        </div>
        <div className="col-span-12 xl:col-span-9 space-y-5 order-1 xl:order-2 xl:ml-10">
          <div className="bg-white/15 backdrop-blur-0 border border-white/15 px-6 py-3 rounded-xl">
            <div className="flex flex-col">
              <span className="text-xs text-[#FFFFFF96]">
                {RelativeTime(date)}
              </span>
              <h1 className="text-[24px] text-white mt-3 font-bold">{title}</h1>
              <article
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            </div>
          </div>
          <div className="lg:h-24 bg-white/15 backdrop-blur-0 border border-white/15 px-6 py-3 rounded-xl flex flex-col gap-6 lg:gap-0 space-y-4 justify-start lg:flex-row lg:justify-between">
            <div className="flex flex-wrap items-center gap-5">
              <div className="flex items-center gap-1">
                <TagIcon />
                <span>Tags:</span>
              </div>
              <div className="flex items-center flex-wrap gap-3">
                {tags?.map((tag, index) => {
                  const mainTag = tagsList?.find(
                    (item) => item?.id === tag.toString()
                  );
                  return (
                    <Link
                      key={index}
                      href={{
                        pathname:"/",
                        query: {tag:mainTag?.label?.replace("# ", "")}
                      }}
                      scroll={false}
                      className={`px-3 py-1.5 sm:px-5 sm:py-2.5 bg-white/15 backdrop-blur-0 hover:bg-[rgb(207,255,17)] hover:text-black transition duration-300 text-[16px] md:text-[14px] rounded-sm whitespace-nowrap`}
                    >
                      {mainTag?.label}
                    </Link>
                  );
                })}
              </div>
            </div>
            <BlogShare/>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogItemContent;
