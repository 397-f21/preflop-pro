import {cardToName, HandToDecision, genRanks, getRank, setRank, genSuits, getSuit, setSuit} from './Globals.js'
import React, { useState } from 'react';
import { render } from 'react-dom';
import { ReactSVG } from 'react-svg';
import './App.css';
import svg from "./svg-cards/svg-cards.svg";

const defaultUserHand = {
  "card1": { "value": '2', "suit": 'D' },
  "card2": { "value": '7', "suit": 'H' }
}

const SuitDropDown = ({setUserHand, cardNum, userHand}) => (
  <select id={"suit-input-"+cardNum} value={getSuit(userHand, cardNum)} onChange = {(e) => setSuit(e.target.value, userHand, setUserHand, cardNum)}>
    {genSuits(cardNum, userHand)}
  </select>
)

const RankDropDown = ({setUserHand, cardNum, userHand}) => (
  <select id={"rank-input-"+cardNum} value={getRank(userHand, cardNum)} onChange = {(e) => setRank(e.target.value, userHand, setUserHand, cardNum)}>
    {genRanks(cardNum, userHand)}
  </select>
)

const CardArea = ({setUserHand, cardNum, userHand}) => (
	<div>
		<SuitDropDown setUserHand = {setUserHand} cardNum = {cardNum} userHand = {userHand} />
		<RankDropDown setUserHand = {setUserHand} cardNum = {cardNum} userHand = {userHand} />
	</div>
);

const getPicture = (card) => {
  const name = cardToName(card)
  const path = `${svg}#${name}`

  return <svg width={170} height={245} transform={"scale(0.9)"}><use xlinkHref={path} /></svg>
}

const App = () => {
  const [userHand, setUserHand] = useState(defaultUserHand);
  
  return (
    <div className="App">
	    <h1>Preflop Pro</h1>
      <CardArea setUserHand = {setUserHand} cardNum={1} userHand = {userHand}/>
	    <CardArea setUserHand = {setUserHand} cardNum={2} userHand = {userHand}/>
      {getPicture(userHand.card1)}
      {getPicture(userHand.card2)}
      <ReactSVG path={`${svg}#black_joker`} evalScripts="always" svgClassName="svg-class-name" className="wrapper-class-name" svgStyle={{width: 200}}/>
      <h1>Action: {HandToDecision(userHand)}!</h1>
    </div>
  );
}


export default App;
