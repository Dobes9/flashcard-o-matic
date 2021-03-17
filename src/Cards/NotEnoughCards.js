import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

export default function NotEnoughCards({ cardsInDeck }) {
  const history = useHistory();
  const { params } = useRouteMatch();
  const { deckId } = params;
  return (
    <div>
      <h3>Not enough cards.</h3>
      <p>
        You need at least 3 cards to study. There are {cardsInDeck.length} cards
        in this deck.
      </p>
      <button
        className="btn btn-primary"
        onClick={() => history.push(`/decks/${deckId}/cards/new`)}
      >
        Add Cards
      </button>
    </div>
  );
}
