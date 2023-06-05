import Link from "next/link";

const Header = () => {
  return (
    <header>
      <Link href="/">
        <div className="title">
          <h1>TOP TEN</h1>
        </div>
      </Link>

      <button className="howBtn">How To?</button>
    </header>
  );
};

export default Header;
