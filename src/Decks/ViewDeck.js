import React, { useEffect } from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { readDeck, listCards, deleteDeck } from "../utils/api/index";
import CardsList from "../Cards/CardsList";

export default function ViewDeck({
  selectedDeck,
  setSelectedDeck,
  cardsInDeck,
  setCardsInDeck,
}) {
  const history = useHistory();
  const { params } = useRouteMatch();
  const { deckId } = params;

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    readDeck(deckId, signal).then(setSelectedDeck);
    listCards(deckId, signal).then(setCardsInDeck);

    return () => abortController.abort();
  }, [deckId, setSelectedDeck, setCardsInDeck]);

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
          <li className="breadcrumb-item active" aria-current="page">
            {currentDeck.name}
          </li>
        </ol>
      </nav>
      <h4>{currentDeck.name}</h4>
      <p>{currentDeck.description}</p>
      <div className="row">
        <div className="col">
          <button
            className="btn btn-secondary"
            onClick={() => history.push(`/decks/${deckId}/edit`)}
          >
            Edit
          </button>
          <button
            className="btn btn-primary"
            onClick={() => history.push(`/decks/${deckId}/study`)}
          >
            Study
          </button>
          <button
            className="btn btn-primary"
            onClick={() => history.push(`/decks/${deckId}/cards/new`)}
          >
            Add Cards
          </button>
        </div>
        <div className="col">
          <button
            className="btn btn-danger"
            onClick={() => {
              const confirmDeleteDeck = window.confirm(
                "Delete this deck? \n \nYou will not be able to recover it."
              );
              if (confirmDeleteDeck) {
                const abortController = new AbortController();
                deleteDeck(deckId, abortController.signal);
                history.push("/");
              }
            }}
          >
            Delete
          </button>
        </div>
      </div>
      <h3>Cards</h3>
      <CardsList cardsInDeck={cardsInDeck} />
    </div>
  );
}
