import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createCard } from "../utils/api/index";

export default function AddCard() {
  const initialFormState = {
    front: "",
    back: "",
  };

  const [formData, setFormData] = useState({ ...initialFormState });

  const handleFormChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {};

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/decks/:deckId">Deck Name</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
        <h2>Deck Name: Add Card</h2>
        <form onSubmit>
          <label htmlFor="front">
            Front
            <textarea
              id="front"
              name="front"
              value={formData.front}
              onChange={handleFormChange}
              placeholder="Front side of card"
            />
          </label>
          <label htmlFor="back">
            Back
            <textarea
              id="back"
              name="back"
              value={formData.back}
              onChange={handleFormChange}
              placeholder="Back side of card"
            />
          </label>
        </form>
      </nav>
    </div>
  );
}
