import {
  getBlog,
  getBlogsList,
  getCategoriesList,
} from "@/features/blogs/apis/controllers";
import BlogItemContent from "@/features/blogs/sections/blog-item-content";
import parseHtmlContent from "@/features/blogs/utils/parse-html-content";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";

interface IBlogPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: IBlogPageProps): Promise<Metadata> {
  const { slug } = await params;

  const blog = await getBlog({ slug });
  if (!blog) {
    return notFound();
  }
  const parsedImages = parseHtmlContent(blog?.[0]?.content?.rendered);
  const parsedTexts = parseHtmlContent(blog?.[0]?.excerpt?.rendered).text;

  return {
    title: blog?.[0]?.title?.rendered + "Blog Post | Lands Domains",
    description:
      parsedTexts +
      `Read ${blog?.[0]?.title?.rendered} on the Lands Domains blog. Stay updated with the latest trends and strategies.`,
    keywords:
      blog?.[0]?.tags?.join(", ") + "blog, lands domains, articles, insights",
    icons: [
      { rel: "icon", url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { rel: "apple-touch-icon", url: "/apple-touch-icon.png" },
      { rel: "shortcut icon", url: "/favicon.ico" },
    ],
    openGraph: {
      title: blog?.[0]?.title?.rendered,
      description:
        parsedTexts +
        "Discover detailed posts and updates from the Lands Domains team on various topics.",
      url: `https://lands.domains/blogs/${slug}`,
      siteName: "Lands Domains",
      images:
        parsedImages.images.length > 0
          ? [
              {
                url: parsedImages.images[0],
                alt: blog?.[0]?.title.rendered + "Lands Domains Blog Image",
              },
            ]
          : [
              {
                url: "https://lands.domains/assets/og/lands.domains.png",
                alt: "Lands Domains Blog",
              },
            ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: blog?.[0]?.title?.rendered,
      description:
        parsedTexts +
        "Explore detailed articles and updates from the Lands Domains team.",
      images:
        parsedImages.images.length > 0
          ? parsedImages.images[0]
          : ["https://lands.domains/assets/og/lands.domains.png"],
      site: "@LandsDomainssearch",
    },
    alternates: {
      canonical: `https://lands.domains/blogs/${slug}`,
    },
  };
}

const BlogItemPage = async ({ params }: IBlogPageProps) => {
  const { slug } = await params;
  const blog = await getBlog({ slug });
  const categoriesList = await getCategoriesList();
  const popularBlogs = await getBlogsList({ category_id: "5", page: 1 });
  return (
    <main>
      <Script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: blog?.[0]?.title?.rendered,
          image: parseHtmlContent(blog?.[0]?.content?.rendered).images[0],
          editor: "Lands Domains",
          publisher: {
            "@type": "Organization",
            name: "Lands Domains",
            logo: {
              "@type": "ImageObject",
              url: "https://lands.domains/assets/og/lands.domains.png",
            },
          },
          url: `https://lands.domains/blogs/${slug}`,
          datePublished: blog?.[0]?.date,
          dateModified: blog?.[0]?.modified,
          description:
            parseHtmlContent(blog?.[0]?.excerpt?.rendered).text +
            `Read ${blog?.[0]?.title?.rendered} on the Lands Domains blog. Stay updated with the latest trends and strategies.`,
          author: {
            "@type": "Organization",
            name: blog?.[0]?.uagb_author_info?.display_name,
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://lands.domains/blogs/${slug}`,
          },
        })}
      </Script>

      <BlogItemContent
        date={blog?.[0]?.date}
        htmlContent={blog?.[0]?.content?.rendered}
        title={blog?.[0]?.title?.rendered}
        categoriesList={categoriesList}
        tags={blog?.[0]?.tags}
        popularBlogs={popularBlogs}
      />
    </main>
  );
};

export default BlogItemPage;
