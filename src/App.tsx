import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './page/home'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
