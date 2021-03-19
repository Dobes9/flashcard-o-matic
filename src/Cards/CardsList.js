import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { deleteCard } from "../utils/api/index";

export default function CardsList({ cardsInDeck }) {
  const history = useHistory();
  const { url } = useRouteMatch();

  const listOfCards = cardsInDeck.map((card) => {
    return (
      <div className="card" key={card.id}>
        <div className="card-body">
          <div className="row">
            <div className="col">
              <p className="card-text">{card.front}</p>
            </div>
            <div className="col">
              <p className="card-text">{card.back}</p>
              <button
                className="btn btn-secondary"
                onClick={() => history.push(`${url}/cards/${card.id}/edit`)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  const confirmDeleteCard = window.confirm(
                    "Delete this card? \n \nYou will not be able to recover it."
                  );
                  if (confirmDeleteCard) {
                    const abortController = new AbortController();
                    deleteCard(card.id, abortController.signal);
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  });
  return <div>{listOfCards}</div>;
}
