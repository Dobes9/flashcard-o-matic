import React from "react";
import { useHistory } from "react-router-dom";

export default function DecksList({ allDecks }) {
  const history = useHistory();
  const listOfDecks = allDecks
    .filter((deck) => {
      return deck.cards.length > 0;
    })
    .map((deck) => {
      return (
        <div className="card" key={deck.id}>
          <div className="card-title">
            <h4>{deck.name}</h4>
            <p style={{ justifyContent: "right" }}>{deck.cards.length} cards</p>
          </div>
          <div className="card-body">
            {deck.description}
            <button
              className="btn btn-secondary"
              onClick={() => history.push(`/decks/${deck.id}`)}
            >
              View
            </button>
            <button
              className="btn btn-primary"
              onClick={() => history.push(`/decks/${deck.id}/study`)}
            >
              Study
            </button>
            <button
              className="btn btn-danger"
              style={{ justifyContent: "right" }}
            >
              Delete
            </button>
          </div>
        </div>
      );
    });

  return (
    <div>
      <button className="btn btn-secondary">Create Deck</button>
      {listOfDecks}
    </div>
  );
}
