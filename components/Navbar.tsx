import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import logo from '../public/logo.png'
import {useRouter} from 'next/router'
import { AiOutlineSearch, AiOutlineMenu } from 'react-icons/ai'
import { IoNotificationsSharp } from 'react-icons/io5'
import useGetProfile from '@/hooks/useGetProfile';
import useCurrentUser from '@/hooks/useCurrentUser';
type Props = {}
const TOP_OFFSET = 66
function Navbar({ }: Props) {
    const router = useRouter();
    const [toggle,setToggle]=useState(false)
    const [onClick, setOnClick] = useState(false)
    const [showBackground, setShowBackground] = useState(false)
    const id = router.query.index;
    const {data:user}=useCurrentUser()
    const { data: profile } = useGetProfile(id as string)
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= TOP_OFFSET) {
                setShowBackground(true)
            } else {
                setShowBackground(false)
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);
    return (
        <nav className={`flex flex-row justify-between items-center  fixed z-50 w-full ${showBackground ? 'bg-neutral-900 bg-opacity-90' : 'bg-transparent'} `}>
            <div className='flex flex-row justify-start items-center'>
                <Image src={logo} alt='logo' className='md:w-40 md:h-20 sm:w-40 sm:h-20 w-36 h-16 object-contain p-2 ' />
                <ul className='hidden flex-row justify-between items-center ml-4 lg:flex'>
                    <li className='mx-2 cursor-pointer hover:text-zinc-500 font-semibold'>Home</li>
                    <li className='mx-2 cursor-pointer hover:text-zinc-500 font-semibold'>Series</li>
                    <li className='mx-2 cursor-pointer hover:text-zinc-500 font-semibold'>Movies</li>
                    <li className='mx-2 cursor-pointer hover:text-zinc-500 font-semibold'>Originals</li>
                    <li className='mx-2 cursor-pointer hover:text-zinc-500 font-semibold'>Recently Added</li>
                    <li className='mx-2 cursor-pointer hover:text-zinc-500 font-semibold'>My List</li>
                </ul>
            </div>
            <div className='flex flex-row justify-end items-center relative'>
                <AiOutlineSearch className='text-2xl text-white font-bold' />
                <h4 className='mx-6 cursor-pointer hover:text-zinc-500 font-semibold'>HDS</h4>
                <h4 className='mx-6 cursor-pointer hover:text-zinc-500 font-semibold'>DVD</h4>
                <IoNotificationsSharp className='text-2xl text-white font-bold' />
                <img src={profile?.img} onClick={() => setOnClick(!onClick)} alt='user' className={`w-14 h-14  ml-7 mr-3 rounded-lg cursor-pointer border-2 ${onClick ? 'border-white' : 'border-transparent'} duration-150`} />
                <AiOutlineMenu className='lg:hidden flex m-2' size={30} onClick={()=>setToggle(!toggle)}/>
                {toggle && 
                    <ul className=' flex-col justify-between items-center ml-4 flex absolute top-14 space-y-4 mx-2  bg-zinc-900'>
                    <li className='mx-2 cursor-pointer hover:text-zinc-500 font-semibold'>Home</li>
                    <li className='mx-2 cursor-pointer hover:text-zinc-500 font-semibold'>Series</li>
                    <li className='mx-2 cursor-pointer hover:text-zinc-500 font-semibold'>Movies</li>
                    <li className='mx-2 cursor-pointer hover:text-zinc-500 font-semibold'>Originals</li>
                    <li className='mx-2 cursor-pointer hover:text-zinc-500 font-semibold'>Recently Added</li>
                    <li className='mx-2 cursor-pointer hover:text-zinc-500 font-semibold'>My List</li>
                </ul>
                    }
                {onClick && <div className='absolute bg-zinc-900 rounded-lg h-12 w-28 flex flex-col justify-center items-center top-14 right-2'>
                    <h3 className='border-b-[1px] border-white text-base font-bold cursor-pointer hover:text-gray-300 transition duration-75 hover:border-gray-300' >{user?.username}</h3>
                    </div>}
            </div>

        </nav>
    )
}

export default Navbar