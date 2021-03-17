import React, { useState } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { createCard } from "../utils/api/index";

export default function CardForm() {
  const history = useHistory();
  const { path, params } = useRouteMatch();
  const { deckId } = params;
  const initialFormData = {
    front: "",
    back: "",
  };

  const [formData, setFormData] = useState({ ...initialFormData });

  const handleFormChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  return (
    <form
      onSubmit={() => {
        if (path === `/decks/:deckId/cards/new`) {
          const abortController = new AbortController();
          createCard(deckId, formData, abortController.signal);
          setFormData({ ...initialFormData });
        }
      }}
    >
      <div className="mb-3">
        <label htmlFor="front">Front</label>
        <textarea
          id="front"
          name="front"
          value={formData.front}
          onChange={handleFormChange}
          placeholder="Front side of card"
          rows="2"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="back">Back</label>
        <textarea
          id="back"
          name="back"
          value={formData.back}
          onChange={handleFormChange}
          placeholder="Back side of card"
          rows="2"
        />
      </div>
      {path === "/decks/:deckId/cards/new" ? (
        <div>
          <button
            className="btn btn-secondary"
            onClick={() => history.push(`/decks/${deckId}`)}
          >
            Done
          </button>
          <button className="btn btn-primary" type="submit">
            Save
          </button>
        </div>
      ) : (
        <div>
          <button className="btn btn-secondary">Cancel</button>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      )}
    </form>
  );
}
