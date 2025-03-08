import { useState } from "react";
import "./App.css";

export default function Board() {
  const [size, setSize] = useState("");
  const [grid, setGrid] = useState([]);

  const handleChange = (e) => {
    let value = e.target.value;

    // Ensure only numbers are entered
    if (!/^\d*$/.test(value)) return;

    // Restrict input to two-digit numbers (1-20)
    if (value.length > 2) {
      value = value.slice(0, 2);
    }

    const newSize = value === "" ? "" : parseInt(value, 10);

    if (newSize >= 1 && newSize <= 20) {
      setSize(newSize);
      generateGrid(newSize);
    } else {
      setSize(""); 
      setGrid([]);
    }
  };

  const generateGrid = (size) => {
    if (!size) {
      setGrid([]);
      return;
    }
    setGrid(Array(size * size).fill(""));
  };

  const solveNQueens = () => {
    const board = Array(size).fill(-1);
    const result = [];

    const isSafe = (row, col) => {
      for (let prevRow = 0; prevRow < row; prevRow++) {
        const prevCol = board[prevRow];
        if (prevCol === col || Math.abs(prevCol - col) === Math.abs(prevRow - row)) {
          return false;
        }
      }
      return true;
    };

    const placeQueens = (row) => {
      if (row === size) {
        result.push([...board]);
        return;
      }
      for (let col = 0; col < size; col++) {
        if (isSafe(row, col)) {
          board[row] = col;
          placeQueens(row + 1);
          board[row] = -1; 
        }
      }
    };

    placeQueens(0);

    if (result.length > 0) {
      const solution = result[0]; // Take the first valid solution
      const newGrid = Array(size * size).fill("");
      solution.forEach((col, row) => {
        newGrid[row * size + col] = "♛";
      });
      setGrid(newGrid);
    }
  };

  return (
    <div className="board-container">
      <div className="board">
        <input
          type="text"
          value={size}
          onChange={handleChange}
          placeholder="Enter Board size"
          className="input-box"
          maxLength="2"
        />
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${size || 1}, 50px)`,
            gridTemplateRows: `repeat(${size || 1}, 50px)`,
          }}
        >
          {grid.map((value, index) => (
            <div key={index} className="grid-cell">
              {value}
            </div>
          ))}
        </div>
        <button onClick={solveNQueens} className="solve-button">
          Solve
        </button>
      </div>
    </div>
  );
}
