import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function DeckForm({ selectedDeck, handleSubmit }) {
  const history = useHistory();
  const [formData, setFormData] = useState({ ...selectedDeck });

  const handleFormChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  return (
    <form onSubmit>
      <div className="mb-3">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleFormChange}
          placeholder="Deck Name"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleFormChange}
            placeholder="Brief description of the deck"
          />
        </label>
      </div>
      <div>
        <button className="btn btn-secondary" onClick={() => history.push("/")}>
          Cancel
        </button>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}
