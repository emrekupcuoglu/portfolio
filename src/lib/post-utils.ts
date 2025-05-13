import fs from "node:fs";
import matter from "gray-matter";
import path from "node:path";

// ADD these:
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypePrism from "rehype-prism-plus";
import rehypeStringify from "rehype-stringify";

type FrontMatter = {
  slug: string;
  title: string;
  subtitle: string;
  kicker: string;
  titleImage: string;
  titleImageAlt: string;
  date: string;
  tags: string[];
};

export async function getPostData(slug: string) {
  const postsDirectory = path.join(process.cwd(), "src/posts");
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  // Use unified pipeline for Markdown to HTML with syntax highlighting
  // const processedContent = await unified()
  //   .use(remarkParse) // Parse markdown to mdast
  //   .use(remarkRehype, { allowDangerousHtml: true }) // Convert mdast to hast, allowDangerousHtml is good if you ever use raw HTML in markdown
  //   .use(rehypePrism, {
  //     showLineNumbers: true, // Optional: if you want line numbers
  //     // ignoreMissing: true, // Optional: if true, unknown languages will not throw an error
  //   }) // Apply Prism highlighting to code blocks
  //   .use(rehypeStringify) // Convert hast to HTML string
  //   .process(matterResult.content);

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkRehype) // No allowDangerousHtml here for this test
    .use(rehypePrism, { showLineNumbers: true })
    .use(rehypeStringify)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();
  const matterData = matterResult.data as FrontMatter;

  return {
    contentHtml,
    ...matterData,
  };
}

export async function getAllPosts() {
  const postsDirectory = path.join(process.cwd(), "src/posts");
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);
    const matterData = matterResult.data as FrontMatter;

    return {
      id,
      ...matterData,
    };
  });

  const sortedPostsData = allPostsData.sort((a, b) => {
    const date1 = new Date(a.date);
    const date2 = new Date(b.date);

    if (date1 < date2) {
      return 1;
    } else if (date1 > date2) {
      return -1;
    } else {
      return 0;
    }
  });
  return sortedPostsData;
}

export async function getAllPostSlugs() {
  const postsDirectory = path.join(process.cwd(), "src/posts");
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return fileName.replace(/\.md$/, "");
  });
}
