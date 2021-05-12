import { useEffect, useState } from 'react'
import { db } from '../firebase'
import IconAdd from './icons/IconAdd'

const NoteForm = ({ addNote, editing, setEditing, currentId, setCurrentId }) => {
  const initialStae = { title: '', note: '' }

  const [noteValues, setNoteValues] = useState(initialStae)
  const handleSubmit = (e) => {
    e.preventDefault()
    addNote(noteValues)
    setNoteValues(initialStae)
  }

  const handleInput = (e) => {
    const { name, value } = e.target
    setNoteValues({ ...noteValues, [name]: value })
  }

  const handleClick = () => {
    setEditing(false)
    setNoteValues(initialStae)
    setCurrentId('')
  }

  //  update note
  const getNoteById = async (id) => {
    const doc = await db.collection('notes').doc(id).get()
    setNoteValues({ ...doc.data() })
  }

  useEffect(() => {
    if (currentId === '') {
      setNoteValues(initialStae)
    } else {
      getNoteById(currentId)
    }
  }, [currentId])

  return (
    <div className='mx-auto max-w-md px-6 py-12 border-0 shadow-lg sm:rounded-3xl'>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col'>
          <div className='flex bg-yellow-400 relative'>
            <button
              type='button'
              onClick={handleClick}
              className='absolute p-3 focus:outline-none hover:bg-[#00000015]'
            >
              <IconAdd className='w-4 h-4' />
            </button>

            <input
              onChange={handleInput}
              name='title'
              value={noteValues.title}
              className='p-2 w-full text-center outline-none bg-yellow-400'
            />
          </div>

          <textarea
            onChange={handleInput}
            name='note'
            value={noteValues.note}
            required
            placeholder='take a note...'
            rows='7'
            className='py-3 px-4 text-white text-justify outline-none bg-[#323236]'
          />
        </div>

        {
          editing
            ? (
              <button className='w-full px-6 py-3 mt-3 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-blue-500 hover:shadow-lg focus:outline-none'>
                Update Note
              </button>
              )
            : (
              <button className='w-full px-6 py-3 mt-3 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-green-500 hover:shadow-lg focus:outline-none'>
                Add New Note
              </button>
              )
        }

      </form>
    </div>
  )
}

export default NoteForm
