import useCurrentUser from '@/hooks/useCurrentUser'
import useFavoriteMovies from '@/hooks/useFavoriteMovies'
import axios from 'axios'
import React, { useCallback} from 'react'
import { BsFillPlayFill } from 'react-icons/bs'
import {MdOutlineFavoriteBorder,MdFavorite} from 'react-icons/md'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import {useRouter} from 'next/router'
type Props = {
    data: any,
    setToggle:any,
    toggle:boolean,
    setMovieId:any
}
function MovieCard({ data,setToggle,toggle,setMovieId }: Props) {
    const {data:currentUser,mutate}=useCurrentUser()
    const {mutate:MoviesMutate}=useFavoriteMovies()
    const route=useRouter()
    const ToggleFavorite=useCallback(async()=>{
        const List=currentUser?.favoriteID ||''
        const include=List.includes(data.id)
        let response
        if(!include) {response= await axios.post('/api/Favorite',{movieId:data.id})}
        else{response=await axios.patch('/api/Favorite',{movieId:data.id})}
        let updatedFavoriteIds=response?.data?.favoriteID
        mutate({ 
            ...currentUser, 
            favoriteID: updatedFavoriteIds,
        });
        MoviesMutate()
    },[data?.id,currentUser])
    return (
        <div className='group  col-span relative  '>
            <img className='cursor-pointer object-cover  px-3  transition duration  shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-300 w-full h-[15vw]' src={data?.imgUrl} />
            <div className='absolute   opacity-0 top-0 bg-zinc-900 transition duration-200 z-10 invisible sm:visible delay-300  w-full scale-0  group-hover:scale-110 group-hover:-translate-y-[6vw]  group-hover:translate-x-[2vw] group-hover:opacity-100'>
                <img src={data?.imgUrl} alt='thumbnail' className='cursor-pointer object-cover transition duration shadow-xl rounded-t-md h-[7vw] w-full ' />
                <div className='items-center gap-3'>
                    <div className='flex flex-row space-x-4'>
                        <div className='cursor-pointer m-2 w-6 h-6 lg:w-10 lg:h-10 text-zinc-900 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300' >
                            <BsFillPlayFill size={30} onClick={()=>route.push(`/movie/${data?.id}`)}/>
                        </div>
                        <div className='cursor-pointer m-2 w-6 h-6 lg:w-10 lg:h-10 bg-white text-zinc-900 rounded-full flex justify-center items-center transition hover:bg-neutral-300'>
                            {currentUser?.favoriteID?.includes(data?.id)?
                            <MdFavorite onClick={ToggleFavorite} size={30}/>:<MdOutlineFavoriteBorder onClick={ToggleFavorite}  size={30} />
                        }
                        </div>
                        <div className='cursor-pointer flex flex-col items-center justify-center m-2 w-6 h-6 lg:w-10 lg:h-10 text-zinc-900 bg-white rounded-full hover:bg-neutral-300 transition'>
                            <AiOutlineInfoCircle onClick={()=>{setToggle(!toggle);setMovieId(data)}} size={30}/>
                        </div>
                    </div>
                    <p className='text-green-400 pl-2 font-semibold mt-2'>New <span className='text-white'>2023</span></p>
                    <div className='flex flex-row mt-2 gap-2 items-center'>
                        <p className='text-white pl-2 text-[10px] lg:text-sm'>{data?.duration}</p>
                    </div>
                    <div className='flex flex-row mt-2 gap-2 items-center'>
                        <p className='text-white pl-2 text-[10px] lg:text-sm'>{data?.title}</p>
                    </div>
                    <div className='flex flex-row mt-2 pl-2  gap-2 items-center'>
                        <p className='text-white text-[10px] lg:text-sm'>{data.genre}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieCard