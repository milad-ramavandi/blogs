import Image from "next/image";
import Link from "next/link";
import CalenderIcon from "../icons/calender";
import { IBlog } from "../../types";
import PlayCircle from "../icons/play-circle";
import BlogModalWrapper from "../blog-modal-wrapper";
import getVideoIdOrThumbnailUrl from "../../utils/get-video-id-or-thumbnail-url";
import { GlowingEffect } from "../glowing-effect";
import { RelativeTime } from "../../libs";

type Props = {
  blog: IBlog;
};

const BlogCard = ({ blog }: Props) => {
  const videoThumbnailUrl =
    (!blog?.first_image && blog?.acf?.videourl) ||
    (blog?.first_image && blog?.acf?.videourl)
      ? getVideoIdOrThumbnailUrl(blog?.acf?.videourl, false)
      : "";

  const youtubeId = blog?.acf?.videourl
    ? getVideoIdOrThumbnailUrl(blog?.acf?.videourl, true)
    : "";

  return (
    <article className="relative h-full p-2.5 rounded-xl bg-white/15 backdrop-blur-0 border border-white/15">
      <GlowingEffect
        spread={50}
        borderWidth={2}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
      />
      <div className="space-y-3 relative">
        {blog?.first_image && !blog?.acf?.videourl ? (
          <Link
            href={`/${blog.slug}`}
            className="w-full h-[200px] sm:h-[150px] overflow-hidden block rounded-xl relative"
          >
            <Image
              fill
              src={blog?.first_image}
              alt={blog?.title}
              className="hover:scale-110 transition duration-300 bg-gray-600 object-cover"
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            />
          </Link>
        ) : (
          videoThumbnailUrl && (
            <div className="h-[200px] sm:h-[150px] overflow-hidden rounded-xl relative group">
              <div className={"absolute top-1 left-1 z-10"}>
                <PlayCircle />
              </div>
              <Image
                fill
                unoptimized
                src={videoThumbnailUrl}
                alt={blog.title}
                className="w-full !h-full group-hover:scale-110 transition duration-300 bg-gray-600 object-cover"
              />
              {blog?.acf?.videourl && (
                <BlogModalWrapper youtubeId={youtubeId as string} />
              )}
            </div>
          )
        )}

        <div className={"space-y-3"}>
          <div className="flex items-center justify-between text-xs text-[#FFFFFF96]">
            <p title={blog?.categories?.[0]}>
              {blog?.categories?.[0] ? blog?.categories?.[0] : blog?.category}
            </p>
            <p>{RelativeTime(blog?.date as string)}</p>
          </div>

          {blog?.first_image && !blog?.acf?.videourl ? (
            <Link
              href={`/${blog.slug}`}
              className="w-full text-white line-clamp-2 font-medium text-[16px] h-[45px]"
            >
              {blog?.title}
            </Link>
          ) : (
            <p className="w-full text-white line-clamp-2 font-medium text-[16px] h-[45px]">
              {blog?.title}
            </p>
          )}

          <div className="flex items-center space-x-1 text-[rgb(207,255,17)]">
            <CalenderIcon />
            <p className="text-[10px] font-medium pt-[3px]">{blog?.date}</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
