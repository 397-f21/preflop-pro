import { cardToName, HandToDecision, genRanks, getRank, setRank, genSuits, getSuit, setSuit, useWindowDimensions } from './Globals.js'
import React, { useState, useEffect } from 'react';
import './App.css';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import svg from "./svg-cards/svg-cards.svg";
import styled from 'styled-components';
import { Container, Button, Link, lightColors, darkColors } from 'react-floating-action-button';
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

const Select = styled.select`
  width: 50%;
  height: 2em;
  background: white;
  color: gray;
  padding-left: 5px;
  padding-top: 0px;
  font-size: 14px;
  border: none;
  margin-left: 0px;
  margin-top: 0px;
  text-align: top;

  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    min-width: 50em;
    padding: 0px 2px 1px;
  }
`;

const suits = ['C', 'D', 'H', 'S']

const defaultUserHand = {
  "card1": { "value": '2', "suit": 'D' },
  "card2": { "value": '7', "suit": 'H' }
}

const getCardFromHand = (hand, cardNum) => {
  return hand["card" + cardNum];
}

const StyledSelect = styled("select");

const SuitDropDown = ({ setUserHand, cardNum, userHand }) => {
  const [suitOptionList, setSuitOptionList] = useState(genSuits(cardNum, userHand));
  useEffect(() => {
    setSuitOptionList(genSuits(cardNum, userHand))
  }, [userHand, cardNum]);
  return (
    <select class="form-select mb-1 mx-1" id={"suit-input-" + cardNum} value={getSuit(userHand, cardNum)} onChange={(e) => { setSuit(e.target.value, userHand, setUserHand, cardNum) }}>
      {suitOptionList}
    </select>
  );
}

const RankDropDown = ({ setUserHand, cardNum, userHand }) => (
  <select class="form-select mb-1 mx-1" id={"rank-input-" + cardNum} value={getRank(userHand, cardNum)} onChange={(e) => setRank(e.target.value, userHand, setUserHand, cardNum)}>
    {genRanks(cardNum, userHand)}
  </select>
)

const CardArea = ({ setUserHand, cardNum, userHand }) => (
  <div class="btn-group">
    <SuitDropDown setUserHand={setUserHand} cardNum={cardNum} userHand={userHand} />
    <RankDropDown setUserHand={setUserHand} cardNum={cardNum} userHand={userHand} />
  </div>
);

const cardClicked = (cardNum, setMode, setCardToSet) => {
  setMode("suit");
  setCardToSet(cardNum);
}

const suitClicked = (suit, userHand, setUserHand, cardNum, setMode) => {
  setMode("val");
  setSuit(suit, userHand, setUserHand, cardNum)
}

const getPicture = (card, card_width, cardNum, setMode, setCardToSet) => {
  const name = cardToName(card)

  const path = `${svg}#${name}`
  return <svg width={170} height={245} transform={card_width}><use xlinkHref={path} /></svg>
}

const SuitButton = ({ suit, userHand, setUserHand, cardNum, setMode }) => {
  return (
    <button type="button" class="btn btn-outline-light btn-lg"
      onClick={() => suitClicked(suit, userHand, setUserHand, cardNum, setMode)} />
  );
}


const App = () => {
  const [userHand, setUserHand] = useState(defaultUserHand);
  // modes (what screen we're on): main for main screen, suit for selecting suit, val for selecting value
  const [mode, setMode] = useState("main");
  const [cardToSet, setCardToSet] = useState(0); // 0 is neither, 1 is 1, 2 is 2

  const { height, width } = useWindowDimensions();
  var card_ratio
  if (width > 800) { card_ratio = 800 / 1000; } // avoid card being too large
  else if (width < 650) { card_ratio = 650 / 1000; } // avoid card being too small
  else { card_ratio = (width / 1000) }
  const card_width = "scale(" + (card_ratio.toString()) + ")"

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  let screen = (
    <div className="MainScreen">
      <Container>
        <Button
          tooltip="About Texas Hold'em"
          icon="fa fa-info fa-lg"
          onClick={handleShow}
        />
        <Button
          tooltip="Add user link"
          icon="fa fa-user-plus" />
        <Button
          tooltip="Help!"
          icon="fa fa-question fa-2x"
          styles={{ backgroundColor: "#f5f5f5D9", color: "#1c3327" }}
        // rotate={true}
        // onClick={() => alert('FAB Rocks!')}
        />

        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>About Texas Hold'em</Modal.Title>
          </Modal.Header>
          <Modal.Body>Texas Hold'em is a game of poker where two cards are dealt face down to each player,
            and then five community cards are dealt face up in three stages.</Modal.Body>
          <Modal.Footer>
            <a href="https://www.pokernews.com/poker-rules/texas-holdem.htm"
              className="btn btn-primary" role="button" target="_blank">Learn More</a>
            <button type="button" class="btn btn-secondary" onClick={handleClose}>
              Close
            </button>
          </Modal.Footer>
        </Modal>
      </Container>

      <br />
      <h1>Preflop Pro</h1>
      <h4><i>"The best way to learn Texas Hold 'Em Poker!"</i></h4>
      <br />
      <h5>Select the two cards in your hand:</h5>
      <br />
      <div className="row justify-content-center">
        <div className="col-6 col-sm-4 col-md-3">
          <h4>Card 1</h4>
          {getPicture(userHand.card1, card_width, 1, setMode, setCardToSet)}
          <br />
          <CardArea setUserHand={setUserHand} cardNum={1} userHand={userHand} />
        </div>
        <div className="col-6 col-sm-4 col-md-3">
          <h4>Card 2</h4>
          {getPicture(userHand.card2, card_width, 2, setMode, setCardToSet)}
          <br />
          <CardArea setUserHand={setUserHand} cardNum={2} userHand={userHand} />
        </div>
      </div>
      <br />
      <h1>Action: {HandToDecision(userHand)}!</h1>
    </div>);

  if (mode === "suit") {
    screen = (
      <div className="SuitScreen">
        {/* 4 suits laid out as buttons. onClick for each button will save suit somehow & move to val screen*/}
        {suits.map((suit) => <SuitButton suit={suit} userHand={userHand} setUserHand={setUserHand} cardNum={cardToSet} setMode={setMode}>{suit}</SuitButton>)}
      </div>
    );
  }
  else if (mode === "val") {
    screen = (
      <div className="ValScreen">
        Val screen!
      </div>
    );
  }

  return (
    <div className="App">
      {screen}

    </div >
  );
}


export default App;
