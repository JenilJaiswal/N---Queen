// import { useState } from "react";
// import "./App.css";

// export default function Board() {
//   const [size, setSize] = useState("");
//   const [solutions, setSolutions] = useState([]);
//   const [currentSolutionIndex, setCurrentSolutionIndex] = useState(0);
//   const [gridGenerated, setGridGenerated] = useState(false);
//   const [solved, setSolved] = useState(false); // New state to track if solve was clicked

//   const handleChange = (e) => {
//     let value = e.target.value;
//     if (!/^\d*$/.test(value)) return;
//     if (value.length > 2) value = value.slice(0, 2);
//     const newSize = value === "" ? "" : parseInt(value, 10);

//     if (newSize >= 1 && newSize <= 10) {
//       setSize(newSize);
//       setGridGenerated(true);
//       setSolutions([]);
//       setSolved(false); // Reset solved state when changing board size
//     } else {
//       setSize("");
//       setSolutions([]);
//       setGridGenerated(false);
//       setSolved(false);
//     }
//   };

//   const solveNQueens = () => {
//     const board = Array(size).fill(-1);
//     const result = [];

//     const isSafe = (row, col) => {
//       for (let prevRow = 0; prevRow < row; prevRow++) {
//         const prevCol = board[prevRow];
//         if (prevCol === col || Math.abs(prevCol - col) === Math.abs(prevRow - row)) {
//           return false;
//         }
//       }
//       return true;
//     };

//     const placeQueens = (row) => {
//       if (row === size) {
//         result.push([...board]);
//         return;
//       }
//       for (let col = 0; col < size; col++) {
//         if (isSafe(row, col)) {
//           board[row] = col;
//           placeQueens(row + 1);
//           board[row] = -1;
//         }
//       }
//     };

//     placeQueens(0);
//     setSolutions(result.length > 0 ? result : []);
//     setCurrentSolutionIndex(0);
//     setGridGenerated(true);
//     setSolved(true); // Mark as solved
//   };

//   const navigateSolution = (direction) => {
//     setCurrentSolutionIndex((prev) =>
//       direction === "next"
//         ? Math.min(prev + 1, solutions.length - 1)
//         : Math.max(prev - 1, 0)
//     );
//   };

//   return (
//     <div className="board-container">
//       <div className="board">
//         <input
//           type="text"
//           value={size}
//           onChange={handleChange}
//           placeholder="Enter Board size"
//           className="input-box"
//           maxLength="2"
//         />
//         <button onClick={solveNQueens} className="solve-button">
//           Solve
//         </button>

//         {/* Grid appears instantly when entering a valid number */}
//         {gridGenerated && (
//           <div className="grid" style={{ gridTemplateColumns: `repeat(${size}, 50px)` }}>
//             {Array(size * size)
//               .fill("")
//               .map((_, index) => {
//                 const row = Math.floor(index / size);
//                 const col = index % size;
//                 return (
//                   <div key={index} className="grid-cell">
//                     {solutions.length > 0 && solutions[currentSolutionIndex][row] === col ? "♛" : ""}
//                   </div>
//                 );
//               })}
//           </div>
//         )}

//         {/* Show "No solution exists" only if Solve was clicked */}
//         {solved && solutions.length === 0 && (
//           <p className="no-solution-text">No solution exists.</p>
//         )}

//         {solutions.length > 1 && (
//           <div className="navigation">
//             <button onClick={() => navigateSolution("prev")} disabled={currentSolutionIndex === 0}>
//               {"<"}
//             </button>
//             <span className="solution-text">{`Solution ${currentSolutionIndex + 1} of ${solutions.length}`}</span>
//             <button
//               onClick={() => navigateSolution("next")}
//               disabled={currentSolutionIndex === solutions.length - 1}
//             >
//               {">"}
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { useState, useRef } from "react";
import "./App.css";

export default function Board() {
  const [size, setSize] = useState("");
  const [solutions, setSolutions] = useState([]);
  const [currentSolutionIndex, setCurrentSolutionIndex] = useState(0);
  const [gridGenerated, setGridGenerated] = useState(false);
  const [solved, setSolved] = useState(false);
  const inputRef = useRef(null); // Ref for focusing input after reset

  const handleChange = (e) => {
    let value = e.target.value;
    if (!/^\d*$/.test(value)) return;
    if (value.length > 2) value = value.slice(0, 2);
    const newSize = value === "" ? "" : parseInt(value, 10);

    if (newSize >= 1 && newSize <= 10) {
      setSize(newSize);
      setGridGenerated(true);
      setSolutions([]);
      setSolved(false);
    } else {
      setSize("");
      setSolutions([]);
      setGridGenerated(false);
      setSolved(false);
    }
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
    setSolutions(result.length > 0 ? result : []);
    setCurrentSolutionIndex(0);
    setGridGenerated(true);
    setSolved(true);
  };

  const resetBoard = () => {
    setSize("");
    setSolutions([]);
    setGridGenerated(false);
    setSolved(false);
    inputRef.current.focus(); // Focus back on input after reset
  };

  const navigateSolution = (direction) => {
    setCurrentSolutionIndex((prev) =>
      direction === "next"
        ? Math.min(prev + 1, solutions.length - 1)
        : Math.max(prev - 1, 0)
    );
  };

  return (
    <div className="board-container">
      <div className="board">
        <input
          ref={inputRef} // Ref for focus on reset
          type="text"
          value={size}
          onChange={handleChange}
          placeholder="Enter Board size"
          className="input-box"
          maxLength="2"
        />

        {/* Show Solve button initially, Reset after solving */}
        {!solved ? (
          <button onClick={solveNQueens} className="solve-button">
            Solve
          </button>
        ) : (
          <button onClick={resetBoard} className="reset-button">
            Reset
          </button>
        )}

        {gridGenerated && (
          <div className="grid" style={{ gridTemplateColumns: `repeat(${size}, 50px)` }}>
            {Array(size * size)
              .fill("")
              .map((_, index) => {
                const row = Math.floor(index / size);
                const col = index % size;
                return (
                  <div key={index} className="grid-cell">
                    {solutions.length > 0 && solutions[currentSolutionIndex][row] === col ? "♛" : ""}
                  </div>
                );
              })}
          </div>
        )}

        {solved && solutions.length === 0 && <p className="no-solution-text">No solution exists.</p>}

        {solutions.length > 1 && (
          <div className="navigation">
            <button onClick={() => navigateSolution("prev")} disabled={currentSolutionIndex === 0}>
              {"<"}
            </button>
            <span className="solution-text">{`Solution ${currentSolutionIndex + 1} of ${solutions.length}`}</span>
            <button
              onClick={() => navigateSolution("next")}
              disabled={currentSolutionIndex === solutions.length - 1}
            >
              {">"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
