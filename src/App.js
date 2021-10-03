import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';

const valToIndex = {
  'A': 0,
  'K': 1,
  'Q': 2,
  'J': 3,
  'T': 4,
  '9': 5,
  '8': 6,
  '7': 7,
  '6': 8,
  '5': 9,
  '4': 10,
  '3': 11,
  '2': 12
}

// https://www.mypokercoaching.com/push-fold-chart/
// Shove - No Ante - 10 BB - Hi-Jack
const handChart = [
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	[1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
	[1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
	[1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
	[1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
	[1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
];

const defaultUserHand = {
  "card1": { "value": 'A', "suit": 'D' },
  "card2": { "value": '3', "suit": 'H' }
}

const handToDecision = (hand) => {
  let indices = ([valToIndex[hand.card1.value], valToIndex[hand.card2.value]]).sort();
  if (hand.card1.suit !== hand.card2.suit) {
    if (handChart[indices[1]][indices[0]]) {
      return "Shove";
    }
    return "Fold";
  }
  if (handChart[indices[0]][indices[1]]) {
    return "Shove";
  }
  return "Fold";
}

const SuitDropDown = ({setUserHand, cardNum, userHand}) => (
  <select id={"suit-input-"+cardNum} onChange = {(e) => setSuit(e.target.value, userHand, setUserHand, cardNum)}>
    <option value="C">&#9827;</option>
    <option value="D">&#9830;</option>
    <option value="H">&hearts;</option>
    <option value="S">&#9824;</option>
  </select>
)

const RankDropDown = ({setUserHand, cardNum, userHand}) => (
  <select id={"rank-input-"+cardNum} onChange = {(e) => setRank(e.target.value, userHand, setUserHand, cardNum)}>
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

const setRank = (val, userHand, setUserHand, cardNum) => {
  if (cardNum === 1) {
    setUserHand({"card1": {"value": val, "suit": userHand.card1.suit}, "card2": userHand.card2})
  } else {
    setUserHand({"card2": {"value": val, "suit": userHand.card2.suit}, "card1": userHand.card1})
  }
}

const setSuit = (suit, userHand, setUserHand, cardNum) => {
  if (cardNum === 1) {
    setUserHand({"card1": {"value": userHand.card1.value, "suit": suit}, "card2": userHand.card2})
  } else {
    setUserHand({"card2": {"value": userHand.card2.value, "suit": suit}, "card1": userHand.card1})
  }
}


const App = () => {
  const [userHand, setUserHand] = useState(defaultUserHand);
  return (
    <div className="App">
	    <h1>Preflop Pro :)</h1>
      <CardArea setUserHand = {setUserHand} cardNum={1} userHand = {userHand}/>
	    <CardArea setUserHand = {setUserHand} cardNum={2} userHand = {userHand}/>
      <h1>Card 1: {userHand.card1.value}{userHand.card1.suit}</h1>
      <h1>Card 2: {userHand.card2.value}{userHand.card2.suit}</h1>
      <h1>Action: {handToDecision(userHand)}!</h1>
    </div>
  );
}


export default App;
