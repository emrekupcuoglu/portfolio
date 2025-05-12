import { getAllPosts } from "@/lib/post-utils";
import Image from "next/image";
import Link from "next/link";

export default async function BlogsPage() {
  const posts = await getAllPosts();

  return (
    <div className="min-h-dvh bg-slate-700">
      <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-12">
        <h1 className="text-4xl font-bold text-white">Blog</h1>
        <p className="text-lg text-gray-300">
          Welcome to my blog! Here, I share my thoughts, experiences, and
          insights on various topics. Stay tuned for updates!
        </p>
        <ul className="pl-5 text-gray-300">
          {posts.map((post) => {
            return (
              <li key={post.slug} className="mb-2">
                <Link href={`/blog/${post.slug}`} className="text-blue-400">
                  <div className="flex flex-col items-center justify-center">
                    <div className="flex flex-col gap-4 rounded-2xl p-4 transition-all hover:border-2 hover:border-blue-400">
                      <div className="relative aspect-video w-[50rem]">
                        <Image
                          fill
                          src={`/blog/${post.slug}/${post.titleImage}`}
                          alt={post.titleImageAlt}
                          className="rounded-2xl object-cover"
                        />
                      </div>

                      <div className="flex flex-col">
                        <p className="text-2xl font-bold text-white">
                          {post.title}
                        </p>
                        <p className="text-slate-300">{post.date}</p>
                        <div className="flex gap-4 pt-8">
                          {post.tags.map((tag) => {
                            return (
                              <div
                                key={tag}
                                className="rounded-full border border-slate-300 px-3 py-1 text-white"
                              >
                                {tag}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
