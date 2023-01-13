import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { createCard, readDeck } from "../../utils/api";
import NavigationBar from "../NavigationBar";
import NotFound from "../NotFound";
import CardFormData from "./CardFormData";

function AddCard() {
  const { deckId } = useParams();
  const [ deck, setDeck ] = useState({});
  const [ front, setFront ] = useState("");
  const [ back, setBack ] = useState("");

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then(setDeck)
      .catch((e) => {
        return <NotFound />;
      });
    return () => abortController.abort();
  }, [ deckId ]);

  if (!deck) {
    return <NotFound />;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const card = {
      front,
      back,
    };
    createCard(deckId, card)
      .then(window.alert("Your new card has been added to the deck!"))
      .catch(console.log);
    setFront("");
    setBack("");
  };

  return (
    <div>
      <NavigationBar navItems={[deck.name, "Add Card"]} />
      <h2>{deck.name}: Add a Card</h2>
      <form onSubmit={handleSubmit}>
        <CardFormData
          front={front}
          setFront={setFront}
          back={back}
          setBack={setBack}
        />

        <Link
          to={`/decks/${deckId}`}
          className="form-button btn btn-lg btn-secondary mr-2"
        >
          Done
        </Link>
        <button type="submit" className="btn btn-success btn-lg">
          Save
        </button>
      </form>
    </div>
  );
}

export default AddCard;
