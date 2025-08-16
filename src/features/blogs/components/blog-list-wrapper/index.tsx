import { getBlogsList } from "@/features/blogs/apis/controllers";
import BlogsList from "../blogs-list";

const BlogsListWrapper = async ({
  page,
  search,
  tag_id,
  categoryId,
}: {
  page?: number;
  search?: string;
  tag_id?: string;
  categoryId?: string;
}) => {
  const blogsListResponse = await getBlogsList({
    page: page ?? 1,
    search: search ?? "",
    tag_id: tag_id ?? "",
    category_id: categoryId ?? "",
  });
  return (
    <BlogsList blogsList={blogsListResponse} />
  );
};

export default BlogsListWrapper;
