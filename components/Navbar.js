import Link from 'next/link'

export default function Navbar(){
  return(
    <div className="navbar">
      <h1><Link href="/">Yash Burshe</Link></h1>
      <h2><Link href="/">Contact</Link></h2>
      <h2><Link href="/">Projects</Link></h2>
      <h2><Link href="/blog">Blog</Link></h2>
    </div>
  )
}
