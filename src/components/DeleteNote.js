import IconX from './icons/IconX'

const DeleteNote = ({ onDelteNote }) => {
  const handleClick = () => {
    onDelteNote()
  }

  return (
    <button onClick={handleClick} className='px-3 py-2 focus:outline-none hover:bg-[#00000015]'>
      <IconX className='w-4 h-3' />
    </button>
  )
}

export default DeleteNote
