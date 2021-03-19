import React, { useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import CardForm from "./CardForm";
import { readCard } from "../utils/api/index";

export default function EditCard({
  selectedDeck,
  setSelectedDeck,
  setCardsInDeck,
  selectedCard,
  setSelectedCard,
}) {
  const { params } = useRouteMatch();
  const { deckId, cardId } = params;
  const currentDeck = selectedDeck;
  const currentCard = selectedCard;

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    readCard(cardId, signal).then(setSelectedCard);

    return () => abortController.abort();
  }, [cardId, setSelectedCard]);

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
          <li className="breadcrumb-item" onClick={() => setSelectedCard({})}>
            <Link to={`/decks/${deckId}`}>{currentDeck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Card {currentCard.id}
          </li>
        </ol>
      </nav>
      <h2>Edit Card</h2>
      <CardForm setSelectedCard={setSelectedCard} />
    </div>
  );
}
