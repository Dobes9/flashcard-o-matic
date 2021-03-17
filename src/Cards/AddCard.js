import React, { useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import CardForm from "./CardForm";
import { readDeck } from "../utils/api/index";

export default function AddCard({
  selectedDeck,
  setSelectedDeck,
  setCardsInDeck,
}) {
  const { params } = useRouteMatch();
  const { deckId } = params;

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    readDeck(deckId, signal).then(setSelectedDeck);

    return () => abortController.abort();
  }, [deckId]);

  const currentDeck = selectedDeck;

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li
            className="breadcrumb-item"
            onClick={() => {
              setSelectedDeck({});
              setCardsInDeck([]);
            }}
          >
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{currentDeck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      <h3>{currentDeck.name}: Add Card</h3>
      <CardForm selectedCard={{ front: "", back: "" }} />
    </div>
  );
}
