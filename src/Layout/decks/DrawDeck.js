import React from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck } from "../../utils/api";

// renders individual deck elements on home page
function DrawDeck({ deck }) {
  const history = useHistory();
  const handleDeckDelete = () => {
    if (
      window.confirm(
        "Delete This Deck?\n\nThis deck will be deleted permanently. Select OK to proceed."
      )
    ) {
      deleteDeck(deck.id)
        .then(() => {
          history.push("/NotFound");
          history.push("/");
        })
        .catch((e) => {
          history.push("/NotFound");
        });
    }
  };
  return (
    <div className="card border border-primary mt-3">
      <div className="card-body">
        <h5 className="card-title">
          {deck.name}{" "}
          <small className="float-right">{deck.cards.length} cards</small>
        </h5>
        <p className="card-text">{deck.description}</p>
        <Link
          to={`/decks/${deck.id}`}
          type="button"
          className="btn btn-lg btn-dark mr-1"
        >
          <span className="oi oi-eye"></span> View
        </Link>
        <Link
          to={`/decks/${deck.id}/study`}
          type="button"
          className="btn btn-lg btn-primary"
        >
          <span className="oi oi-book"></span> Study
        </Link>
        <button
          type="button"
          onClick={handleDeckDelete}
          className="btn btn-danger  mr-2 float-right"
        >
          <span className="oi oi-trash "></span>
        </button>
      </div>
    </div>
  );
}

export default DrawDeck;
