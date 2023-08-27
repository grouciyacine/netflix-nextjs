import useGetOneMovie from '@/hooks/useGetOneMovie'
import { useRouter } from 'next/router'
import React from 'react'

type Props = {}

function PlayMovie({}: Props) {
  const route=useRouter()
  const {PlayMovie}=route.query
  const {data:movie}=useGetOneMovie(PlayMovie as string)
  return (
    <video controls src={movie?.vidURL} autoPlay className='w-full h-full'>
    </video>
  )
}

export default PlayMovie