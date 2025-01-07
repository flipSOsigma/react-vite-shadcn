import { useEffect, useState } from 'react'
import { Card, CardHeader } from './ui/card'
import { convertUTCToIndonesianTime, ShortedText } from '@/lib/functions'
import { Link } from 'react-router-dom'

const NoteCard = ({limit}: { limit?:number}) => {

  interface noteDataConfig {
    id: number,
    title: string,
    content: string,
    uniqueId: string,
    createdAt: string,
    updatedAt: string
  }

  const [noteData, setNoteData] = useState<noteDataConfig[]>([])
  
  useEffect(() => {

    fetch('http://localhost:8080/data', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => res.json()).then(data => {
      if ( limit ) {
        if ( data.data.length > limit ) {
          const list = []
          for( let i = 0; i < limit; i++ ) {
            list.push(data.data[i])
          }
          console.log(list)
          setNoteData(list)
        }else{
          setNoteData(data.data)
        }
      } else {
        setNoteData(data.data)
      }
    })
    
  }, [])

  return (
    <div className='grid grid-cols-2 gap-4'> 
    {noteData?.map((card) => (
      <Link to={`/${card.uniqueId}`} key={card.uniqueId}>
        <Card>
          <CardHeader className='space-y-0'>
            <h2>{ShortedText(card.title)}</h2>
            <span className='pb-4'>{convertUTCToIndonesianTime(card.createdAt).WIB}</span>
            <p>{ShortedText(card.content)}</p>
          </CardHeader>
        </Card>
      </Link>
    ))}
    </div>
  )
}

export default NoteCard