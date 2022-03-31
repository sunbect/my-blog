import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default function Home({ posts }) {
  console.log(posts);
  return (
    <div>
      <Head>
        <title>Yash Burshe</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Bitter&family=Libre+Franklin&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navbar />
      <section>
        <div className="section-header">
          <Link href="/" passHref>
            <h3>Blog</h3>
          </Link>
        </div>
        <div className="blog-list">
          {posts.slice(0, 3).map((post, index) => (
            <Link href={"/blog/" + post.slug} passHref key={index}>
              <div className="blog-preview">
                <h3 className="card-title">{post.frontMatter.title}</h3>
                <p className="card-text">{post.frontMatter.description}</p>
                <p className="card-text">{post.frontMatter.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export const getStaticProps = async () => {
  const files = fs.readdirSync(path.join("posts"));
  const posts = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );
    const { data: frontMatter } = matter(markdownWithMeta);

    return {
      frontMatter,
      slug: filename.split(".")[0],
    };
  });

  return {
    props: {
      posts,
    },
  };
};
