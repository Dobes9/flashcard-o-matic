import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

export default function StudyDeck() {
    return (
        <Route path="/decks/:deckId/study">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to="/decks/:deckId">Deck Name</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Study</li>
                </ol>
            </nav>
            <h2>Deck Name: Study</h2>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Card X of Total</h5>
                    <p className="card-text">Card front/back</p>
                    <button>Flip</button>
                    <button>Next</button>
                </div>
            </div>
        </Route>
    )
}