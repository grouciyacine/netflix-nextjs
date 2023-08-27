import Navbar from "@/components/Navbar";
import useGetMovies from "@/hooks/useGetMovies";
import { BsFillPlayFill } from 'react-icons/bs'
import { AiOutlineInfoCircle, AiOutlineClose, AiFillStar } from 'react-icons/ai'
import useGetAllMovies from "@/hooks/useGetAllMovies";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import MovieCard from "@/components/MovieCard";
import useFavoriteMovies from "@/hooks/useFavoriteMovies";
import { useState } from "react";
import Star from "@/components/Star";
import {useRouter} from 'next/router'



export default function Home() {
  let setting = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slideToScroll: 1,
    autoplay: true,
  }
  const [toggle, setToggle] = useState(false)
  const [toggle1, setToggle1] = useState(false)
  const [movieId, setMovieId] = useState<any>()
  const { data: movies } = useGetMovies()
  const { data: AllMovies } = useGetAllMovies()
  const { data: favoriteMovies } = useFavoriteMovies()
  const route=useRouter()
  return (
    <div className="relative top-0">
      <Navbar />
      <div className="relative w-full ">
        <video loop src={movies?.vidURL} muted autoPlay className="w-full -top-20  relative object-cover lg:-top-1  h-[540px] brightness-[60%]">
        </video>
        <div className="absolute sm:top-20 top-5 w-full mt-20">
          <h1 className="sm:text-5xl text-xl font-bold sm:p-4 sm:pl-0  pl-5 ">{movies?.title}</h1>
          <h3 className="sm:text-base flex  font-semibold sm:p-6 w-1/2 text-sm sm:pl-0 mt-4 pl-6">{movies?.description}</h3>
          <div className="flex flex-row justify-start items-center p-4 space-x-6">
            <div className="flex flex-row justify-center items-center cursor-pointer bg-slate-200 rounded-sm p-1 w-28 h-10 text-black">
              <BsFillPlayFill />
              <button className="mx-2" onClick={()=>route.push(`/movie/${movies?.id}`)}>Play</button>
            </div>
            <div className="sm:flex hidden flex-row justify-center cursor-pointer items-center bg-slate-200 rounded-sm p-1 w-28 h-10 text-black">
              <AiOutlineInfoCircle />
              <button className="mx-2 " onClick={()=>setToggle1(!toggle1)}>More Info</button>
            </div>
          </div>
          <div className="p-1 ">
            <h1 className="text-xl font-bold p-7">Popular on Netflix</h1>
            <div className="flex flex-row justify-start items-center w-full space-x-2">
              <Slider {...setting} className='w-full overflow-hidden  relative border-none' >
                {AllMovies?.map((movie: any, key: number) => (
                  <div className="border-none" key={key}>
                    <MovieCard data={movie} setToggle={setToggle} toggle={toggle} setMovieId={setMovieId} />
                  </div>
                ))}</Slider>
            </div>
          </div>
          <div className="p-1 ">
            <h1 className="text-xl font-bold p-7">Trending Now</h1>
            <div className="flex flex-row justify-start items-center w-full space-x-2">
              <Slider {...setting} className='w-full overflow-hidden  relative border-none' >
                {AllMovies?.map((movie: any, key: number) => (
                  <div className="border-none" key={key}>
                    <MovieCard data={movie} setToggle={setToggle} toggle={toggle} setMovieId={setMovieId} />
                  </div>
                ))}</Slider>
            </div>
          </div>
          <div className="p-1 ">
            <h1 className="text-xl font-bold p-7">My List</h1>
            <div className="grid grid-cols-4 justify-start items-center w-full space-x-2">
              {favoriteMovies?.map((movie: any, key: number) => (
                <div className="border-none" key={key}>
                  <MovieCard data={movie} setToggle={setToggle} toggle={toggle} setMovieId={setMovieId} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {toggle && <div className=" w-10/12 top-40   m-14 rounded-xl  h-full bg-zinc-900 z-40 absolute">
        <img src={movieId?.imgUrl} alt="logo" className="w-full rounded-xl h-full object-cover" />
        <div className="w-full absolute h-full top-0 rounded-xl bg-opacity-50 bg-zinc-900">
          <AiOutlineClose className='flex right-0 text-white cursor-pointer  absolute top-0 m-3' onClick={() => setToggle(!toggle)} size={30} />
          <div className="flex flex-row justify-around items-start h-full">
            <div className="w-1/2 mt-12 ">
              <h1 className="lg:text-2xl md:text-base mt-1  font-bold">{movieId?.title}</h1>
              <h2 className="text-2xl  md:text-base mt-1 font-bold">{movieId?.genre}</h2>
              <h2 className="text-2xl  md:text-base mt-1 font-bold">{movieId?.duration}</h2>
              <h2 className="text-lg  md:text-sm mt-1 font-semibold">{movieId?.description}</h2>
              <div className="relative">
                <AiFillStar size={60} className='text-yellow-400 absolute' />
                <h1 className="relative z-20 translate-x-[18px] translate-y-4">{movieId?.note}</h1>
              </div>
              <div className="flex flex-row justify-start items-center">
                {movieId?.Stars?.map((star:any,key:number)=>(
                  <Star star={star} key={key}/>
                ))}
              </div>
            </div>
            <div className="h-full ">
              <img src={movieId?.imgUrl} alt="logo" className="object-cover w-52 m-4  h-64 rounded-lg"/>
            </div>
          </div>

        </div>
      </div>}
      {toggle1 && <div className=" w-10/12 top-10   m-14 rounded-xl  h-full bg-zinc-900 z-40 absolute">
        <img src={movies?.imgUrl} alt="logo" className="w-full rounded-xl h-full object-cover" />
        <div className="w-full absolute h-full top-0 rounded-xl bg-opacity-50 bg-zinc-900">
          <AiOutlineClose className='flex right-0 text-white cursor-pointer  absolute top-0 m-3' onClick={() => setToggle1(!toggle1)} size={30} />
          <div className="flex flex-row justify-around items-start h-full">
            <div className="w-1/2 mt-12">
              <h1 className="text-2xl md:text-base mt-1 font-bold">{movies?.title}</h1>
              <h2 className="text-2xl md:text-base mt-1 font-bold">{movies?.genre}</h2>
              <h2 className="text-2xl md:text-base mt-1 font-bold">{movies?.duration}</h2>
              <h2 className="text-lg md:text-sm mt-1 font-semibold">{movies?.description}</h2>
              <div className="relative">
                <AiFillStar size={60} className='text-yellow-400 absolute' />
                <h1 className="relative z-20 translate-x-[18px] translate-y-4">{movies?.note}</h1>
              </div>
              <div className="flex flex-row justify-start items-center">
                {movies?.Stars?.map((star:any,key:number)=>(
                  <Star star={star} key={key}/>
                ))}
              </div>
            </div>
            <div className="h-full ">
              <img src={movies?.imgUrl} alt="logo" className="object-cover w-52 m-4  h-64 rounded-lg"/>
            </div>
          </div>
        </div>
      </div>}
    </div>
  )
}
