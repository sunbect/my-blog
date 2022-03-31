import Link from "next/link";

const Navbar = () => {
  return (
    <nav>
      <Link href="/" passHref>
        <h1 className="test">Yash Burshe</h1>
      </Link>
      <Link href="/blog" passHref>
        <h3>Blog</h3>
      </Link>
      <Link href="/contact" passHref>
        <h3>Contact</h3>
      </Link>
    </nav>
  );
};

export default Navbar;
