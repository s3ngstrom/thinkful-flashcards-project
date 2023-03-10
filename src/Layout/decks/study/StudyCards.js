import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// import { listCards } from "../../../utils/api";

function StudyCards({ cards }) {
  const [flip, setFlip] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const history = useHistory();

  const handleNext = () => {
    if (currentIndex === cards.length - 1) {
      const result = window.confirm(
        "Restart cards? \n\nClick Cancel to return to the home page."
      );
      if (result) {
        setFlip(false);
        setCurrentIndex(0);
        return;
        //history.go(0);
      } else {
        history.push("/");
      }
    }
    setCurrentIndex((current) => Math.min(cards.length - 1, current + 1));
    setFlip(!flip);
  };

  if (cards.length <= 2) {
    return (
      <div>
      <h4 className="alert alert-warning">There are not enough cards in this deck.</h4>
        <p className="alert alert-info">
          You need at least 3 cards to use the Study feature. There are currently {cards.length} in the
          deck.
        </p>
      </div>
    );
  }

  return (
    <div className="card border border-primary mb-5">
      <div className="card-body">
        <h5 className="card-title">
          Card {currentIndex + 1} of {cards.length}
        </h5>
        <p className="card-text">
          {flip ? cards[currentIndex].back : cards[currentIndex].front}
        </p>
        <button
          type="button"
          className="btn btn-dark mr-2"
          onClick={() => {
            setFlip(!flip);
          }}
        >
          Flip
        </button>
        {flip && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleNext}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default StudyCards;
