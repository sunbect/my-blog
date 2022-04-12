import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import link from "next/link";
import Image from "next/image";

export default function BlogPost({
  frontmatter: { title, excerpt, date, cover_image },
  slug,
  content,
  html,
}) {
  return (
    <div className="post-page">
      <div className="image">
        <Image src={cover_image} height={300} width={600} />
      </div>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
    </div>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("posts"));

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join("posts", slug + ".md"),
    "utf-8"
  );

  const { data: frontmatter, content } = matter(markdownWithMeta);
  const html = marked.parse(content);

  return {
    props: { frontmatter, slug, content, html },
  };
}
