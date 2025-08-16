import BlogsContent from "@/features/blogs/sections/blogs-content";
import { Metadata } from "next";
import Script from "next/script";

export const metadata:Metadata = {
  title: "Blog | Lands Domains",
  description:
    "Read the latest articles, tutorials, and updates on web3, crypto, and decentralized technologies from the lands domains blog.",
  openGraph: {
    title: "Blog | Lands Domains",
    description:
      "Stay up to date with insightful articles and expert content on crypto and web3 technology – all from the official lands domains blog.",
    url: "https://lands.domains/blogs",
    type: "website",
    images: [
      {
        url: "https://lands.domains/assets/og/lands.domains.png",
        width: 600,
        height: 315,
        alt: "Lands Domains Blog",
        type: "image/png",
      },
    ],
    siteName: "Lands Domains Blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Lands Domains",
    description:
      "Explore crypto insights and web3 tutorials with the official Lands Domains blog. Stay informed and ahead of the curve!",
    site: "@LandsDomains",
    images: ["https://lands.domains/assets/og/lands.domains.png"],
  },

  alternates: {
    canonical: "https://lands.domains/blogs/",
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
          url: "https://lands.domains/blogs",
          name: "Lands Domains Blog",
          description:
            "Articles and tutorials on web3 and crypto",
          publisher: {
            "@type": "Organization",
            name: "Lands Domains",
            logo: {
              "@type": "ImageObject",
              url: "https://lands.domains/assets/og/lands.domains.png",
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
