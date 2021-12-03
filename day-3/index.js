const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: fs.createReadStream("input.txt"),
  output: process.stdout,
  terminal: false,
});

const bitCounter = {
  0: {
    0: 0,
    1: 0,
  },
  1: {
    0: 0,
    1: 0,
  },
  2: {
    0: 0,
    1: 0,
  },
  3: {
    0: 0,
    1: 0,
  },
  4: {
    0: 0,
    1: 0,
  },
  5: {
    0: 0,
    1: 0,
  },
  6: {
    0: 0,
    1: 0,
  },
  7: {
    0: 0,
    1: 0,
  },
  8: {
    0: 0,
    1: 0,
  },
  9: {
    0: 0,
    1: 0,
  },
  10: {
    0: 0,
    1: 0,
  },
  11: {
    0: 0,
    1: 0,
  },
};

const values = [];

// each line is a binary number
// generate two new binary numbers:
//// gamma rate
//// epsilon rate
rl.on("line", (line) => {
  values.push(line);
  const bits = line.split("");
  bits.forEach((bit, i) => {
    if (bit === "0") {
      ++bitCounter[i][Number(bit)];
    } else if (bit === "1") {
      ++bitCounter[i][Number(bit)];
    }
  });
});

rl.on("close", () => {
  const gammaRate = Object.values(bitCounter)
    .map((bit) => {
      return bit[0] > bit[1] ? "0" : "1";
    })
    .join("");
  const epsilonRate = gammaRate
    .split("")
    .map((bit) => (bit === "0" ? "1" : "0"))
    .join("");
  const gammaRateDec = parseInt(gammaRate, 2);
  const epsilonRateDec = parseInt(epsilonRate, 2);

  /********* PART 2 *********/

  let oxygenGenRating = values.filter((val) => val[0] === gammaRate[0]);
  for (let i = 1; i < gammaRate.length; ++i) {
    // calc most common bit
    const bitCounter = { 0: 0, 1: 0 };
    oxygenGenRating.forEach((val) => ++bitCounter[val[i]]);
    const mostCommonBit = bitCounter[0] > bitCounter[1] ? 0 : 1;
    // filter by most common bit
    let j = 0;
    while (j < oxygenGenRating.length && oxygenGenRating.length > 1) {
      if (oxygenGenRating.length === 1) {
        break;
      } else if (oxygenGenRating[j][i] !== mostCommonBit.toString()) {
        oxygenGenRating.splice(j, 1);
      } else {
        ++j;
      }
    }
  }

  let co2ScrubRating = values.filter((val) => val[0] === epsilonRate[0]);
  for (let i = 1; i < epsilonRate.length; ++i) {
    console.log(co2ScrubRating);
    // calc most common bit
    const bitCounter = { 0: 0, 1: 0 };
    co2ScrubRating.forEach((val) => ++bitCounter[val[i]]);
    const leastCommonBit = bitCounter[0] <= bitCounter[1] ? 0 : 1;
    console.log(leastCommonBit);
    // filter by most common bit
    let j = 0;
    while (j < co2ScrubRating.length && co2ScrubRating.length > 1) {
      if (co2ScrubRating.length === 1) {
        break;
      } else if (co2ScrubRating[j][i] !== leastCommonBit.toString()) {
        co2ScrubRating.splice(j, 1);
      } else {
        ++j;
      }
    }
  }

  oxygenGenRating = oxygenGenRating[0];
  co2ScrubRating = co2ScrubRating[0];

  console.log(oxygenGenRating);
  console.log(co2ScrubRating);

  oxygenGenRatingDec = parseInt(oxygenGenRating, 2);
  co2ScrubRatingDec = parseInt(co2ScrubRating, 2);

  console.log(oxygenGenRatingDec);
  console.log(co2ScrubRatingDec);

  console.log(oxygenGenRatingDec * co2ScrubRatingDec);
});
