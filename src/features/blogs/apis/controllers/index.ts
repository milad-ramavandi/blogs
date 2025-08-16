import api from "..";
import { IBlogParams, IBlogsParams } from "../../types";
import endpoints from "../config/endpoints";

export const getBlogsList = async (params?: IBlogsParams) => {
  try {
    const queryParams = new URLSearchParams();

    if (params?.tag_id) queryParams.append("tag_id", params.tag_id.toString());
    if (params?.category_id) queryParams.append("category_id", params.category_id.toString());
    if (params?.page) queryParams.append("paged", params.page.toString());
    if (params?.search) queryParams.append("search", params.search);

    const queryString = queryParams.toString();
    const url = `${process.env.NEXT_BLOG_API_URL}${endpoints.blogs.blogsList}${queryString ? `?${queryString}` : ""}`;
    const res = await api(url);
    if (!res?.ok) {
      throw new Error("Failed to fetch blogs!");
    }
    return await res.json();
  } catch (error) {
    console.log(error);
    throw new Error("Sorry, something went wrong.")
  }
};

export const getBlog = async (params?: IBlogParams) => {
  try {
    const res = await api(
      `${process.env.NEXT_BLOG_API_URL}${endpoints.blogs.singleBlog}${params?.slug ? `?slug=${params?.slug}` : ""}`
    );
    if (!res?.ok) {
      throw new Error("Failed to fetch blog!");
    }
    return await res.json();
  } catch (error) {
    throw new Error("Sorry, something went wrong.")
  }
};

export const getCategoriesList = async () => {
  try {
    const res = await api(`${process.env.NEXT_BLOG_API_URL}${endpoints.blogs.catogoriesList}`);
    if (!res?.ok) {
      throw new Error("Failed to fetch categories!");
    }
    return await res.json();
  } catch (error) {
    throw new Error("Sorry, something went wrong.")
  }
};
