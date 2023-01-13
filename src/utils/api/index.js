const { decks , cards }=require("../../data/db");


/**
 * Defines the base URL for the API.
 * The default values is overridden by the `API_BASE_URL` environment variable.
 */
//const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

/**
 * Defines the default headers for these functions to work with `json-server`
 */
const headers = new Headers();
headers.append("Content-Type", "application/json");


// function stripCards(deck) {
//   const { cards, ...deckWithoutCards } = deck;
//   return deckWithoutCards;
// }




export async function listDecks(signal) {
  const result=decks.map((deck)=>{
    deck.cards=cards.filter(card=>card.deckId===deck.id);
    return deck;
  });
  return result;
}

let maxDeckId=decks.reduce((acc,{id})=>Math.max(acc,id),0);

export async function createDeck(deck, signal) {
  deck.id=++maxDeckId;
  decks.push(deck);
  return deck;
}

export async function readDeck(deckId, signal) {
  const result= decks.find(deck=>deck.id===Number(deckId));
  result.cards=cards.filter(card=>card.deckId===Number(deckId));
  return result;
}

export async function updateDeck(updatedDeck, signal) {
  updatedDeck.id=Number(updatedDeck.id);
  const index=decks.findIndex(deck=>deck.id===updatedDeck.id);
  decks[index]=updatedDeck;
  return decks[index];
}

export async function deleteDeck(deckId, signal) {
  const index=decks.findIndex(deck=>deck.id===Number(deckId));
  return decks.splice(index,1);
}


export async function listCards(deckId, signal) {
  const deckCards=cards.filter(card=>card.deckId===Number(deckId));
  return deckCards;
}

let maxCardId=cards.reduce((acc,{id})=>Math.max(acc,id),0);

export async function createCard(deckId, card, signal) {
  // There is a bug in json-server, if you post to /decks/:deckId/cards the associated deckId is a string
  // and the card is not related to the deck because the data types of the ID's are different.
  
  card.id=++maxCardId;
  card.deckId=Number(deckId);
  cards.push(card);
  return card;
}

export async function readCard(cardId, signal) {
  const result= cards.find(card=>card.id===Number(cardId));
  return result;
}

export async function updateCard(updatedCard, signal) {
  updatedCard.id=Number(updatedCard.id);
  const index=cards.findIndex(card=>card.id===updatedCard.id);
  cards[index]=updatedCard;
  return cards[index];
}

export async function deleteCard(cardId, signal) {
  const index=cards.findIndex(card=>card.id===Number(cardId));
  return cards.splice(index,1);
}
