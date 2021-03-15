import React from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import {
  readDeck,
  deleteDeck,
  listCards,
  deleteCard,
} from "../utils/api/index";

export default function ViewDeck() {
  const history = useHistory();
  const { deckId } = useRouteMatch();
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Deck Name
          </li>
        </ol>
      </nav>
      <div>
        <h5>Deck Name</h5>
        <p>Deck description</p>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={history.push("/decks/:deckId/edit")}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={history.push("/decks/:deckId/study")}
        >
          Study
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={history.push("/decks/:deckId/cards/new")}
        >
          Add Cards
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => {
            const confirmDeleteDeck = window.confirm(
              "Delete this deck? \n \n You will not be able to recover it."
            );
            if (confirmDeleteDeck) {
              deleteDeck(deckId);
              history.push("/");
            }
          }}
        >
          Delete
        </button>
      </div>
      <div>
        <h4>Cards</h4>
        {/* list of cards in deck */}
      </div>
    </div>
  );
}
