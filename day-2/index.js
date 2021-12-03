const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: fs.createReadStream("input.txt"),
  output: process.stdout,
  terminal: false,
});

let position = {
  aim: 0,
  depth: 0,
  horizontal: 0,
};

rl.on("line", (line) => {
  let [direction, dist] = line.split(" ");
  dist = Number(dist);
  // PART 1
  // if (direction === "forward") {
  //   position.horizontal += dist;
  // } else if (direction === "down") {
  //   position.depth += dist;
  // } else if (direction === "up") {
  //   position.depth -= dist;
  // }

  // PART 2
  if (direction === "forward") {
    position.horizontal += dist;
    position.depth += position.aim * dist;
  } else if (direction === "down") {
    position.aim += dist;
  } else if (direction === "up") {
    position.aim -= dist;
  }
});

rl.on("close", () => {
  console.log(position);
  console.log(position.horizontal * position.depth);
});
