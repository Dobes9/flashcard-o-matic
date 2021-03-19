import React, { useEffect } from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { readDeck, listCards, deleteDeck } from "../utils/api/index";
import CardsList from "../Cards/CardsList";

export default function ViewDeck({ settings, setSettings }) {
  const history = useHistory();
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

  const {selectedDeck} = settings;

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
      <CardsList cardsInDeck={settings.cardsInDeck} />
    </div>
  );
}
