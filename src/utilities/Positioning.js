const positions = ['SB', 'BB', 'UTG', 'UTG1', 'UTG2', 'UTG3', 'LJ', 'HJ', 'CO', 'BTN'];

/*
SB
BB
BTN
UTG

*/
export const NumPlayersDropdown = (numPlayers, setNumPlayers) => (
    // onChange will need more logic. if you go from 9 players to 2, then only 2 options for positions
    // i.e. it would be bad to be "UTG" in 9-handed, and then "UTG" in 2-handed (which shouldn't happen!)
    <select class="form-select mb-1 mx-1" id={"num-players-dropdown"} value={numPlayers} onChange={(e) => setNumPlayers(e.target.value)}>
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
    
};

// changes the position/seat for the next hand
export const NextHand = (seat, setSeat) => {

}

// returns option components for PositionDropdown
const genSeats = (numPlayers) => {

}

export const PositionDropdown = (numPlayers, seat, setSeat) => (
    <select class="form-select mb-1 mx-1" id={"seat-dropdown"} value={seat} onChange={(e) => setSeat(e.target.value)}>
        {genSeats(numPlayers)}
    </select>
);