// const gameboard = (function () {
//     let board = [];
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
let playerOneName = "Player one";
let playerTwoName = "Player two";
let playerOne = playerFactory(playerOneName, "X");
let playerTwo = playerFactory(playerTwoName, "O");
let startReset = document.getElementById("startReset");
let turnCount = randomNumber();
function randomNumber() {
    return Math.floor(Math.random() * 2);
}

startReset.textContent = turnCount > 0 ? "Reset" : "Start";
console.log(turnCount);
const gameboardContainer = document.querySelector(".gameboard-container");
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

    console.log(playerOneName);
    playerOne = playerFactory(playerOneName, "X");
    playerTwo = playerFactory(playerTwoName, "O");
}
// TODO: Stop game once winning is announced (no more clicks)
function whichDiv() {
    let children = gameboardContainer.children;
    for (let i = 0; i < children.length; i++) {
        let box = document.getElementById(children[i].id);
        box.style.backgroundColor = "antiquewhite";
        box.addEventListener("click", () => {
            const player = turnCount % 2 === 0 ? playerOne : playerTwo;
            const playerNext = turnCount % 2 !== 0 ? playerOne : playerTwo;
            if (box.textContent == "") {
                turnCount += 1;
                box.textContent = player.XorO;
                threeInRow(player, playerNext);
            }
        });
    }
}

function threeInRow(player, playerNext) {
    let box0 = gameboardContainer.children[0].textContent;
    let box1 = gameboardContainer.children[1].textContent;
    let box2 = gameboardContainer.children[2].textContent;
    let box3 = gameboardContainer.children[3].textContent;
    let box4 = gameboardContainer.children[4].textContent;
    let box5 = gameboardContainer.children[5].textContent;
    let box6 = gameboardContainer.children[6].textContent;
    let box7 = gameboardContainer.children[7].textContent;
    let box8 = gameboardContainer.children[8].textContent;

    if (box0 === box1 && box1 === box2 && box0 !== "") {
        winningOutcome(player, 0, 1, 2);
    } else if (box3 === box4 && box4 === box5 && box5 !== "") {
        winningOutcome(player, 3, 4, 5);
    } else if (box6 === box7 && box7 === box8 && box8 !== "") {
        winningOutcome(player, 6, 7, 8);
    } else if (box0 === box3 && box3 === box6 && box6 !== "") {
        winningOutcome(player, 0, 3, 8);
    } else if (box1 === box4 && box4 === box7 && box7 !== "") {
        winningOutcome(player, 1, 4, 7);
    } else if (box2 === box5 && box5 === box8 && box8 !== "") {
        winningOutcome(player, 2, 5, 8);
    } else if (box0 === box4 && box4 === box8 && box8 !== "") {
        winningOutcome(player, 0, 4, 8);
    } else if (box2 === box4 && box4 === box6 && box6 !== "") {
        winningOutcome(player, 2, 4, 6);
    } else if (
        box0 != "" &&
        box1 != "" &&
        box2 != "" &&
        box3 != "" &&
        box4 != "" &&
        box5 != "" &&
        box6 != "" &&
        box7 != "" &&
        box8 != ""
    ) {
        document.getElementById("winnerText").innerHTML = `Draw!`;
    } else {
        document.getElementById(
            "winnerText"
        ).innerHTML = `${playerNext.getPlayerName()}'s turn`;
    }
}
function winningOutcome(player, box1, box2, box3) {
    gameboardContainer.children[box1].style.backgroundColor = "green";
    gameboardContainer.children[box2].style.backgroundColor = "green";
    gameboardContainer.children[box3].style.backgroundColor = "green";
    player.printPlayerWins();
}

function reset() {
    for (let i = 0; i < gameboardContainer.children.length; i++) {
        gameboardContainer.children[i].textContent = "";
        turnCount = randomNumber();
    }
}
