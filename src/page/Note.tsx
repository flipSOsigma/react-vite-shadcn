
import { DeletePopOver } from '@/components/DeletePopOver'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast'
import { parseDateTime } from '@/lib/functions'
import { noteDataConfig } from '@/lib/interface'
import e from 'cors'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Note = () => {
  const id = useParams()
  const [ note, setNote ] = useState<noteDataConfig>()

  useEffect(() => {

    fetch('http://localhost:8080/data/' + id.id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => res.json())
    .then(res => res.data)
    .then(res => setNote(res))

  }, [id.id])

  const updateHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    fetch('http://localhost:8080/data/' + id.id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note)
    })
    .then(res => res.json())
    .then(res => res.data)
    .then(res => {
      toast({ title: res.title + ' Note updated', description: 'Your note has been updated successfully' })
    })
  }

  return (
    <div>
      { note && id.id ? (
        <form onSubmit={updateHandler}>
          <div>
            <Input className='font-bold border-0 focus-visible:ring-0 shadow-none px-0' onChange={(e) => setNote({ ...note, title: e.target.value })} value={note.title}/>
            <p>{parseDateTime(note.createdAt).date + " - " + parseDateTime(note.createdAt).time}</p>
            <div className="mt-4">
              <textarea defaultValue={note.content} onChange={(e) => setNote({ ...note, content: e.target.value })} spellCheck={false} className='w-full h-96 focus:outline-0 focus: ring-0'/>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button type='submit'>Update</Button>
            <DeletePopOver id={id.  id} title={note.title}/>
          </div>
        </form>
      ) : ( 
        <div>Loading...</div>
      ) }
    </div>
  )
}

export default Note