import BlogsContent from "@/features/blogs/sections/blogs-content";
import { Metadata } from "next";
import Script from "next/script";

export const metadata:Metadata = {
  title: "Blog | Web3-Crypto",
  description:
    "Read the latest articles, tutorials, and updates on web3, crypto, and decentralized technologies from the web3-crypto blog.",
  openGraph: {
    title: "Blog | Web3-Crypto",
    description:
      "Stay up to date with insightful articles and expert content on crypto and web3 technology – all from the official web3-crypto blog.",
    url: "https://web3-crypto",
    type: "website",
    images: [
      {
        url: "https://web3-crypto/assets/og/web3-crypto.png",
        width: 600,
        height: 315,
        alt: "Web3-Crypto Blog",
        type: "image/png",
      },
    ],
    siteName: "Web3-Crypto Blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Web3-Crypto",
    description:
      "Explore crypto insights and web3 tutorials with the official Web3-Crypto blog. Stay informed and ahead of the curve!",
    site: "@Web3-Crypto",
    images: ["https://web3-crypto/assets/og/web3-crypto.png"],
  },

  alternates: {
    canonical: "https://web3-crypto",
  },
};

const BlogsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    paged: string;
    tag_id: string;
    search: string;
    category_id: string;
  }>;
}) => {
  const { paged, tag_id, search, category_id } = await searchParams;
  const page = Number(paged) || 1;
  return (
    <main>
      <Script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          url: "https://web3-crupto",
          name: "Web3-Crypto Blog",
          description:
            "Articles and tutorials on web3 and crypto",
          publisher: {
            "@type": "Organization",
            name: "Web3-Crypto",
            logo: {
              "@type": "ImageObject",
              url: "https://web3-crypto/assets/og/web3-crypto.png",
            },
          },
        })}
      </Script>
      <BlogsContent
        page={page ? page : 1}
        tag_id={tag_id}
        search={search ?? ""}
        category_id={category_id ?? ""}
      />
    </main>
  );
};

export default BlogsPage;
