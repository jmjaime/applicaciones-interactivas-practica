import { Link } from "react-router";

export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="marca">
        🏠 Inmobi
      </Link>
    </header>
  );
}
