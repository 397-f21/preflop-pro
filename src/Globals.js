const ranks = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']
const suits = ['C', 'D', 'H', 'S']

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

const valToName = {
    'A': "1",
    'K': "king",
    'Q': "queen",
    'J': "jack",
    'T': "10",
    '9': "9",
    '8': "8",
    '7': "7",
    '6': "6",
    '5': "5",
    '4': "4",
    '3': "3",
    '2': "2",
}

const suitToName = {
    'C': "club",
    'D': "diamond",
    'H': "heart",
    'S': "spade"
}

export const cardToName = (card) => {
    return suitToName[card.suit] + "_" + valToName[card.value] 
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

export function HandToDecision(hand) {
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

export const genRanks = (cardNum, userHand) => {
    if (cardNum === 1) {
      return ranks.filter(r => !((r === userHand.card2.value) && (userHand.card1.suit === userHand.card2.suit))).map((curr) => <option value={curr}>{curr}</option>)
    } 
    return ranks.filter(r => !((r === userHand.card1.value) && (userHand.card1.suit === userHand.card2.suit))).map((curr) => <option value={curr}>{curr}</option>)
}

export const getRank = (userHand, cardNum) => {
    if (cardNum === 1) {
      return userHand.card1.value;
    } 
    return userHand.card2.value;
}
  
export const setRank = (val, userHand, setUserHand, cardNum) => {
    if (cardNum === 1) {
      setUserHand({"card1": {"value": val, "suit": userHand.card1.suit}, "card2": userHand.card2})
    } else {
      setUserHand({"card2": {"value": val, "suit": userHand.card2.suit}, "card1": userHand.card1})
    }
}

const suitsToEmojiJSX = {
    'C': <option value="C">&#9827;</option>,
    'D': <option value="D">&#9830;</option>,
    'H': <option value="H">&hearts;</option>,
    'S': <option value="S">&#9824;</option>,
}

export const genSuits = (cardNum, userHand) => {
    if (userHand.card1.value === userHand.card2.value) {
        if (cardNum === 1) {
            return suits.filter(s => s !== userHand.card2.suit).map(s => suitsToEmojiJSX[s])
        }
        return suits.filter(s => s !== userHand.card1.suit).map(s => suitsToEmojiJSX[s])
    }
    return suits.map(suit => suitsToEmojiJSX[suit])
}
  
export const getSuit = (userHand, cardNum) => {
    if (cardNum === 1) {
      return userHand.card1.suit;
    } 
    return userHand.card2.suit;
}
  
export const setSuit = (suit, userHand, setUserHand, cardNum) => {
    if (cardNum === 1) {
      setUserHand({"card1": {"value": userHand.card1.value, "suit": suit}, "card2": userHand.card2})
    } else {
      setUserHand({"card2": {"value": userHand.card2.value, "suit": suit}, "card1": userHand.card1})
    }
}

export default {cardToName, HandToDecision, genRanks, getRank, setRank, genSuits, getSuit, setSuit};