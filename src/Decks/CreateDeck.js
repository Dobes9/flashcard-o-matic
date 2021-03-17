import React from "react";
import { Link } from "react-router-dom";
import DeckForm from "./DeckForm";

export default function CreateDeck() {
    //const handleSubmit = (event) => {}
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
      <DeckForm selectedDeck={{ name: "", description: "" }} />
    </div>
  );
}
