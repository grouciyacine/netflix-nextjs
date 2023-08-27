
import useGetStars from '@/hooks/useGetStars'
import React from 'react'


type Props = {
    star:any
}
function Star({star}: Props) {
    const {data:stars}=useGetStars(star)
  return (
    <div className='flex translate-y-14  mx-3 flex-col justify-center items-center'>
        <img src={stars?.imgUrl} alt='' className='w-20 h-28 rounded-lg object-cover'/> 
        <h1>{stars?.name}</h1>
    </div>
  )
}

export default Star