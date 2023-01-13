import  React, { useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { deleteCard } from "../../../utils/api";

function DrawCard({ card }) {
  const { url } = useRouteMatch(); //  /decks/1
  const [cardState,setCardState]=useState({...card});
  console.log("card: ",card);
  console.log("cardState: ",cardState);
  //before change
  //before
    
  const deleteHandler=()=>{
        const result=window.confirm(`Delete this card? \n\n You will not be able to recover card Id: ${card.id}.`);
        if (result){
          deleteCard(card.id);
          setCardState({});
          //history.push(`${url}`);
        }
  }

  if (!cardState.id){
    return <p>Deleted Card</p>;
  }

  return (
    <div className="row border border-secondary">
      <div className="col col-6">
        <p>{cardState.front}</p>
      </div>
      <div className="col col-6">
        <p>{cardState.back}</p>
        <section className="d-flex justify-content-end mb-2">
          <Link
            to={`${url}/cards/${cardState.id}/edit`}
            className="btn btn-secondary mr-2"
          >
            <span className="oi oi-pencil"></span> Edit
          </Link>
          <button className="btn btn-danger float-right" onClick={deleteHandler}>
            <span className="oi oi-trash"></span>
          </button>
        </section>
      </div>
    </div>
  );
}

export default DrawCard;
