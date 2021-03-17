import React, { useState, useEffect } from "react";
import { useRouteMatch, Link } from "react-router-dom";
import { readDeck, listCards } from "../utils/api/index";
import NotEnoughCards from "../Cards/NotEnoughCards";

export default function StudyDeck() {
  const { params } = useRouteMatch();
  const { deckId } = params;
  const [selectedDeck, setSelectedDeck] = useState({});
  const [cardsInDeck, setCardsInDeck] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    readDeck(deckId, signal).then(setSelectedDeck);
    listCards(deckId, signal).then(setCardsInDeck);

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
            Study
          </li>
        </ol>
      </nav>
      {cardsInDeck.length < 3 ? (
        <NotEnoughCards />
      ) : (
        <p>Placeholder for study session</p>
      )}
    </div>
  );
}
