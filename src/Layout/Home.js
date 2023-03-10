import React from "react";
import { Route, Switch } from "react-router-dom";

import NotFound from "./NotFound";

import CreateDeck from "./decks/new/CreateDeck";
import Study from "./decks/study/Study";
import DrawDecks from "./decks/DrawDecks";
import DisplayDecks from "./decks/DisplayDecks";
import EditDeck from "./decks/EditDeck";
import AddCard from "./cards/AddCard";
import EditCard from "./cards/EditCard";

function Home() {
  return (
    <Switch>
      <Route path="/" exact={true}>
        <DrawDecks />
      </Route>
      <Route path={"/decks/new"}>
        <CreateDeck />
      </Route>
      <Route path={"/decks/:deckId/study"}>
        <Study />
      </Route>
      <Route path={"/decks/:deckId/edit"}>
        <EditDeck />
      </Route>
      <Route path="/decks/:deckId/cards/new">
        <AddCard />
      </Route>
      <Route path="/decks/:deckId/cards/:cardId/edit">
        <EditCard />
      </Route>
      <Route path="/decks/:deckId">
        <DisplayDecks />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}
export default Home;
