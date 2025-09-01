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

  // const parsedImages = parseHtmlContent(blog?.[0]?.content?.rendered);
  const parsedTexts = parseHtmlContent(blog?.[0]?.excerpt?.rendered).text;

  return {
    title: blog?.[0]?.title?.rendered + "Blog Post | blogs-dusky-nu.vercel.app",
    description:
      parsedTexts +
      `Read ${blog?.[0]?.title?.rendered} on the  blogs-dusky-nu.vercel.app blog. Stay updated with the latest trends and strategies.`,
    keywords:
      blog?.[0]?.tags?.join(", ") + "blog, web3-crypto, articles, insights",
    icons: [
      { rel: "icon", url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { rel: "apple-touch-icon", url: "/apple-touch-icon.png" },
      { rel: "shortcut icon", url: "/favicon.ico" },
    ],
    openGraph: {
      title: blog?.[0]?.title?.rendered,
      description:
        parsedTexts +
        "Discover detailed posts and updates from the  blogs-dusky-nu.vercel.app team on various topics.",
      url: `https://blogs-dusky-nu.vercel.app/${slug}`,
      siteName: "blogs-dusky-nu.vercel.app",
      images:
        // parsedImages.images.length > 0
        //   ? [
        //       {
        //         url: parsedImages.images[0],
        //         alt: blog?.[0]?.title.rendered + "Web3-Crypto Blog Image",
        //       },
        //     ]
        //   :
        [
          {
            url: "https://blogs-dusky-nu.vercel.app/web3-crypto.jpg",
            width: 2400,
            height: 1600,
            alt: "Web3-Crypto Blog",
            type: "image/png",
           },
        ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: blog?.[0]?.title?.rendered,
      description:
        parsedTexts +
        "Explore detailed articles and updates from the blogs-dusky-nu.vercel.app team.",
      images:
        // parsedImages.images.length > 0
        //   ? parsedImages.images[0]

        //   :
        ["https://blogs-dusky-nu.vercel.app/web3-crypto.jpg"],
      site: "@Web3-Cryptosearch",
    },
    alternates: {
      canonical: `https://blogs-dusky-nu.vercel.app/${slug}`,
    },
  };
}

const BlogItemPage = async ({ params }: IBlogPageProps) => {
  const { slug } = await params;
  const blog = await getBlog({ slug });
  if (!blog || !blog[0]?.content?.rendered) {
    return notFound();
  }
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
          editor: "blogs-dusky-nu.vercel.app",
          publisher: {
            "@type": "Organization",
            name: "Web3-Crypto",
            logo: {
              "@type": "ImageObject",
              url: "https://blogs-dusky-nu.vercel.app/web3-crypto.jpg",
            },
          },
          url: `https://blogs-dusky-nu.vercel.app/${slug}`,
          datePublished: blog?.[0]?.date,
          dateModified: blog?.[0]?.modified,
          description:
            parseHtmlContent(blog?.[0]?.excerpt?.rendered).text +
            `Read ${blog?.[0]?.title?.rendered} on the blogs-dusky-nu.vercel.app blog. Stay updated with the latest trends and strategies.`,
          author: {
            "@type": "Organization",
            name: blog?.[0]?.uagb_author_info?.display_name,
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://blogs-dusky-nu.vercel.app/${slug}`,
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
