import React, { useEffect } from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import DeckForm from "./DeckForm";
import { readDeck } from "../utils/api/index";

export default function EditDeck({ selectedDeck }) {
  const history = useHistory();
  const { params } = useRouteMatch();
  const { deckId } = params;

  const handleCancel = () => {
    history.push(`/decks/${deckId}`);
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{selectedDeck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>
      <h2>Edit Deck</h2>
      <DeckForm
        selectedDeck={{
          id: selectedDeck.id,
          name: selectedDeck.name,
          description: selectedDeck.description,
        }}
        handleCancel={handleCancel}
      />
    </div>
  );
}
