import  React from "react";
import { Link, useRouteMatch, useParams } from "react-router-dom";

function NavigationBar({ navItems }) {
  const { url } = useRouteMatch();
  const { deckId } = useParams();
  return (
    <div>
      <nav className="breadcrumb" aria-label="breadcrumb">
            <Link to="/" className="breadcrumb-item ">
              <span className="oi oi-home mr-1"></span>Home
            </Link>
          {navItems.map((item, index) => (
              index===navItems.length-1 ?
              <Link key={index} className="breadcrumb-item " to={url}>{item}</Link> :
              <Link key={index} className="breadcrumb-item active" to={`/decks/${deckId}`}>{item}</Link>
          ))}
      </nav>
    </div>
  );
}

export default NavigationBar;
