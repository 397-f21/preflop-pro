import logo from './logo.svg';
import './App.css';

const userHand = { 
  "card1": { "value" : 'A', "suit" : 'H'}, 
  "card2": { "value" : 'A', "suit" : 'D'},
  
}

const handToDecision = (hand) => {
  
  return "Fold";
}

const valToIndex = {
	'A' : 0,
	'K' : 1,
	'Q' : 2,
	'J' : 3,
	'T' : 4,
	'9' : 5,
	'8' : 6,
	'7' : 7,
	'6' : 8,
	'5' : 9,
	'4' : 10,
	'3' : 11,
	'2' : 12,
}

const handChart = [
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]


const App = () => {
  return (
    <div className="App">
      <h1>Card 1: {userHand.card1.value}{userHand.card1.suit}</h1>
      <h1>Card 2: {userHand.card2.value}{userHand.card2.suit}</h1>
      <h1>Action: {handToDecision(userHand)}!</h1>
    </div>
  );
}

export default App;
