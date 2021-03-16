import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { deleteCard } from "../utils/api/index";

export default function CardsList({ cards }) {
  const history = useHistory();
  const { url } = useRouteMatch();
  const allCards = cards.map((card) => (
    <div className="card" key={card.id}>
      <div className="card-body">
        <div className="row">
          <div className="col">
            <p>{card.front}</p>
          </div>
          <div className="col">
            <p>{card.back}</p>
            <button
              type="button"
              className="btn btn-secondary"
              style={{ justifyContent: "right" }}
              onClick={() => {
                history.push(`${url}/cards/${card.id}/edit`);
              }}
            >
              Edit
            </button>
            <button
              type="button"
              className="btn btn-danger"
              style={{ justifyContent: "right" }}
              onClick
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  ));
  return (
    <div>
      <h2>Cards</h2>
      {allCards}
    </div>
  );
}
