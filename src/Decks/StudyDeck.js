import React, { useEffect } from "react";
import { useRouteMatch, Link } from "react-router-dom";
import { readDeck, listCards } from "../utils/api/index";
import NotEnoughCards from "../Cards/NotEnoughCards";
import StudySession from "../Cards/StudySession";

export default function StudyDeck({
  selectedDeck,
  setSelectedDeck,
  cardsInDeck,
  setCardsInDeck,
}) {
  const { params } = useRouteMatch();
  const { deckId } = params;

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    readDeck(deckId, signal).then(setSelectedDeck);
    listCards(deckId, signal).then(setCardsInDeck);

    return () => abortController.abort();
  }, [deckId, setSelectedDeck, setCardsInDeck]);

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
            <Link to={`/decks/${deckId}`}>{selectedDeck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
      <h2>{selectedDeck.name}: Study</h2>
      {cardsInDeck.length < 3 ? (
        <NotEnoughCards cardsInDeck={cardsInDeck} />
      ) : (
        <StudySession />
      )}
    </div>
  );
}
