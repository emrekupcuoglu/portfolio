import { getAllPosts } from "@/lib/post-utils";
import Image from "next/image";
import Link from "next/link";
import Post from "./_components/Post";

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
        <ul className="flex flex-col gap-8 text-gray-300">
          {posts.map((post) => {
            return <Post key={post.slug} post={post} />;
          })}
        </ul>
      </div>
    </div>
  );
}
