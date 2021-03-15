import React from "react";
import { useHistory } from "react-router-dom";

export default function DecksList({ allDecks }) {
  const history = useHistory();

  return allDecks.map((deck) => {
    return (
      <div className="card" key={deck.id}>
        <div className="card-body">
          <div className="card-title">
            <h5>{deck.name}</h5>
          </div>
          <div className="card-text">
            <p>{deck.description}</p>
          </div>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={history.push(`/decks/${deck.id}`)}
          >
            View
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={history.push(`/decks/${deck.id}/study`)}
          >
            Study
          </button>
          <button type="button" className="btn btn-danger" onClick>
            Delete
          </button>
        </div>
      </div>
    );
  });
}
