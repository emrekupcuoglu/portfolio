import { getAllPosts } from "@/lib/post-utils";
import Link from "next/link";

export default async function BlogsPage() {
  const posts = await getAllPosts();
  console.log("---BEGIN POSTS---");
  console.log(posts);
  console.log("---END POSTS---");
  return (
    <div className="min-h-dvh bg-slate-700">
      <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-12">
        <h1 className="text-4xl font-bold text-white">Blog</h1>
        <p className="text-lg text-gray-300">
          Welcome to my blog! Here, I share my thoughts, experiences, and
          insights on various topics. Stay tuned for updates!
        </p>
        <ul className="list-disc pl-5 text-gray-300">
          {posts.map((post) => (
            <li key={post.slug} className="mb-2">
              <Link href={`/blog/${post.slug}`} className="text-blue-400">
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
