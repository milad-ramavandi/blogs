import { IBlog, IBlogsListResponse } from "../../types";
import BlogCard from "../blog-card";
import EmptyBox from "../empty-box";
import Pagination from "../pagination";

const BlogsList = ({ blogsList }: { blogsList: IBlogsListResponse }) => {
  if (!blogsList?.posts?.length) return <EmptyBox />;
  return (
    <>
      <div className="grid grid-cols-1 post-item sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {blogsList?.posts?.map((blog: IBlog) => (
          <BlogCard key={blog.title} blog={blog} />
        ))}
      </div>
      {blogsList?.pagination?.total_pages > 1 && (
        <Pagination totalPages={blogsList?.pagination?.total_pages} currentPage={blogsList?.pagination?.current_page} />
      )}
    </>
  );
};

export default BlogsList;
