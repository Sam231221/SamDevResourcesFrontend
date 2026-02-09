import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import me from "../../images/me.jpg";

export default function Header() {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <img src={me} alt="Sam" className="header-avatar" />
          <h1 className="header-title">Sam Dev Resources</h1>
        </div>
      </div>
    </header>
  );
}
