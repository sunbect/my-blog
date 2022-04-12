import fs from "fs";
import path from "path";
import Link from "next/link";
import matter from "gray-matter";
import { sortByDate } from "../utils";

export default function Blog({ posts }) {
  return (
    <div className="posts">
      {posts.map((post, index) => (
        <h3>
          <Link href={`blog/${post.slug}`}>{post.frontmatter.title}</Link>
        </h3>
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join("posts"));

  const posts = files.map((filename) => {
    const slug = filename.replace(".md", "");
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );

    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      slug,
      frontmatter,
    };
  });

  return {
    props: {
      posts: posts.sort(sortByDate),
    },
  };
}
