import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './page/Home'
import Note from './page/Note'
import NewNote from './page/NewNote'

function App() {

  return (
    <div className='min-h-screen p-6'>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/:id" element={<Note />}></Route>
          <Route path="/add" element={<NewNote />}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
