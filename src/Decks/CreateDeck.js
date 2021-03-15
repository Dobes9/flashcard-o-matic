import React from "react";
import { useHistory, Link } from "react-router-dom";

export default function CreateDeck() {
    const history = useHistory();
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
                </ol>
            </nav>
            <h2>Create Deck</h2>
            <form>

            </form>
        </div>
    )
}
