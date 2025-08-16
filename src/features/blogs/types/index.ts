export interface ICategory {
  id?:number;
  count?:number;
  name?:string;
  link?:string;
  slug?:string
}

export interface IBlogTab {
  id?:string;
  label: string;
  value: string;
}

export interface IBlogTag {
  id: string;
  label: string;
}

interface IBlogAcf {
  videourl:string
}

export interface IBlog {
  id?:number;
  title: string;
  excerpt?:string
  slug?: string;
  first_image?: string;
  categories?: string[];
  category?:string;
  date?: string;
  acf?: IBlogAcf
}

export interface IBlogsParams {
  page?:number;
  tag_id?:string;
  search?:string;
  category_id?:string;
}
export interface IBlogParams {
  slug?:string
}

interface IBlogPagination {
  total_posts:number;
  posts_per_page:number;
  current_page:number;
  total_pages:number
}

export interface IBlogsListResponse {
  posts:IBlog[];
  pagination:IBlogPagination
}
