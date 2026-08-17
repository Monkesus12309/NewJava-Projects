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
            select.style.backgroundImage = 'url("images/x.png")';
            // active player may only be "X" or "O"so, if not "X" it must be "O"
        } else {
            // If activePlayer is equal to "O", the o.png is placed in HTML
            select.style.backgroundImage = 'url("images/o.png")';
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
        audio("media/place.wav");
        // this condition checks to see if it is the computers turn
        if (activePlayer === 'E') { // E is set to disable timer between turns due to no computer playing
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

function checkWinConditions() {
    // X 0, 1, 2 condition.
    if (arrayIncludes("0X", "1X", "2X")) { drawWinLine(50, 100, 558, 100)}

    // X 3, 4, 5 condition.
    else if (arrayIncludes("3X", "4X", "5X")) { drawWinLine(50, 304, 558, 304)}

    // X 6, 7, 8 condition.
    else if (arrayIncludes("6X", "7X", "8X")) { drawWinLine(50, 508, 558, 508)}

    // X 0, 3, 6 condition.
    else if (arrayIncludes("0X", "3X", "6X")) { drawWinLine(100, 50, 100, 558)}

    // X 1, 4, 7 condition.
    else if (arrayIncludes("1X", "4X", "7X")) { drawWinLine(304, 50, 304, 558)}

    // X 2, 5, 8 condition.
    else if (arrayIncludes("2X", "5X", "8X")) { drawWinLine(508, 50, 508, 558)}

    // X 6, 4, 2 condition.
    else if (arrayIncludes("6X", "4X", "2X")) { drawWinLine(100, 508, 510, 90)}

    // X 0, 1, 2 condition.
    else if (arrayIncludes("0X", "4X", "8X")) { drawWinLine(100, 100, 520, 520)}


    // O 0, 1, 2 condition.
    else if (arrayIncludes("0O", "1O", "2O")) { drawWinLine(50, 100, 558, 100)}

    // O 3, 4, 5 condition.
    else if (arrayIncludes("3O", "4O", "5O")) { drawWinLine(50, 304, 558, 304)}

    // O 6, 7, 8 condition.
    else if (arrayIncludes("6O", "7O", "8O")) { drawWinLine(50, 508, 558, 508)}

    // O 0, 3, 6 condition.
    else if (arrayIncludes("0O", "3O", "6O")) { drawWinLine(100, 50, 100, 558)}

    // O 1, 4, 7 condition.
    else if (arrayIncludes("1O", "4O", "7O")) { drawWinLine(304, 50, 304, 558)}

    // O 2, 5, 8 condition.
    else if (arrayIncludes("2O", "5O", "8O")) { drawWinLine(508, 50, 508, 558)}

    // O 6, 4, 2 condition.
    else if (arrayIncludes("6O", "4O", "2O")) { drawWinLine(100, 508, 510, 90)}

    // O 0, 1, 2 condition.
    else if (arrayIncludes("0O", "4O", "8O")) { drawWinLine(100, 100, 520, 520)}

    // this condition checks for a tie.
    // if 9 slots are selected then execute this code
    else if (selectedSlots.length >= 9) {
        audio('./media/tieGame.wav')
        document.getElementById("winText").textContent = 'TIE';
        document.getElementById("winText").style.display = 'block'; // displays win text
        setTimeout(function () {audio('./media/tieGame.wav'), resetGame();}, 2000);
    }

    //This Function checks if an array includes 3 strings. It is used to check for each win condition.
    function arrayIncludes(squareA, squareB, squareC) {
        // These 3 Variables will be used to check for 3 in a row.
        const a = selectedSlots.includes(squareA);
        const b = selectedSlots.includes(squareB);
        const c = selectedSlots.includes(squareC);
        // If the 3 variables we pass are all included in our array then true is returned and our else if condition executes the drawLine() function.
        if (a === true && b === true && c === true) { return true;}
    }
}


function drawWinLine(coordX1, coordY1, coordX2, coordY2) {
    const canvas = document.getElementById('win-lines');
    // this line gives us access to methods and properties to use on canvas
    const c = canvas.getContext('2d');

    let x1 = coordX1,
        y1 = coordY1,
        x2 = coordX2,
        y2 = coordY2,
        x = x1,
        y = y1;

        function animateLineDrawing() {
            // this variable creates a loop
            const animationLoop = requestAnimationFrame(animateLineDrawing);
            // This method clears content from the last loop iteration.
            c.clearRect(0, 0, 608, 608)

            c.beginPath();
            c.moveTo(x1, y1);
            c.lineTo(x, y);
            c.lineWidth = 10;
            c.strokeStyle = "rgba(70, 255, 33, .8)";
            c.stroke();
            
            // This condition checks if we've reached the endpoints
            if (x1 <= x2 && y1 <= y2) {
                // This condition adds 10 to the previous end x endpoint.
                if (x < x2) { x += 10;}
                // this condition adds 10 to the previous end y endpoint.
                if (y < y2) { y += 10;}
                //this condition is similar to the one above.
                // this is necessary for the 6, 4, 2 wind condition.
                if (x >= x2 && y >= y2) { cancelAnimationFrame(animationLoop); }
            }
            // this condition is similar to the one above.
            // this is necessary for the 6, 4, 2 win coniditon.
            if (x1 <= x2 && y1 >= y2) {
                if (x <x2) { x += 10;}
                if (y > y2) { y -= 10;}
                if (x >= x2 && y <= y2) { cancelAnimationFrame(animationLoop); }
            }
        }

        function clearBoard() {
            // this line starts our animation loop.
            c.clearRect(0, 0, 608, 608);
            cancelAnimationFrame(animationLoop);
        }

        // this line disallows clicking while the win sound is playing
        disableClick();
        // this line plays the win sounds.
        audio('./media/winGame.wav');
        document.getElementById("winText").textContent = 'YOU WIN!';
        document.getElementById("winText").style.display = 'block'; // displays win text
        // this line calls our main animation loop.
        animateLineDrawing();
        // This line waits 1 second. then, clears canvas, resets game and allows clicking again.
        setTimeout(function () { resetGame(); clearBoard();}, 3000);
}


function resetGame() {
    // this loop iterates through each HTML slot element.
    for (let i = 0; i < 9; i++) {
        let slot = document.getElementById(String(i));
        slot.style.backgroundImage = '';
        document.getElementById("winText").style.display = 'none'; // hides win text
    }
    selectedSlots = [];
}


function disableClick() {
    // This makes our body unclickable.
    body.style.pointerEvents = 'none';
    setTimeout(function () { body.style.pointerEvents = 'auto';}, 3000);
}

function audio(audioURL) {
    let audio = new Audio(audioURL);
    audio.play();
}

