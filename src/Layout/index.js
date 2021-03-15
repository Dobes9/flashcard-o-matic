import React, { useState, useEffect } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { listDecks } from "../utils/api/index";
import { Switch, Route, useHistory } from "react-router-dom";
import DecksList from "../Decks/DecksList";

function Layout() {
  const history = useHistory();
  const [allDecks, setAllDecks] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    listDecks(signal).then(setAllDecks);

    return () => abortController.error();
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={history.push("/decks/new")}
        >
          Create Deck
        </button>
        <DecksList allDecks={allDecks} />
        <Switch>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
