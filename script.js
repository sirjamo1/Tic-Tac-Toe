// const gameboard = (function () {
//     let board = () => {
//     let gameContainer = document.querySelector(".gameboard-container");
//       for (let i = 0; i < 9; i++) {
//        let box = document.createElement("div");
//        gameContainer.appendChild(box);
//        box.setAttribute("id", `box${i}`)
//       }
//     };
//     return { board };
// })();

const playerFactory = (playerName, XorO) => {
    let getPlayerName = () => playerName;
    let printPlayerWins = () =>
        (document.getElementById(
            "winnerText"
        ).innerHTML = `${playerName} wins!`);
    return { getPlayerName, printPlayerWins, XorO, playerName };
};
const gameboardContainer = document.querySelector(".gameboard-container");
const boardFactory = (parentDiv) => {
    let boxes = [];
    for (let i = 0; i < parentDiv.children.length; i++) {
        boxes.push(parentDiv.children[i].textContent);
    }
    return { boxes };
};

//let board = boardFactory(gameboardContainer);
let box0 = gameboardContainer.children[0];
let box1 = gameboardContainer.children[1];
let box2 = gameboardContainer.children[2];
let box3 = gameboardContainer.children[3];
let box4 = gameboardContainer.children[4];
let box5 = gameboardContainer.children[5];
let box6 = gameboardContainer.children[6];
let box7 = gameboardContainer.children[7];
let box8 = gameboardContainer.children[8];
let playerOneName = "Player one";
let playerTwoName = "Player two";
let playerOne = playerFactory(playerOneName, "X");
let playerTwo = playerFactory(playerTwoName, "O");
let startReset = document.getElementById("startReset");
let winningContainer = document.getElementById("winning-container");
let turnCount = 0;
let gameFinished = false
//player one always goes first
// let turnCount = randomNumber();
let aiBtn = document.getElementById("ai-btn");
let aiActive = false;
function randomNumber() {
    return Math.floor(Math.random() * 2);
}
function randomAiBoxIndex(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
startReset.textContent = "Start";

startReset.addEventListener("click", (e) => {
    e.preventDefault();
    reset();
    changeNames();
    const player = turnCount % 2 === 0 ? playerOne : playerTwo;
    document.getElementById(
        "winnerText"
    ).innerHTML = `${player.getPlayerName()}'s turn`;
    whichDiv();
    startReset.textContent = "Reset";
});
function changeNames() {
    (playerOneName =
        document.getElementById("playerOneName").value == ""
            ? "Player one"
            : document.getElementById("playerOneName").value),
        (playerTwoName =
            document.getElementById("playerTwoName").value == ""
                ? "Player two"
                : document.getElementById("playerTwoName").value);

    playerOne = playerFactory(playerOneName, "X");
    playerTwo = playerFactory(playerTwoName, "O");
}
function whichDiv() {
    let children = gameboardContainer.children;
    for (let i = 0; i < children.length; i++) {
        let box = document.getElementById(children[i].id);
        box.style.backgroundColor = "antiquewhite";
        box.addEventListener("click", () => {
            runGame(box, children);
        });
    }
}

//NOTE: ai function runs twice, also if ai spot is taken it stops
function runGame(box, children) {
    board = boardFactory(gameboardContainer);
    let player = turnCount % 2 === 0 ? playerOne : playerTwo;
    let playerNext = turnCount % 2 !== 0 ? playerOne : playerTwo;
    if (aiActive === false) {
        if (box.textContent == "") {
            box.textContent = player.XorO;
            threeInRow(player, playerNext);
        }
    } else if (aiActive === true && player === playerOne) {
        if (box.textContent == "") {
            box.textContent = player.XorO;
            threeInRow(player, playerNext);
            player = playerTwo;
            playerNext = playerOne
           let boxesLeft = anyBoxesLeft(children);
            let num = boxesLeft[Math.floor(Math.random() * boxesLeft.length)];
            console.log(gameFinished)
            let aiBoxSelect = children[num];
            if (aiBoxSelect.textContent === "" && gameFinished === false) {
                setTimeout(() => {
                    aiBoxSelect.textContent = player.XorO;
                    threeInRow(player, playerNext);
                    console.log("ai went");
                }, 1000);
            }
        }
    }
    // else if (aiActive === true && player === playerTwo) {
    //     let num = randomAiBoxIndex(0, 8);
    //     let aiBoxSelect = children[num];
    //     if (aiBoxSelect.textContent === "") {
    //         aiBoxSelect.textContent = player.XorO;
    //         threeInRow(player, playerNext);
    //     }
    // }
    // the above is if Ai starts (doesn't work yet)
}

function anyBoxesLeft(children) {
 let boxesLeft = 0;
 let boxesIndexList = ""
    for (let i = 0; i < children.length; i++) {
        if (children[i].textContent === "") {
         boxesLeft += 1
         boxesIndexList += i
            //console.log(board.boxes[i], i);
        }
        console.log(boxesIndexList)
    }
    return boxesLeft, boxesIndexList
}
function threeInRow(player, playerNext) {
    turnCount += 1;
    let a = box0.textContent;
    let b = box1.textContent;
    let c = box2.textContent;
    let d = box3.textContent;
    let e = box4.textContent;
    let f = box5.textContent;
    let g = box6.textContent;
    let h = box7.textContent;
    let i = box8.textContent;

    if (a === b && b === c && a !== "") {
        winningOutcome(player, 0, 1, 2);
    } else if (d === e && e === f && f !== "") {
        winningOutcome(player, 3, 4, 5);
    } else if (g === h && h === i && i !== "") {
        winningOutcome(player, 6, 7, 8);
    } else if (a === d && d === g && g !== "") {
        winningOutcome(player, 0, 3, 8);
    } else if (b === e && e === h && h !== "") {
        winningOutcome(player, 1, 4, 7);
    } else if (c === f && f === i && i !== "") {
        winningOutcome(player, 2, 5, 8);
    } else if (a === e && e === i && i !== "") {
        winningOutcome(player, 0, 4, 8);
    } else if (c === e && e === g && g !== "") {
        winningOutcome(player, 2, 4, 6);
    } else if (
        a != "" &&
        b != "" &&
        c != "" &&
        d != "" &&
        e != "" &&
        f != "" &&
        g != "" &&
        h != "" &&
        i != ""
    ) {
        document.getElementById("winnerText").innerHTML = `Draw!`;
        winningContainer.style.zIndex = "1";
        winningContainer.children[0].textContent = "Draw!";
    } else {
        document.getElementById(
            "winnerText"
        ).innerHTML = `${playerNext.getPlayerName()}'s turn`;
    }
}
function winningOutcome(player, winBox1, winBox2, winBox3) {
    gameboardContainer.children[winBox1].style.backgroundColor = "green";
    gameboardContainer.children[winBox2].style.backgroundColor = "green";
    gameboardContainer.children[winBox3].style.backgroundColor = "green";
    winningContainer.children[0].textContent = player.printPlayerWins();
    winningContainer.style.zIndex = "1";
    gameFinished = true
    player.printPlayerWins();
}

function reset() {
    for (let i = 0; i < gameboardContainer.children.length; i++) {
        gameboardContainer.children[i].textContent = "";
        turnCount = 0
        //player one always goes first
        // turnCount = randomNumber();
        gameFinished = false
        winningContainer.style.zIndex = "-1";
    }
}
aiBtn.addEventListener("click", (e) => {
    e.preventDefault();
    aiActive = !aiActive;
    if (aiActive === false) {
        aiBtn.style.backgroundColor = "white";
        console.log("ai Off");
    } else {
        aiBtn.style.backgroundColor = "green";
        console.log("ai On");
    }
});
// function aiTurn() {
//     console.log("I'm ai");
// }
