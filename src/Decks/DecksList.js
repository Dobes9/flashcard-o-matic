import React from "react";
import { useHistory } from "react-router-dom";
import { deleteDeck } from "../utils/api/index";

export default function DecksList({ allDecks }) {
  const history = useHistory();
  const abortController = new AbortController();
  const signal = abortController.signal;

  const listOfDecks = allDecks.map((deck) => {
    return (
      <div className="card" key={deck.id}>
        <div className="card-title">
          <h4>{deck.name}</h4>
          <p style={{ justifyContent: "right" }}>{deck.cards.length} cards</p>
        </div>
        <div className="card-body">{deck.description}</div>
        <div>
          <button
            className="btn btn-secondary"
            onClick={() => {
              history.push(`/decks/${deck.id}`);
            }}
          >
            View
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              history.push(`/decks/${deck.id}/study`);
            }}
          >
            Study
          </button>
          <button
            className="btn btn-danger"
            style={{ justifyContent: "right" }}
            onClick={() => {
              const confirmDeleteDeck = window.confirm(
                "Delete this deck? \n \nYou will not be able to recover it."
              );
              if (confirmDeleteDeck) {
                deleteDeck(deck.id, signal);
              }
            }}
          >
            Delete
          </button>
        </div>
      </div>
    );
  });

  return (
    <div>
      <button
        className="btn btn-secondary"
        onClick={() => history.push("/decks/new")}
      >
        Create Deck
      </button>
      {listOfDecks}
    </div>
  );
}
