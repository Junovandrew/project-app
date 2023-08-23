import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import{Routes,Route} from 'react-router-dom'
import{Login,Account} from './pages'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/login/*" element={<Login/>}/>
        <Route path="/account/*" element={<Account/>}/>
        <Route path="/*" element={<div>Sorry\Page not found</div>}/>
      </Routes>
    </>
  )
}

export default App
