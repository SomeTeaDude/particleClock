const clock = document.querySelector(".clock");

const now = new Date();

let prevDateString = `${now.getHours().toString().padStart(2, "0")}:${now
  .getMinutes()
  .toString()
  .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;

const rand = (min, max) => Math.trunc(Math.random() * (max + 1 - min)) + min;

const dropDot = (cell) => {
  const toDropDot = cell.querySelector(".dot:not(.drop)");
  if (!toDropDot) return;

  toDropDot.style.setProperty("--bg-color", `hsl(${rand(0, 360)}deg 100% 75%)`);
  toDropDot.style.setProperty("--jump-y", `${rand(0, 15)}px`);
  toDropDot.style.setProperty("--jump-x", `${rand(-10, 10)}px`);
  toDropDot.classList.add("drop");
  setTimeout(() => {
    toDropDot.remove();
  }, 510);
};

const init = () => {
  const dateString = prevDateString;

  for (let i = 0; i < dateString.length; i++) {
    const letter = dateString[i];

    const col = document.createElement("div");
    col.className = "column";

    NUMBERS[letter].forEach((row) => {
      row.forEach((isDot) => {
        const cell = document.createElement("div");
        cell.className = "cell";
        if (isDot) {
          const dot = document.createElement("div");
          dot.className = "dot";
          cell.appendChild(dot);
        }
        col.appendChild(cell);
      });
    });

    clock.appendChild(col);
  }
};

init();

const updateClock = () => {
  const now = new Date();

  const dateString = `${now.getHours().toString().padStart(2, "0")}:${now
    .getMinutes()
    .toString()
    .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;

  for (let i = 0; i < dateString.length; i++) {
    const letter = dateString[i];
    if (letter === prevDateString[i]) continue;

    const col = clock.querySelectorAll(".column")[i];
    const colCells = col.querySelectorAll(".cell");

    NUMBERS[letter].forEach((row, i) => {
      row.forEach((isDot, j) => {
        const cell = colCells[row.length * i + j];
        const dot = cell.querySelector(".dot");
        if (dot) {
          dropDot(cell);
        }

        if (isDot) {
          const dot = document.createElement("div");
          dot.className = "dot";
          cell.appendChild(dot);
        }
      });
    });
  }

  prevDateString = dateString;
};

setTimeout(() => {
  setInterval(() => {
    updateClock();
  }, 1000);
}, 1000 - now.getMilliseconds);
