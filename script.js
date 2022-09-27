const gameboard = (function () {
    let board = [];
    return { board };
})();

const playerFactory = (playerNumber, playerName, XorO) => {
    let getPlayerNumber = () => playerNumber;
    let getPlayerName = () => playerName;
    console.log(
        `player number is ${playerNumber} and player name is ${playerName} X or O : ${XorO}`
    );
    return { getPlayerNumber, getPlayerName, XorO };
};
let playerOne = playerFactory(1, "james", "X");
let playerTwo = playerFactory(2, "computer", "O");
const gameboardContainer = document.querySelector(".gameboard-container");

function whichDiv() {
    let children = gameboardContainer.children;
    let turnCount = 0;
    for (let i = 0; i < children.length; i++) {
        let box = document.getElementById(children[i].id);
        box.addEventListener("click", () => {
            const player = turnCount % 2 === 0 ? playerOne : playerTwo;
            if (box.textContent == "") {
                console.log(turnCount);
                turnCount += 1;
                console.log(turnCount);
                box.textContent = player.XorO;
                threeInRow(player);
            }
        });
    }
}
function threeInRow(player) {
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
        winningText(player);
    } else if (box3 === box4 && box4 === box5 && box5 !== "") {
        winningText(player);
    } else if (box6 === box7 && box7 === box8 && box8 !== "") {
        winningText(player);
    } else if (box0 === box3 && box3 === box6 && box6 !== "") {
        winningText(player);
    } else if (box1 === box4 && box4 === box7 && box7 !== "") {
        winningText(player);
    } else if (box2 === box5 && box5 === box8 && box8 !== "") {
        winningText(player);
    } else if (box0 === box4 && box4 === box8 && box8 !== "") {
        winningText(player);
    } else if (box2 === box4 && box4 === box6 && box6 !== "") {
        winningText(player);
    }
}
function winningText(player) {
    document.getElementById(
        "winnerText"
    ).innerHTML = `${player.getPlayerName()} wins!`;
}
function reset() {
    for (let i = 0; i < gameboardContainer.children.length; i++) {
        gameboardContainer.children[i].textContent = "";
    }
}
whichDiv();
