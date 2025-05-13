import "prismjs/themes/prism.css"; /* Default theme */
/* If you enabled line numbers with rehype-prism-plus */
// import "prismjs/plugins/line-numbers/prism-line-numbers.css";

import "./post.css";
import { getAllPostSlugs, getPostData } from "@/lib/post-utils";

export async function generateStaticParams() {
  // This function is used to generate static params for the blog post pages
  // It will be called at build time to generate the static pages
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({
    id: slug,
  }));
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const slug = decodeURI(id);

  const post = await getPostData(slug);

  return (
    <div className="min-h-dvh bg-slate-700">
      <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-12">
        <article className="blog-post-content py-24 text-slate-100">
          <h3 className="-mb-2 text-stone-400">{post.kicker}</h3>
          <h1 className="text-base/tight text-slate-50">{post.title}</h1>
          <h2 className="-mt-2 text-slate-400"> {post.subtitle}</h2>
          <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
        </article>
      </div>
    </div>
  );
}

// getSortedPostsData and getAllPostSlugs remain the same
