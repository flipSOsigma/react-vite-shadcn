import { Button } from '@/components/ui/button'
import NoteCard from '@/components/NoteCard'
import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <h1><b>Note Pad</b></h1>
      <p>make your notes safe</p>
      <Link to={'/add'}>
        <Button className='mt-4 mb-12 flex-center'><Plus /> add note</Button>
      </Link>
      <NoteCard/>
    </div>
  )
}

export default Home