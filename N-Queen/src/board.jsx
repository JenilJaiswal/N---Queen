import { useState } from "react";
import "./App.css"; // Using App.css for styling

export default function Board() {
  const [size, setSize] = useState("");
  const [grid, setGrid] = useState([]);

  const handleChange = (e) => {
    let value = e.target.value;

    // Ensure only numbers are entered
    if (!/^\d*$/.test(value)) return;

    // Restrict input to two-digit numbers (1-99)
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
    setGrid(Array.from({ length: size * size }, () => ""));
  };

  const handleInputChange = (index, value) => {
    // Ensure only a single digit (0-9) is entered
    if (/^\d?$/.test(value)) {
      const newGrid = [...grid];
      newGrid[index] = value;
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
          maxLength="2" // Prevents typing more than 2 characters
        />
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${size || 1}, 50px)`,
            gridTemplateRows: `repeat(${size || 1}, 50px)`,
          }}
        >
          {grid.map((value, index) => (
            <input
              key={index}
              type="text"
              value={value}
              onChange={(e) => handleInputChange(index, e.target.value)}
              className="grid-cell"
              maxLength="1" // Ensures only 1 character is typed
            />
          ))}
        </div>
      </div>
    </div>
  );
}
