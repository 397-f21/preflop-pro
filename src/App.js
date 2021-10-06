import { cardToName, HandToDecision, genRanks, getRank, setRank, genSuits, getSuit, setSuit, useWindowDimensions } from './Globals.js'
import React, { useState, useEffect } from 'react';
import './App.css';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import svg from "./svg-cards/svg-cards.svg";

import styled from 'styled-components';

const Select = styled.select`
  width: 100%;
  height: 35px;
  background: white;
  color: gray;
  padding-left: 5px;
  font-size: 14px;
  border: none;
  margin-left: 10px;

  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;

const defaultUserHand = {
  "card1": { "value": '2', "suit": 'D' },
  "card2": { "value": '7', "suit": 'H' }
}

const getCardFromHand = (hand, cardNum) => {
  return hand["card"+cardNum];
}

const StyledSelect = styled("select");

const SuitDropDown = ({ setUserHand, cardNum, userHand }) => {
  const [suitOptionList, setSuitOptionList] = useState(genSuits(cardNum, userHand));
  useEffect(() => {
    setSuitOptionList(genSuits(cardNum, userHand))
  }, [userHand]);
  return (
    <Select id={"suit-input-" + cardNum} defaultValue={5} onChange={(e) => { setSuit(e.target.value, userHand, setUserHand, cardNum)} }>
      {suitOptionList}
    </Select>
  );
}

const RankDropDown = ({ setUserHand, cardNum, userHand }) => (
  <Select id={"rank-input-" + cardNum} value={getRank(userHand, cardNum)} onChange={(e) => setRank(e.target.value, userHand, setUserHand, cardNum)}>
    {genRanks(cardNum, userHand)}
  </Select>
)

const CardArea = ({ setUserHand, cardNum, userHand }) => (
  <div>
    <SuitDropDown setUserHand={setUserHand} cardNum={cardNum} userHand={userHand} />
    <RankDropDown setUserHand={setUserHand} cardNum={cardNum} userHand={userHand} />
  </div>
);

const getPicture = (card, card_width) => {
  const name = cardToName(card)

  const path = `${svg}#${name}`
  return <svg width={170} height={245} transform={card_width}><use xlinkHref={path} /></svg>
}

const App = () => {
  const [userHand, setUserHand] = useState(defaultUserHand);
  const { height, width } = useWindowDimensions();
  var card_ratio
  if (width > 800) { card_ratio = 800 / 1000; } // avoid card being too large
  else { card_ratio = (width / 1000) }
  const card_width = "scale(" + (card_ratio.toString()) + ")"

  return (
    <div className="App">
      <h1>Preflop Pro</h1>
      <div className="row justify-content-center">
        <div className="col-3">
          <h4>Card 1</h4>
          {getPicture(userHand.card1, card_width)}
          <CardArea setUserHand={setUserHand} cardNum={1} userHand={userHand} />
        </div>
        <div className="col-3">
          <h4>Card 2</h4>
          {getPicture(userHand.card2, card_width)}
          <CardArea setUserHand={setUserHand} cardNum={2} userHand={userHand} />
        </div>
      </div>

      <h1>Action: {HandToDecision(userHand)}!</h1>
    </div >
  );
}


export default App;
