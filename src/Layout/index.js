import React, { useState, useEffect } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import DecksList from "../Decks/DecksList";
import CreateDeck from "../Decks/CreateDeck";
import ViewDeck from "../Decks/ViewDeck";
import StudyDeck from "../Decks/StudyDeck";
import EditDeck from "../Decks/EditDeck";
import AddCard from "../Cards/AddCard";
import { listDecks } from "../utils/api/index";
import { Switch, Route } from "react-router-dom";

function Layout() {
  const [allDecks, setAllDecks] = useState([]);
  const [selectedDeck, setSelectedDeck] = useState({});
  const [cardsInDeck, setCardsInDeck] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    listDecks(signal).then(setAllDecks);

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
          <Route exact path="/decks/:deckId">
            <ViewDeck
              selectedDeck={selectedDeck}
              setSelectedDeck={setSelectedDeck}
              cardsInDeck={cardsInDeck}
              setCardsInDeck={setCardsInDeck}
            />
          </Route>
          <Route path="/decks/:deckId/study">
            <StudyDeck
              selectedDeck={selectedDeck}
              setSelectedDeck={setSelectedDeck}
              cardsInDeck={cardsInDeck}
              setCardsInDeck={setCardsInDeck}
            />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck
              selectedDeck={selectedDeck}
              setSelectedDeck={setSelectedDeck}
              setCardsInDeck={setCardsInDeck}
            />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard />
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
