import IconLapiz from './icons/IconLapis'

const EditNote = ({ onEditNote }) => {
  const handleClick = () => {
    onEditNote()
  }

  return (
    <button onClick={handleClick} className='px-3 py-2 focus:outline-none hover:bg-[#00000015]'>
      <IconLapiz className='w-4 h-4' />
    </button>
  )
}

export default EditNote
