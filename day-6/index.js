const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: fs.createReadStream("input.txt"),
  output: process.stdout,
  terminal: false,
});

let lanternfish;

rl.on("line", (line) => {
  lanternfish = line.split(",").map((t) => Number(t));
});

rl.on("close", () => {
  trackFish();
});

function trackFish() {
  lanternfishTracker = initializeTracker();
  console.log(lanternfishTracker);
  for (let i = 0; i < 256; ++i) {
    const newFish = lanternfishTracker[0];
    for (let i = 0; i < 9; ++i) {
      lanternfishTracker[i] = lanternfishTracker[i + 1];
    }
    lanternfishTracker[8] = newFish;
    lanternfishTracker[6] += newFish;
    if (i === 79) {
      printResult(lanternfishTracker, i);
    }
  }
  printResult(lanternfishTracker, 256);
}

function printResult(lanternfishTracker, days) {
  console.log(
    `Number of lanternfish after ${days} days:`,
    lanternfishTracker.reduce((acc, curr) => acc + curr, 0)
  );
}

function initializeTracker() {
  let lanternfishTracker = new Array(9).fill(0);
  lanternfish.forEach((f) => ++lanternfishTracker[f]);
  return lanternfishTracker;
}
