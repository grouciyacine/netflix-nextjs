import React, { useState } from 'react'
import { NextPageContext } from 'next'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'
import Image from 'next/image'
import logo from '../public/logo.png'
import { BsFillPlusSquareFill } from 'react-icons/bs'
import useGetProfiles from '@/hooks/useGetProfiles'
import Profiles from '@/components/Profiles'
import { RxPencil2 } from 'react-icons/rx'
import Update from '@/components/Update'
type Props = {}
export async function getServerProps(context: NextPageContext) {
  const session = await getSession(context)
  console.log(session)
  if (!session) {
      return {
          redirect: {
              destination: '/auth',
              permanent: false
          }
      }
  }
  return {
      props: {}
  }
}
function Profile({ }: Props) {
  const [toggle, setToggle] = useState(false)
  const [update, setUpdate] = useState(false)
  const router = useRouter()
  const { data: profiles } = useGetProfiles()
  const [id,setID]=useState(null)
  return (
    <div className='flex flex-col '>
      <nav className='flex flex-row justify-start items-center '>
        <Image src={logo} alt='logo' className='md:w-80 md:h-20 sm:w-40 sm:h-20 w-36 h-16 object-contain p-2 ' />
      </nav>
      <div className='flex flex-col flex-1 justify-between items-center md:mt-32 mt-10 '>
        <h1 className='sm:text-3xl p-4'>who s watching?</h1>
        <div className='grid md:grid-cols-4 grid-cols-2 gap-5 md:gap-24 p-5 ml-8  items-center justify-between'>
          {profiles?.map((profile: any, key: number) => (
            <div key={key} className='flex flex-col justify-center items-center'>
              <div onClick={()=>router.push(`/home/${profile?.id}`)} className='sm:w-[209px] sm:h-[209px] cursor-pointer   hover:border-white  hover:border-[2px] rounded-2xl'>
                <img src={profile?.img} alt='profile1' className='sm:w-52 sm:h-52 p-2 rounded-2xl' />
              </div>
              <div className='flex flex-row justify-center items-center space-x-6'>
                <h4 className='text-zinc-500'>{profile?.title}</h4>
                <RxPencil2 className='text-zinc-500 text-lg cursor-pointer' onClick={() => {setUpdate(!update);setID(profile?.id)}} />
              </div>
            </div>
          ))}
          <div className='relative' onClick={() => setToggle(!toggle)}>
            <BsFillPlusSquareFill className='hover:text-zinc-600 cursor-pointer  w-20 h-20 object-contain p-2 ' />
          </div>
          {toggle && <Profiles setToggle={setToggle} />}
          {update && <Update setUpdate={setUpdate} id={id} />}
        </div>
      </div>
    </div>
  )
}
export default Profile