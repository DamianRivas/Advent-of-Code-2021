const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: fs.createReadStream("input.txt"),
  output: process.stdout,
  terminal: false,
});

let increaseCount = 0;
let prevValue = null;

let values = [];

rl.on("line", (line) => {
  const val = Number(line);
  if (values.length) {
    if (val > values[values.length - 1]) {
      ++increaseCount;
    }
  }
  values.push(val);
});

rl.on("close", () => {
  // console.log(increaseCount);

  // values = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

  let i = 3;
  increaseCount = 0;

  while (i < values.length) {
    const currentWindow = values[i] + values[i - 1] + values[i - 2];
    const prevWindow = values[i - 1] + values[i - 2] + values[i - 3];

    if (currentWindow > prevWindow) {
      ++increaseCount;
    }
    ++i;
  }

  console.log(increaseCount);
});
