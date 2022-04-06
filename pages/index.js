import Head from "next/head";
import Navbar from "../components/navbar"
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import {sortByDate} from '../utils'

export default function Home({posts}) {
  console.log(posts)
  return (
    <div>
      <Head>
        <title>Yash Burshe</title>
      </Head>
      <Navbar />
      <div className="posts">
      {posts.slice(0,2).map((post, index) => (
        <h3><Link href={`blog/${post.slug}`}>{post.frontmatter.title}</Link></h3>
      ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join('posts'))

  const posts = files.map(filename => {
    const slug = filename.replace(".md", '')
    const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')

    const {data:frontmatter} = matter(markdownWithMeta)

    return{
      slug,
      frontmatter
    }
  })

  return{
    props: {
      posts: posts.sort(sortByDate),
    }
  }
}
