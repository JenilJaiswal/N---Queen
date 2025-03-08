import { useState } from "react";
import "./App.css"; // Using App.css for styling

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

    // Only allow values between 1 and 20
    if (newSize >= 1 && newSize <= 20) {
      setSize(newSize);
      generateGrid(newSize);
    } else {
      setSize(""); // Reset size if out of range
      setGrid([]); // Clear the grid if invalid input
    }
  };

  const generateGrid = (size) => {
    if (!size) {
      setGrid([]);
      return;
    }
    setGrid(Array(size * size).fill("")); // Initialize empty grid
  };

  const handleCellClick = (index) => {
    setGrid((prevGrid) =>
      prevGrid.map((cell, i) => (i === index ? (cell === "👑" ? "" : "👑") : cell))
    );
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
          {grid.map((cell, index) => (
            <div
              key={index}
              className="grid-cell"
              onClick={() => handleCellClick(index)}
            >
              {cell}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
