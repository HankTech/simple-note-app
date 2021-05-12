import { db } from '../firebase'
import { toast } from 'react-toastify'
import DeleteNote from './DeleteNote'
import EditNote from './EditNote'

const Note = ({ note, setEditing, setCurrentId }) => {
  //  delete note
  const onDelteNote = async () => {
    if (window.confirm('are you sure you want to delete?')) {
      await db.collection('notes').doc(note.id).delete()
      toast('Note remove sucessfully', {
        type: 'error',
        autoClose: 2000
      })
    }
  }

  //  update note
  const onEditNote = () => {
    setEditing(true)
    setCurrentId(note.id)
  }

  return (
    <div className='flex flex-col'>
      <div className='grid grid-cols-5 bg-yellow-400'>
        <h4 className='col-span-4 p-2 text-center flex-nowrap'>{note.title}</h4>
        <div className='col-span-1 flex justify-end'>
          <EditNote onEditNote={onEditNote} />
          <DeleteNote onDelteNote={onDelteNote} />
        </div>
      </div>

      <div className='py-5 px-4 text-white text-justify bg-[#323236]'>
        {note.note}
      </div>
    </div>
  )
}

export default Note
