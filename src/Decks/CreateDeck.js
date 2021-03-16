import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { createDeck } from "../utils/api/index";

export default function CreateDeck() {
  const history = useHistory();
  const initialFormState = {
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState({ ...initialFormState });
  const handleFormChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    const signal = abortController.signal;
    createDeck(formData, signal);
    setFormData(...initialFormState);
    history.push("/decks/:deckId");
  };
  
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <h2>Create Deck</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            placeholder="Deck Name"
            onChange={handleFormChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            rows="5"
            value={formData.description}
            placeholder="Brief description of the deck"
            onChange={handleFormChange}
          />
        </label>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            setFormData({ ...initialFormState });
            history.push("/");
          }}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
