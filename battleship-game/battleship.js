let view = {
    displayMessage(msg) {
        // code to display a message
        let messageArea = document.getElementById("messageArea");
        messageArea.innerHTML = msg;
    },
    displayHit(location) {
        // code to display a successful hit
        let cell = document.getElementById(location);
        cell.setAttribute("class", "hit");
    },
    displayMiss(location) {
        // code to display a miss
        let cell = document.getElementById(location);
        cell.setAttribute("class", "miss");
    }
};





/*
let ship1 = {
    locations: ["10", "20", "30"], 
    hits: ["", "", ""]
};

let ship2 = {
    locations: ["32", "33", "34"], 
    hits: ["", "", ""]
};

let ship3 = {
    locations: ["63", "64", "65"], 
    hits: ["", "", "hit"]
};
*/

let model = {
    boardSize: 7,
    numShips: 3,
    shipsSunk: 0,
    shipLength: 3,
    ships: [ { locations: [0, 0, 0], hits: ["", "", ""] },
            { locations: [0, 0, 0], hits: ["", "", ""] },
            { locations: [0, 0, 0], hits: ["", "", ""] },
],

fire(guess) {
    for (let i = 0; i < this.numShips; i++) {
        let ship = this.ships[i];
        let index = ship.locations.indexOf(guess);
        if (index >= 0) {
            // we have a hit!
            ship.hits[index] = "hit";
            view.displayHit(guess);
            view.displayMessage("HIT!");
            if (this.isSunk(ship)) {
                view.displayMessage("You sank my Battleship!");
                this.shipsSunk++;
            }
            return true;
        }   
    }
    view.displayMiss(guess);
    view.displayMessage("You Missed!");
    return false;
},
    
isSunk(ship) {
    return(!ship.hits.includes(""));
},

generateShipLocations() {
    let locations;
    for (let i = 0; i < this.numShips; i++) {
        do {
            locations = this.generateShip();
        } while (this.collision(locations));
        this.ships[i].locations = locations;
    }
},

generateShip() {
        let direction = Math.floor(Math.random() * 2);
        let row;
        let col;
        if (direction === 1) {
            // generate a starting location for a horizontal ship
            row = Math.floor(Math.random() * this.boardSize);
            col = Math.floor(Math.random() * (this.boardSize - (this.shipLength + 1)));
        } else {
            // generate a starting location for a vertical ship
            row = Math.floor(Math.random() * (this.boardSize - (this.shipLength +1)));
            col = Math.floor(Math.random() * this.boardSize);
        }
        
        let newShipLocations = [];
            for (let i = 0; i < this.shipLength; i++) {
                if (direction === 1) {
                    // add location to array for new horizontal ship
                    newShipLocations.push(`${row}${(col + i)}`);
                } else {
                    // add location to array for new vertical ship
                    newShipLocations.push(`${(row +i)}${col}`);
                }
            }
        return newShipLocations;
    },
    
collision(locations) {
    for (let i = 0; i < this.numShips; i++) {
        let ship = this.ships[i];
        for (let j = 0; j < locations.length; j++) {
            if (ship.locations.includes(locations[j])) {
                return true;
            }
        }
    }
    return false;
}
};

/*
model.fire("53");
model.fire("34");
model.fire("24");
model.fire("44");
*/


function parseGuess(guess){
    const alphabet = ["A","B","C","D","E","F","G"];
    
    if (guess === null || guess.length !==2){
        alert("OPPS! Please enter a valid letter and number on the board.");
    } else {
        let firstChar = guess.charAt(0);
        let row = alphabet.indexOf(firstChar);
        let column = guess.charAt(1);
        
        if (isNaN(column)) {
            alert("This is not a valid board location!");
        } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
            alert("That's not on the board!");
        } else {
            return row + column;
        }
    }
    return null;
}

let controller = {
    guesses: 0,
    
    processGuess(guess) {
        let location = parseGuess(guess);
        if (location) {
            // other things here
            this.guesses++;
            let hit = model.fire(location);
            
            if (hit && model.shipsSunk === model.numShips) {
                view.displayMessage('You sank all my battleships in ' + this.guesses + ' guesses');
            }
        }
    }
};

function handleFireButton() {
    let guessInput = document.getElementById("guessInput");
    let guess = guessInput.value;
    controller.processGuess(guess);
    guessInput.value = "";
}
 
function init() {
    let fireButton = document.getElementById("fireButton");
    fireButton.onclick = handleFireButton;
    let guessInput = document.getElementById("guessInput");
    guessInput.onkeypress = handleKeyPress;
    
    model.generateShipLocations();
}

window.onload = init;

function handleKeyPress(e) {
    let fireButton = document.getElementById("fireButton");
    if (e.keyCode === 13) {
        fireButton.click();
        return false;
    }
}


/*
console.log(parseGuess("A0"));
console.log(parseGuess("H8"));
*/
















