import React, { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import CardForm from "./CardForm";
import { readDeck } from "../utils/api/index";

export default function AddCard() {
  const { params } = useRouteMatch();
  const { deckId } = params;

  const [selectedDeck, setSelectedDeck] = useState({});

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    readDeck(deckId, signal).then(setSelectedDeck);

    return () => abortController.abort();
  }, [deckId]);

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
            Add Card
          </li>
        </ol>
      </nav>
      <h3>{selectedDeck.name}: Add Card</h3>
      <CardForm />
    </div>
  );
}
