import React, { useEffect } from "react";
import { useRouteMatch, Link } from "react-router-dom";
import { readDeck, listCards } from "../utils/api/index";
import NotEnoughCards from "../Cards/NotEnoughCards";
import StudySession from "../Cards/StudySession";

export default function StudyDeck({ settings, setSettings }) {
  const { params } = useRouteMatch();
  const { deckId } = params;

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function loadDeck() {
      const deckFromAPI = await readDeck(deckId, signal);
      const cardsFromAPI = await listCards(deckId, signal);
      setSettings({
        ...settings,
        selectedDeck: deckFromAPI,
        cardsInDeck: cardsFromAPI,
      });
    }
    loadDeck();

    return () => abortController.abort();
  }, [deckId]);

  const { selectedDeck, cardsInDeck } = settings;

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
      <h2>{selectedDeck.name}: Study</h2>
      {cardsInDeck.length < 3 ? (
        <NotEnoughCards cardsInDeck={cardsInDeck} />
      ) : (
        <StudySession cardsInDeck={cardsInDeck} />
      )}
    </div>
  );
}
