const fs = require("fs");

const data = fs
  .readFileSync("input.txt")
  .toString()
  .split(",")
  .map((n) => Number(n));
const maxPos = Math.max(...data);
const minPos = Math.min(...data);

minCost = Number.MAX_SAFE_INTEGER;
for (let currPos = minPos; currPos <= maxPos; ++currPos) {
  let cost = 0;
  for (let pos of data) {
    // PART ONE
    // cost += Math.abs(currPos - pos);
    // PART TWO
    const n = Math.abs(currPos - pos);
    cost += (n * (n + 1)) / 2;
  }
  if (cost < minCost) {
    minCost = cost;
  }
}

console.log(minCost);

// Probably more efficient to use the median for part 1:
// const median = data.sort((a, b) => a - b)[data.length / 2];
// let cost = 0;
// for (let i = 0; i < data.length; ++i) {
//   cost += Math.abs(data[i] - median);
// }
// console.log(cost);
