import { cardToName, HandToDecision, genRanks, getRank, setRank, genSuits, getSuit, setSuit } from './Globals.js'
import React, { useState } from 'react';
import './App.css';
import './index.css';
import { Select } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import svg from "./svg-cards/svg-cards.svg";

const defaultUserHand = {
  "card1": { "value": '2', "suit": 'D' },
  "card2": { "value": '7', "suit": 'H' }
}

const SuitDropDown = ({ setUserHand, cardNum, userHand }) => (
  <select id={"suit-input-" + cardNum} value={getSuit(userHand, cardNum)} onChange={(e) => setSuit(e.target.value, userHand, setUserHand, cardNum)}>
    {genSuits(cardNum, userHand)}
  </select>
)

const RankDropDown = ({ setUserHand, cardNum, userHand }) => (
  <select id={"rank-input-" + cardNum} value={getRank(userHand, cardNum)} onChange={(e) => setRank(e.target.value, userHand, setUserHand, cardNum)}>
    {genRanks(cardNum, userHand)}
  </select>
)

const CardArea = ({ setUserHand, cardNum, userHand }) => (
  <div>
    <SuitDropDown setUserHand={setUserHand} cardNum={cardNum} userHand={userHand} />
    <RankDropDown setUserHand={setUserHand} cardNum={cardNum} userHand={userHand} />
  </div>
);

const getPicture = (card) => {
  const name = cardToName(card)
  const path = `${svg}#${name}`

  return <svg width={170} height={245} transform={"scale(0.4)"}><use xlinkHref={path} /></svg>
}

const App = () => {
  const [userHand, setUserHand] = useState(defaultUserHand);

  return (
    <div className="App">
      <h1>Preflop Pro</h1>
      <div className="row justify-content-center">
        <div className="col-3">
          <h4>Card 1</h4>
          {getPicture(userHand.card1)}
          <CardArea setUserHand={setUserHand} cardNum={1} userHand={userHand} />
        </div>
        <div className="col-3">
          <h4>Card 2</h4>
          {getPicture(userHand.card2)}
          <CardArea setUserHand={setUserHand} cardNum={2} userHand={userHand} />
        </div>
      </div>

      <h1>Action: {HandToDecision(userHand)}!</h1>
    </div >
  );
}


export default App;
