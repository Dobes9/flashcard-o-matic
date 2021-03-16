import React from "react";
import { Link, useHistory } from "react-router-dom";

export default function NotEnoughCards() {
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/decks/:deckId">Deck Name</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
      <h2>Deck Name: Study</h2>
      <h3>Not Eenough cards.</h3>
      <p>You need at least 3 cards to study. There are x cards in this deck.</p>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          useHistory.push("/decks/:deckId/cards/new");
        }}
      >
        Add Cards
      </button>
    </div>
  );
}
