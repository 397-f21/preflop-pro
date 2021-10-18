const positions = [
  ['SB', 0],
  ['BB', 1],
  ['BTN', 9],
  ['CO', 8],
  ['UTG', 2],
  ['LJ', 6],
  ['HJ', 7],
  ['UTG1', 3],
  ['UTG2', 4],
  ['UTG3', 5]
];

export const NumPlayersDropdown = ({ numPlayers, setNumPlayers, setSeat }) => (
  // onChange will need more logic. if you go from 9 players to 2, then only 2 options for positions
  // i.e. it would be bad to be "UTG" in 9-handed, and then "UTG" in 2-handed (which shouldn't happen!)
  <select className="form-select mb-1 mx-1" id={"num-players-dropdown"} value={numPlayers}
    onChange={(e) => { setNumPlayers(e.target.value); setSeat("SB"); }}>
    <option value={2} key="2">2</option>
    <option value={3} key="3">3</option>
    <option value={4} key="4">4</option>
    <option value={5} key="5">5</option>
    <option value={6} key="6">6</option>
    <option value={7} key="7">7</option>
    <option value={8} key="8">8</option>
    <option value={9} key="9">9</option>
    <option value={10} key="10">10</option>
  </select>
);

// will return an array of positions (in order of how they're seated at table, starting with SB)
const getSeats = (numPlayers) => {
  const tempPositions = positions.slice(0, numPlayers);
  tempPositions.sort((el1, el2) => (el1[1] < el2[1] ? -1 : 1));
  return tempPositions.map(el => el[0]);
};

// changes the position/seat for the next hand
// export const NextHand = (seat, setSeat) => {
// }

// returns option components for PositionDropdown
const genSeats = (numPlayers) => (
  getSeats(numPlayers).map(seat => (
    <option value={seat} key={seat}>{seat}</option>
  ))
);

export const PositionDropdown = ({ numPlayers, seat, setSeat }) => (
  <select className="form-select mb-1 mx-1" id={"seat-dropdown"} value={seat} onChange={(e) => setSeat(e.target.value)}>
    {genSeats(numPlayers)}
  </select>
);