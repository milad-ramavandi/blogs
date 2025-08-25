import { getBlogsList } from "@/features/blogs/apis/controllers";
import BlogsList from "../blogs-list";
import { tabs, tagsList } from "../../constants/defaultData";

const BlogsListWrapper = async ({
  page,
  search,
  tag,
  category,
}: {
  page?: number;
  search?: string;
  tag?: string;
  category?: string;
}) => {
  const mainCategory = tabs?.filter((item) => item?.value === category)[0];
  const mainTag = tagsList?.filter((item) => item?.label.replace("# ", "") === tag)[0];
  const blogsListResponse = await getBlogsList({
    page: page ?? 1,
    search: search ?? "",
    tag_id: mainTag?.id ?? "",
    category_id: mainCategory?.id ?? "",
  });
  return (
    <BlogsList blogsList={blogsListResponse} />
  );
};

export default BlogsListWrapper;
