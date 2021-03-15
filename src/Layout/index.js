import React, { useState, useEffect } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { listDecks } from "../utils/api/index";
import { Switch, Route } from "react-router-dom";
import DecksList from "../Decks/DecksList";

function Layout() {
  const [allDecks, setAllDecks] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    setAllDecks(listDecks(signal));

    return () => abortController.abort();
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <DecksList allDecks={allDecks} />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
