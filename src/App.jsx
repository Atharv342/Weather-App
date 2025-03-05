import { useState } from 'react'
import Weather from './component/Weather'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="bg-gray-400 h-screen flex justify-center">
      <Weather/>
    </div>
    </>
  )
}

export default App
