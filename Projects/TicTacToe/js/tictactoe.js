// Keeps track of whose turn it is
let activePlayer = 'X';
// this array stores an array of moves. We use this to determine win conditions.
let selectedSlots = [];

// This function is for placing x or o in a slot.
function placeXorO(squareNumber) {
    // this condition ensures a square hasnt been selected already.
    // the .some() method is used to check each element of selectedSlots array
    // to see if it contains the square number clicked on
    if (!selectedSlots.some(element => element.includes(squareNumber))) {
        //this Variable retrieves the HTML element id that was clicked
        let select = document.getElementById(squareNumber);
        // this condition checks who's turn it is
        if (activePlayer === 'X') {
            //if activePlayer is equal to "X", the x.png is placed in HTML
            select.style.backgroundColor = "red";
            // active player may only be "X" or "O"so, if not "X" it must be "O"
        } else {
            // If activePlayer is equal to "O", the o.png is placed in HTML
            select.style.backgroundColor = "blue";
        }
        // squareNumber and ActivePlayer are concatenated together and added to array
        selectedSlots.push(squareNumber + activePlayer);
        // this calls a function to check for any win conditions
        checkWinConditions();
        // this condition is for changing the active player
        if (activePlayer === 'X') {
            // if active player is "X" change it to "O"
            activePlayer = 'O';
            // if activePlayer is anythign other than "X"
        } else {
            // Change the activePlayer to "X"
            activePlayer = 'X';
        }
        // plays a placement sound
        audio("media/place.mp3");
        // this condition checks to see if it is the computers turn
        if (activePlayer === 'O') {
            // This function disables clicking if it is the comupters turn
            disableClick();
            // this function waits 1 second before the computer places an image and enables click
            setTimeout(function () { computersTurn();}, 1);
        }
        // returning true is needed for computersTurn() function to work.
        return true;
    }
    // This function results in a random square being selected by the computer.
    function computerTurn() {
        // this boolean is needed for our while loop
        let success = false;
        // this variable stores a random number 0-8
        let pickASlot;
        // this condition allows our while loop to keep trying if a square is selected already
        while (!success) {
            // a random number between 0-8 is selected
            pickASlot = String(Math.floor() * 9);
            // if the random number evalutated returns true, the slot hasnt been selected yet
            if (placeXorO(pickASlot)) {
                // this line calls the function
                placeXorO(pickASlot);
                // this changes our boolean and ends the loop.
                return true;
            };
        }
    }
}