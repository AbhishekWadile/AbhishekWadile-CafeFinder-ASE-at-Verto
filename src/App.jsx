import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar'
import Map from './Components/Map'
import Card from './Components/Card'
import Landing from './Components/Landing'
import FLanding from './Components/FLanding'
import Footer from './Components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Navbar/>
     <Landing/>
     <Map/>
     <div className='w-[100%] h-[10vh] text-[#2d1f18] flex justify-center items-center text-3xl font-semibold uppercase'>
      <h1>Cafe Lists</h1>
     </div>
     <Card/>
     <FLanding/>
     <Footer/>
    </>
  )
}

export default App
