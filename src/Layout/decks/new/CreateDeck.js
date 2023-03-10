import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../../../utils/api";
import NavigationBar from "../../NavigationBar";

function CreateDeck() {
  const [deckName, setDeckName] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  const history = useHistory();

  const [abortControllers, setAbortControllers] = useState([]);
  const _abortPreviousCall = () => {
    if (abortControllers.length) {
      const lastIndex = abortControllers.length - 1;
      const lastAbortController = abortControllers[lastIndex];
      lastAbortController.abort();
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    _abortPreviousCall();
    const newAbortController = new AbortController();
    setAbortControllers([...abortControllers, newAbortController]);
    const deck = {
      name: deckName,
      description: deckDescription,
    };
    createDeck(deck, newAbortController.signal).then(({ id }) =>
      history.push("/decks/" + id)
    );
  };
  return (
    <div>
      <NavigationBar navItems={["Create Deck"]} />
      <h2>Create Deck</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="deckName">Name</label>
          <input
            type="text"
            className="form-control"
            id="deckName"
            aria-describedby="newDeck"
            placeholder="Deck Name"
            value={deckName}
            onChange={({ target: { value } }) => {
              setDeckName(value);
            }}
          />
          <small id="newDeck" className="form-text text-muted">
            This field is required.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            placeholder="Provide a brief description of your deck."
            rows="3"
            value={deckDescription}
            onChange={({ target: { value } }) => {
              setDeckDescription(value);
            }}
          />
        </div>
        <button type="reset" className="btn btn-danger mr-2">
          Cancel
        </button>
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </div>
  );
}
export default CreateDeck;
