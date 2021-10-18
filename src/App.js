import { cardToName, HandToDecision, genRanks, getRank, setRank, genSuits, getSuit, setSuit, useWindowDimensions } from './Globals.js'
import { PositionDropdown, NumPlayersDropdown, NextHandButton } from './utilities/Positioning';
import React, { useState, useEffect } from 'react';
import './App.css';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import svg from "./svg-cards/svg-cards.svg";
import Modal from "react-bootstrap/Modal";
import { Nav, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const suits = ['C', 'D', 'H', 'S']

const defaultUserHand = {
  "card1": { "value": '2', "suit": 'D' },
  "card2": { "value": '7', "suit": 'H' }
}

const getCardFromHand = (hand, cardNum) => {
  return hand["card" + cardNum];
}

const SuitDropDown = ({ setUserHand, cardNum, userHand }) => {
  const [suitOptionList, setSuitOptionList] = useState(genSuits(cardNum, userHand));
  useEffect(() => {
    setSuitOptionList(genSuits(cardNum, userHand))
  }, [userHand, cardNum]);
  return (
    <select className="form-select mb-1 mx-1" id={"suit-input-" + cardNum}
      value={getSuit(userHand, cardNum)} onChange={(e) => { setSuit(e.target.value, userHand, setUserHand, cardNum) }}>
      {suitOptionList}
    </select>
  );
}

const RankDropDown = ({ setUserHand, cardNum, userHand }) => (
  <select className="form-select mb-1 mx-1" id={"rank-input-" + cardNum}
    value={getRank(userHand, cardNum)} onChange={(e) => setRank(e.target.value, userHand, setUserHand, cardNum)}>
    {genRanks(cardNum, userHand)}
  </select>
)

const CardArea = ({ setUserHand, cardNum, userHand }) => (
  <div className="btn-group">
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
    <button type="button" className="btn btn-outline-light btn-lg"
      onClick={() => suitClicked(suit, userHand, setUserHand, cardNum, setMode)} />
  );
}


const App = () => {
  const [userHand, setUserHand] = useState(defaultUserHand);
  // modes (what screen we're on): main for main screen, suit for selecting suit, val for selecting value
  const [mode, setMode] = useState("main");
  const [cardToSet, setCardToSet] = useState(0); // 0 is neither, 1 is 1, 2 is 2

  // seat needs to be implemented into how we reference the chart to give back advice
  // DO THIS IN GLOBAL.JS (HandToDecision(hand, seat))
  const [numPlayers, setNumPlayers] = useState(9);
  const [seat, setSeat] = useState("UTG");

  const { height, width } = useWindowDimensions();
  var card_ratio
  if (width > 800) { card_ratio = 800 / 1000; } // avoid card being too large
  else if (width < 650) { card_ratio = 650 / 1000; } // avoid card being too small
  else { card_ratio = (width / 1000) }
  const card_width = "scale(" + (card_ratio.toString()) + ")"

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  let screen = (
    <div className="MainScreen">
      <Navbar collapseOnSelect expand="false" bg="dark" variant="dark">
        <Navbar.Brand>
          <i id="navLogo" class="fa fa-heart"></i>
          Preflop Pro
        </Navbar.Brand>
        <Navbar.Toggle id="hamburger" aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={handleShow1}>About Texas Hold'Em</Nav.Link>
            <Nav.Link onClick={handleShow2}>App Logic</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <br />
      <h1>Preflop Pro</h1>
      <h4><i>"The best way to learn Texas Hold 'Em Poker!"</i></h4>
      <br />

      <div className="form-group row justify-content-center">
        <label for="numPlayers" className="col-6 col-sm-4 col-md-3 col-lg-2 col-form-label">Select Players:</label>
        <div className="col-4 col-sm-4 col-md-3 col-lg-2">
          <NumPlayersDropdown id="numPlayers" numPlayers={numPlayers} setNumPlayers={setNumPlayers} seat={seat} setSeat={setSeat} />
        </div>
      </div>
      <div className="form-group row justify-content-center">
        <label for="position" className="col-6 col-sm-4 col-md-3 col-lg-2 col-form-label">Select Position:</label>
        <div className="col-4 col-sm-4 col-md-3 col-lg-2">
          <PositionDropdown id="position" numPlayers={numPlayers} seat={seat} setSeat={setSeat} />
        </div>
      </div>
      <br />
      <NextHandButton numPlayers={numPlayers} seat={seat} setSeat={setSeat} />
      <br />
      <div className="row justify-content-center">
        <div className="col-6 col-sm-4 col-md-4 col-lg-2">
          <label for="card1">Select Card 1:</label>
          <div id="card1">{getPicture(userHand.card1, card_width, 1, setMode, setCardToSet)}</div>
          <br />
          <CardArea setUserHand={setUserHand} cardNum={1} userHand={userHand} />
        </div>
        <div className="col-6 col-sm-4 col-md-4 col-lg-2">
          <label for="card2">Select Card 2:</label>
          <div id="card2">{getPicture(userHand.card2, card_width, 2, setMode, setCardToSet)}</div>
          <br />
          <CardArea setUserHand={setUserHand} cardNum={2} userHand={userHand} />
        </div>
      </div>
      <br />
      <h1>Action: {HandToDecision(userHand, seat)}!</h1>

      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header>
          <Modal.Title>About Texas Hold'em</Modal.Title>
        </Modal.Header>
        <Modal.Body>Texas Hold'em is a game of poker where two cards are dealt face down to each player,
          and then five community cards are dealt face up in three stages.</Modal.Body>

        <Modal.Body>Start by select number of players, then your position.
          Put 2 cards that are in your hand. Check which action to take!</Modal.Body>
        <Modal.Footer>
          <a href="https://www.pokernews.com/poker-rules/texas-holdem.htm"
            className="btn btn-primary" role="button"
            rel="noreferrer" target="_blank">Learn More</a>
          <button type="button" className="btn btn-secondary" onClick={handleClose1}>
            Close
          </button>
        </Modal.Footer>
      </Modal>

      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header>
          <Modal.Title>App Logic</Modal.Title>
        </Modal.Header>
        <Modal.Body>This web app assumes that the player is short-stacked, with 15 blinds (or 15% of a typical buy-in). 
          Player is not guaranteed to profit based on advice, but should certainly think about folding when advised!</Modal.Body>
        <Modal.Footer>
          <a href="https://www.pokernews.com/poker-rules/texas-holdem.htm"
            className="btn btn-primary" role="button"
            rel="noreferrer" target="_blank">Learn More</a>
          <button type="button" className="btn btn-secondary" onClick={handleClose2}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );

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
