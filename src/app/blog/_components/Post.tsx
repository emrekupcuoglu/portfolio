import { PostType } from "@/lib/post-utils";
import Image from "next/image";
import Link from "next/link";

function Post({ post }: { post: PostType }) {
  return (
    <li key={post.slug} className="mb-2">
      {/* Make Link a block element so it can dictate width for its children */}
      <Link
        href={`/blog/${post.slug}`}
        className="block text-blue-400 no-underline"
      >
        {/* This outer flex container centers the card horizontally */}
        <div className="flex flex-col items-center justify-center">
          {/* Card container:
              - w-full: Takes full width of its parent (the centering div, up to the Link's width).
              - max-w-xl (or lg, 2xl): Prevents the card (and thus image) from becoming too wide on large screens.
                                        Adjust this value to your design preference.
          */}
          <div className="flex w-full max-w-[50rem] flex-col gap-4 rounded-2xl p-4 transition-colors hover:border-2 hover:border-blue-400">
            {/* Image container:
                - w-full: Makes the image container take the full width of its parent (the card, minus padding).
                - aspect-video: Maintains a 16:9 aspect ratio for the image.
                - relative: Required for Next/Image with fill.
            */}
            <div className="relative aspect-video w-full">
              <Image
                fill // Tells the image to fill its parent container
                src={`/blog/${post.slug}/${post.titleImage}`}
                alt={post.titleImageAlt}
                className="rounded-2xl object-cover" // object-cover ensures the image covers the area without distortion
                // Optional: Add sizes attribute for performance optimization if you know typical viewport widths
                // sizes="(max-width: 640px) 90vw, (max-width: 1024px) 60vw, 50vw"
                // Or more simply if the card's max-width is the main constraint:
                // sizes="(max-width: 768px) 100vw, 672px" // (max-w-xl is 672px)
              />
            </div>

            <div className="flex flex-col">
              <p className="text-2xl font-bold text-white">{post.title}</p>
              <p className="text-slate-300">{post.date}</p>
              {/* Using 100px as a base for tags, adjust if 120px is strictly needed */}
              <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-x-2 gap-y-2 pt-6 md:pt-8">
                {post.tags.map((tag) => (
                  <div
                    key={tag}
                    title={tag}
                    className="min-w-0 overflow-hidden rounded-full border border-slate-300 px-3 py-1 text-center text-sm text-ellipsis whitespace-nowrap text-white"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default Post;
