import React from 'react';
import { Route, Link, useHistory } from 'react-router-dom';

export default function ViewDeck() {
    const history = useHistory();
    return (
        <Route path="/decks/:deckId">
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Deck Name</li>
                </ol>
            </nav>
        <div>
            <h5>Deck Name</h5>
            <p>Deck description</p>
            <button type="button" className="btn btn-secondary" onClick={history.push("/decks/:deckId/edit")}>Edit</button>
            <button type="button" className="btn btn-primary" onClick={history.push("/decks/:deckId/study")}>Study</button>
            <button type="button" className="btn btn-primary" onClick={history.push("/decks/:deckId/cards/new")}>Add Cards</button>
            <button>Delete</button>
        </div>
        <div>
            <h4>Cards</h4>
            {/* list of cards in deck */}
        </div>
    </div>
    </Route>
    )
}