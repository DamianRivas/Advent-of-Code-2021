const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: fs.createReadStream("input.txt"),
  output: process.stdout,
  terminal: false,
});

let numbers = [];
const boards = [];

let currentBoard = [];
let fileRow = 0;
let lineNumber = 1;

rl.on("line", (line) => {
  if (lineNumber === 1) {
    numbers = line.split(",");
  } else if (line === "") {
    if (lineNumber > 2) {
      boards.push(currentBoard);
    }
    currentBoard = [];
    fileRow = 0;
  } else {
    let numRow = line.split(" ");
    numRow = numRow.filter((num) => num !== "");
    currentBoard.push(numRow);
  }
  ++fileRow;
  ++lineNumber;
});

rl.on("close", () => {
  for (let num of numbers) {
    let bIndex = 0;
    while (bIndex < boards.length) {
      const board = boards[bIndex];
      markBoard(board, num);
      if (checkIfWinner(board)) {
        let sum = 0;
        for (let i = 0; i < board.length; ++i) {
          for (let j = 0; j < board.length; ++j) {
            if (board[i][j] !== "x") {
              sum += Number(board[i][j]);
            }
          }
        }
        console.log("FOUND A WINNER");
        console.log("Number called:", num);
        console.log("Board sum:", sum);
        console.log(`Current Number * Board sum = ${num * sum}`);
        boards.splice(bIndex, 1);
      } else {
        ++bIndex;
      }
    }
  }
});

function markBoard(board, num) {
  for (let i = 0; i < board.length; ++i) {
    board[i] = board[i].map((n) => (n === num ? "x" : n));
  }
}

function checkIfWinner(board) {
  for (let i = 0; i < board.length; ++i) {
    // check ith row
    const rowXs = board[i].filter((num) => num === "x");
    if (rowXs.length === 5) return true;
    // check ith column
    const colXs = [];
    for (let j = 0; j < board.length; ++j) {
      if (board[j][i] === "x") colXs.push("x");
    }
    if (colXs.length === 5) return true;
  }
  return false;
}

// let testBoard = [
//   ["21", "53", "68", "5", "80"],
//   ["x", "x", "x", "x", "x"],
//   ["64", "46", "35", "26", "39"],
//   ["50", "24", "84", "45", "71"],
//   ["66", "15", "83", "3", "97"],
// ];

// console.log("IS WINNER?", checkIfWinner(testBoard, "53"));
