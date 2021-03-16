import React, { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { readDeck } from "../utils/api/index";

export default function StudyDeck() {
  const { deckId } = useRouteMatch();
  const [selectedDeck, setSelectedDeck] = useState({});

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    setSelectedDeck(readDeck(deckId, signal));

    return () => abortController.abort();
  }, [deckId]);

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
      <h2>Study: {selectedDeck.name}</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Card X of Total</h5>
          <p className="card-text">Card front/back</p>
          <button>Flip</button>
          <button>Next</button>
        </div>
      </div>
    </div>
  );
}
