import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { sortByDate } from "../utils";
import { FaGithub, FaLinkedin, FaArrowRight } from "react-icons/fa";

export default function Home({ posts }) {
  return (
    <div className="home-page">
      <Head>
        <title>Yash Burshe</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👨‍💻</text></svg>"
        />
      </Head>
      <div className="about">
        <div className="image">
          <Image src="/images/profile.jpeg" height="300px" width="300px" />
        </div>
        <div className="text">
          <p>
            Computer Science student at <b>NMIMS MPSTME 2024</b>. Currently a
            web developer by trade and cyber security student. Love going to the
            gym, cycling and exploring new places. Looking forward to our
            interactions!
          </p>
          <div className="socials">
            <a href="https://github.com/sunbect" target="_blank">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/in/yash-burshe/" target="_blank">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
      <div className="divider">
        <h4>Work</h4>
      </div>
      <div className="work">
        <div className="position">
          <h4>Software Engineering Intern - Oneture Technologies</h4>
          <h5> November 2021 – December 2021 </h5>
          <p>
            Created automated pipelines along with providing technical support
            to the software engineering team. Worked with client feedback to
            deliver high quality applications
          </p>
        </div>
      </div>
      <div className="divider">
        <h4>Last Blog Post</h4>
      </div>
      <div className="posts">
        {posts.slice(0, 1).map((post, index) => (
          <div className="post">
            <Image
              src={`${post.frontmatter.cover_image}`}
              width="300px"
              height="150px"
            />
            <h3>{post.frontmatter.title}</h3>
            <h4>{post.frontmatter.date}</h4>
            <p>{post.frontmatter.excerpt}</p>
            <Link href={`blog/${post.slug}`}>
              <div className="read-more">
                Read more
                <FaArrowRight />
              </div>
            </Link>
          </div>
        ))}
      </div>
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
