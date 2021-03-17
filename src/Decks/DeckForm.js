import React, { useState } from "react";

export default function DeckForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleFormChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  // const handleSubmit = (event) => {}

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
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleFormChange}
            placeholder="Brief description of the deck"
          />
        </label>
      </div>
    </form>
  );
}
