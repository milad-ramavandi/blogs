import Slider from "../slider";
import BlogCard from "../blog-card";
import { IBlog } from "../../types";
import { getBlogsList } from "../../apis/controllers";

const popularBlogsPromise = getBlogsList({
  category_id: "5",
  page: 1,
});
const mainBlogsPromise = getBlogsList({
  category_id: "2",
  page: 1,
});

const SiderAndSlider = async () => {
  const [popularBlogs, mainBlogs] = await Promise.all([
    popularBlogsPromise,
    mainBlogsPromise,
  ]);
  return (
    <div className="w-full flex justify-center items-center lg:flex-row flex-col-reverse gap-[31px] px-2">
      <section className="w-full flex flex-col xl:flex-col sm:flex-row lg:flex-wrap items-center justify-center mx-auto lg:max-w-[278px] p-0 gap-[25px]">
        {popularBlogs?.posts?.slice(0, 2)?.map((item: IBlog) => {
          return (
            <div key={item?.id} className="w-full">
              <BlogCard blog={item} />
            </div>
          );
        })}
      </section>
      <section className="w-full xl:w-full flex flex-col items-center justify-start overflow-hidden gap-2 lg:w-[631px] mx-auto lg:h-[599px] md:h-[400px] h-[360px] p-4 bg-white/15 backdrop-blur-0 border border-white/15 rounded-xl">
        <Slider slides={mainBlogs?.posts} />
      </section>
    </div>
  );
};

export default SiderAndSlider;
