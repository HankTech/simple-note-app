import { useEffect, useState } from 'react'
import { db } from '../firebase'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import NoteForm from './NoteForm'
import Note from './Note'

const Notes = () => {
  const [notes, setNotes] = useState([])

  //  get the notes
  const getNotes = () => {
    db.collection('notes').onSnapshot((notes) => {
      const docs = []
      notes.forEach(doc => docs.push({ ...doc.data(), id: doc.id }))
      setNotes(docs)
    })
  }

  useEffect(() => {
    getNotes()
  }, [])

  //  create and update new note
  const [editing, setEditing] = useState(false)
  const [currentId, setCurrentId] = useState('')

  const addNote = async (values) => {
    //  create
    if (currentId === '') {
      await db.collection('notes').add(values)
      toast('New note added', {
        type: 'success',
        autoClose: 3000
      })
    } else {
      // update
      await db.collection('notes').doc(currentId).update(values)
      setEditing(false)
      toast('Note updated successfully', {
        type: 'info',
        autoClose: 3000
      })
      setCurrentId('')
    }
  }

  return (
    <>
      <div>
        <h1 className='text-center font-bold text-4xl tracking-wider text-white p-8 mb-10'>Simple Note App</h1>
        <div className='container mx-auto grid grid-cols-6 gap-14'>
          <div className='col-span-2'>
            <NoteForm
              addNote={addNote}
              editing={editing}
              setEditing={setEditing}
              currentId={currentId}
              setCurrentId={setCurrentId}
            />
          </div>

          <div className='col-span-4'>
            <div className='grid grid-cols-3 gap-y-16 gap-x-5'>
              {
                notes.length > 0
                  ? (
                      notes.map(note => (
                        <Note
                          key={note.id}
                          note={note}
                          setEditing={setEditing}
                          setCurrentId={setCurrentId}
                        />
                      ))
                    )
                  : (
                    <span className='col-span-3 py-20 text-xl text-center text-pink-700'>Note list Empty!</span>
                    )
              }
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  )
}

export default Notes
