import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Toaster } from '@/components/ui/toaster'
import { useToast } from '@/hooks/use-toast'
import { parseDateTime } from '@/lib/functions'
import React, { useState } from 'react'

const NewNote = () => {
  const { toast } = useToast()
  const [ errorMsg, setErrorMsg] = useState<String>("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const title = formData.get('title') as string
    const content = formData.get('content') as string
    const data = {
      title,
      content,
    }

    const pushData = await fetch('http://localhost:8080/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },  
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
      console.log(res.data)
      if(res.code == 200) {
        toast({
          title: 'New note created',
          description: 'Your note has been created successfully',
        })
      }else{
        setErrorMsg(res.message)
        toast({
          title: 'Failed creating note',
          description: res.message,
        })
      }
    })

    if ( data.title && data.content ) {
      console.log(data.title, data.content)
      console.log(data)
      pushData
    } else {
      setErrorMsg("tolong masukan judul dan isi")
      toast({
        title: 'Failed creating note',
        description: "tolong masukan judul dan isi",
      })
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <Input  name="title" className='font-bold border-0 focus-visible:ring-0 shadow-none px-0' placeholder={"Masukan Judul"}/>
          <p>{parseDateTime().date + " - " + parseDateTime().time}</p>
          <div className="mt-4">
            <textarea name="content" spellCheck={false} className='w-full h-96 focus:outline-0 focus: ring-0'></textarea>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button type='submit'>simpan</Button>
        </div>
      </form>
    </div>
  )
}

export default NewNote