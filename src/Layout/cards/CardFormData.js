import React from "react";

export default function CardFormData({ front, setFront, back, setBack }) {
  return (
    <div>
      <div className="form-group">
        <label htmlFor="front">Card Front</label>
        <textarea
          id="front"
          className="form-control"
          placeholder="This will be the front side of the new card."
          rows="3"
          required
          value={front}
          onChange={({ target: { value } }) => setFront(value)}
        />
        <small className="form-text text-muted">
          Write your question here.
        </small>
      </div>
      <div className="form-group">
        <label htmlFor="back">Card Back</label>
        <textarea
          id="back"
          className="form-control"
          placeholder="This will be the back side of the new card."
          rows="3"
          required
          value={back}
          onChange={({ target: { value } }) => setBack(value)}
        />
        <small className="form-text text-muted">Write the answer here.</small>
      </div>
    </div>
  );
}
