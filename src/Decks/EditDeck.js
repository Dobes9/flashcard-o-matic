import React, { useEffect } from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import DeckForm from "./DeckForm";
import { readDeck } from "../utils/api/index";

export default function EditDeck({
  selectedDeck,
  setSelectedDeck,
  setCardsInDeck,
}) {
  const history = useHistory();
  const { params } = useRouteMatch();
  const { deckId } = params;
  const currentDeck = selectedDeck;

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    readDeck(deckId, signal).then(setSelectedDeck);

    return () => abortController.abort();
  }, [deckId, setSelectedDeck]);

  const handleCancel = () => {
    history.push(`/decks/${deckId}`);
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item" onClick={() => {
              setSelectedDeck({});
              setCardsInDeck([]);
          }}>
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{currentDeck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>
      <h2>Edit Deck</h2>
      <DeckForm
        selectedDeck={{
          id: currentDeck.id,
          name: currentDeck.name,
          description: currentDeck.description,
        }}
        handleCancel={handleCancel}
      />
    </div>
  );
}
