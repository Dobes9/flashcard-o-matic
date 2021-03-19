import React, { useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import CardForm from "./CardForm";
import { readCard } from "../utils/api/index";

export default function EditCard({ settings, setSettings }) {
  const { params } = useRouteMatch();
  const { deckId, cardId } = params;

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function loadCard() {
      const cardFromAPI = await readCard(cardId, signal);
      setSettings({
        ...settings,
        selectedCard: cardFromAPI,
      });
    }
    loadCard();

    return () => abortController.abort();
  }, [cardId]);

  const {selectedDeck, selectedCard} = settings;

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
            Edit Card {selectedCard.id}
          </li>
        </ol>
      </nav>
      <h2>Edit Card</h2>
      <CardForm />
    </div>
  );
}
