import React, { useEffect, useState } from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { readDeck, listCards, deleteDeck } from "../utils/api/index";

export default function ViewDeck() {
  const history = useHistory();
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
          <li className="breadcrumb-item active" aria-current="page">
            {selectedDeck.name}
          </li>
        </ol>
      </nav>
      <h4>{selectedDeck.name}</h4>
      <p>{selectedDeck.description}</p>
      <div>
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
      <h3>Cards</h3>
      <p>placeholder for cards list</p>
    </div>
  );
}
