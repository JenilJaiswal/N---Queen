import { useState } from 'react'
import Board from './board'
import './App.css'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     {/* <div className="container" style={{ backgroundImage: `url(${bgImage})` }}></div> */}
     <Board/>
    </>
  )
}

export default App
