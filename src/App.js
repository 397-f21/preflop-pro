import logo from './logo.svg';
import {HandToDecision, getRank, setRank, getSuit, setSuit} from './Globals.js'
import React, { useState } from 'react';
import './App.css';
import { getByDisplayValue } from '@testing-library/dom';

const defaultUserHand = {
  "card1": { "value": '2', "suit": 'D' },
  "card2": { "value": '7', "suit": 'H' }
}

const SuitDropDown = ({setUserHand, cardNum, userHand}) => (
  <select id={"suit-input-"+cardNum} value={getSuit(userHand, cardNum)} onChange = {(e) => setSuit(e.target.value, userHand, setUserHand, cardNum)}>
    <option value="C">&#9827;</option>
    <option value="D">&#9830;</option>
    <option value="H">&hearts;</option>
    <option value="S">&#9824;</option>
  </select>
)

const RankDropDown = ({setUserHand, cardNum, userHand}) => (
  <select id={"rank-input-"+cardNum} value={getRank(userHand, cardNum)} onChange = {(e) => setRank(e.target.value, userHand, setUserHand, cardNum)}>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    <option value="6">6</option>
    <option value="7">7</option>
    <option value="8">8</option>
    <option value="9">9</option>
    <option value="J">J</option>
    <option value="Q">Q</option>
    <option value="K">K</option>
    <option value="A">A</option>
  </select>
)

const CardArea = ({setUserHand, cardNum, userHand}) => (
	<div>
		<SuitDropDown setUserHand = {setUserHand} cardNum = {cardNum} userHand = {userHand} />
		<RankDropDown setUserHand = {setUserHand} cardNum = {cardNum} userHand = {userHand} />
	</div>
);

const App = () => {
  const [userHand, setUserHand] = useState(defaultUserHand);
  
  return (
    <div className="App">
	    <h1>Preflop Pro :)</h1>
      <CardArea setUserHand = {setUserHand} cardNum={1} userHand = {userHand}/>
	    <CardArea setUserHand = {setUserHand} cardNum={2} userHand = {userHand}/>
      <img src={'./cards/1B.svg'} width={100} height={200}/>
      <h1>Card 1: {userHand.card1.value}{userHand.card1.suit}</h1>
      <h1>Card 2: {userHand.card2.value}{userHand.card2.suit}</h1>
      <h1>Action: {HandToDecision(userHand)}!</h1>
    </div>
  );
}


export default App;
