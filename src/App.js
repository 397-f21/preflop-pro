import logo from './logo.svg';
import './App.css';

const userHand = { 
  "card1": { "value" : 'A', "suit" : 'H'}, 
  "card2": { "value" : 'A', "suit" : 'D'}
}

function App() {
  return (
    <div className="App">
      <h1>Card 1: {userHand.card1.value}{userHand.card1.suit}</h1>
      <h1>Card 2: {userHand.card2.value}{userHand.card2.suit}</h1>
      <h1>Action: Raise!</h1>
    </div>
  );
}

export default App;
