import BlogsContent from "@/features/blogs/sections/blogs-content";
import { Metadata } from "next";
import Script from "next/script";

export const metadata:Metadata = {
  title: "Blog | blogs-dusky-nu.vercel.app",
  description:
    "Read the latest articles, tutorials, and updates on web3, crypto, and decentralized technologies from the blogs-dusky-nu.vercel.app blog.",
  openGraph: {
    title: "Blog | blogs-dusky-nu.vercel.app",
    description:
      "Stay up to date with insightful articles and expert content on crypto and web3 technology – all from the official blogs-dusky-nu.vercel.app blog.",
    url: "https://blogs-dusky-nu.vercel.app/",
    type: "website",
    images: [
      {
        url: "https://blogs-dusky-nu.vercel.app/web3-crypto.jpg",
        width: 2400,
        height: 1600,
        alt: "Web3-Crypto Blog",
        type: "image/png",
      },
    ],
    siteName: "blogs-dusky-nu.vercel.app Blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | blogs-dusky-nu.vercel.app",
    description:
      "Explore crypto insights and web3 tutorials with the official blogs-dusky-nu.vercel.app blog. Stay informed and ahead of the curve!",
    site: "@blogs-dusky-nu.vercel.app",
    images: ["https://blogs-dusky-nu.vercel.app/web3-crypto.jpg"],
  },

  alternates: {
    canonical: "https://blogs-dusky-nu.vercel.app",
  },
};

const BlogsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    page: string;
    tag: string;
    search: string;
    category: string;
  }>;
}) => {
  const { page, tag, search, category } = await searchParams;
  return (
    <main>
      <Script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          url: "https://blogs-dusky-nu.vercel.app",
          name: "blogs-dusky-nu.vercel.app Blog",
          description:
            "Articles and tutorials on web3 and crypto",
          publisher: {
            "@type": "Organization",
            name: "https://blogs-dusky-nu.vercel.app",
            logo: {
              "@type": "ImageObject",
              url: "https://blogs-dusky-nu.vercel.app/web3-crypto.jpg",
            },
          },
        })}
      </Script>
      <BlogsContent
        page={Number(page) || 1}
        tag={tag}
        search={search ?? ""}
        category={category ?? ""}
      />
    </main>
  );
};

export default BlogsPage;
