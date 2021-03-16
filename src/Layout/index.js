import React, { useState, useEffect } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { listDecks } from "../utils/api/index";
import { Switch, Route } from "react-router-dom";
import DecksList from "../Decks/DecksList";
import CreateDeck from "../Decks/CreateDeck";
import ViewDeck from "../Decks/ViewDeck";
import StudyDeck from "../Decks/StudyDeck";

function Layout() {
  const [allDecks, setAllDecks] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    setAllDecks(listDecks(signal));

    return () => abortController.abort();
  }, []);

  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <DecksList allDecks={allDecks} />
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route path="/decks/:deckId">
            <ViewDeck />
          </Route>
          <Route path="/decks/:deckId/study">
            <StudyDeck />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
