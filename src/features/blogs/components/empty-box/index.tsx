import InboxIcon from '../icons/inbox';

const EmptyBox = () => {
  return (
    <div className='flex flex-col justify-center items-center space-y-3 opacity-60'>
      <InboxIcon/>
      <p>No data</p>
    </div>
  )
}

export default EmptyBox