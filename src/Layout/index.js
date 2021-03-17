import React, { useState, useEffect } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { listDecks } from "../utils/api/index";
import { Switch, Route } from "react-router-dom";

function Layout() {
  const [allDecks, setAllDecks] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function loadAllDecks() {
      const decksFromAPI = await listDecks(signal);
      setAllDecks(decksFromAPI);
    }

    loadAllDecks();

    return () => abortController.abort();
  }, []);

  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
