import React, { useCallback, useState } from 'react'
import data from '@/pages/profile.json'
import { TfiClose } from 'react-icons/tfi'
import axios from 'axios'
import useAddProfile from '@/hooks/useAddProfile'
type Props = {
  setToggle: any
}
function Profiles({ setToggle }: Props) {
  const [clickedIndex, setClickedIndex] = useState(null);
  const [name, setName] = useState()
  const [title, setTitle] = useState()
  const handleImageClick = (key: any) => {
    setClickedIndex(key === clickedIndex ? null : key);
  };
  const { mutate: mutate } = useAddProfile()
  const addProfile = useCallback(async () => {
    const response = await axios.post('/api/addProfile', { img: name, title: title })
    if (response.status === 200) {
      setToggle(false)
    }
  }, [name, title])
  return (
    <div className='absolute w-1/2 border-[1px] border-zinc-600 p-3 h-2/3 top-11 bg-black bg-opacity-80'>
      <TfiClose className='text-lg text-white absolute right-0 m-2 cursor-pointer hover:text-zinc-300' onClick={() => setToggle(false)} />
      <input value={title} onChange={(e: any) => setTitle(e.target.value)} type='text' placeholder='Enter Title' className='m-4 outline-none border-none bg-neutral-800 w-1/2 p-2 rounded-lg' />

      <div className='grid grid-cols-4 gap-5 m-4'>
        {data.data.map((data: any, key: number) => (
          <img key={key} onClick={() => { handleImageClick(key); setName(data?.name) }} src={data?.name} alt='image' className={`w-20 rounded-lg cursor-pointer h-20 object-cover border-2 ${clickedIndex === key ? 'border-white' : 'border-transparent'} transition duration-300`} />
        ))}
      </div>
      <button onClick={addProfile} className='p-2 bg-red-600 m-4 hover:bg-red-800 transition-all duration-200 text-white right-11 rounded-md justify-center items-center text-center'>Create</button>
    </div>
  )
}

export default Profiles