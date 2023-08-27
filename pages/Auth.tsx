import Image from 'next/image'
import React, { useState, useCallback } from 'react'
import logo from '../public/logo.png'
import {signIn} from 'next-auth/react'
import { TbWorld } from 'react-icons/tb'
import { BsGithub } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'
import axios from 'axios'
import {useRouter} from 'next/router'
function Auth() {
    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
    })
    const router=useRouter()
    const [toggle, setToggle] = useState(false)
    const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const login=useCallback(async()=>{
        try{
            await signIn('credentials',{
                email:data.email,password:data.password,callbackUrl:'/Profile'
            })
            router.push('/Profile')
        }catch(err){
            console.log(err)
        }
    },[data.email,data.password])
    const register = useCallback(async () => {
        try {
            await axios.post('/api/auth/register', {
                username:data.username,email:data.email,password:data.password
            })
            login()
        } catch (err) {
            console.log(err)
        }
    }, [])
    return (
        <div className={`relative bg-bg w-full ${toggle?'h-[700px]':'h-[895px]'}  bg-center bg-cover bg-no-repeat  `}>
            <div className='bg-black w-full h-full lg:bg-opacity-50 '>
                <nav className='flex flex-row justify-start items-center '>
                    <Image src={logo} alt='logo' className='md:w-80 md:h-20 sm:w-40 sm:h-20 w-36 h-16 object-contain p-2 ' />
                </nav>
                <div className='flex flex-row justify-center items-center'>
                    <div className='relative p-5  lg:w-1/3 w-11/12 mt-10 self-center rounded-md bg-black bg-opacity-70 flex-col'>
                        {toggle ?
                            <>
                                <h1 className='sm:text-2xl'>Sign Up</h1>
                                <div className='relative m-1'>
                                    <input id='email' type='email' name='email' placeholder='' className='w-full peer bg-neutral-800 p-4 my-3 rounded-sm outline-none border-none' onChange={handleInputs} />
                                    <label htmlFor='email' className='absolute text-md text-zinc-400 duration-150 transform -translate-x-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3'>
                                        Email
                                    </label>
                                </div>
                                <div className='relative m-1'>
                                    <input id='password' type='password' name='password' placeholder='' className='w-full peer bg-neutral-800 p-4 my-3 rounded-sm outline-none border-none ' onChange={handleInputs} />
                                    <label htmlFor='password' className='absolute text-md text-zinc-400 duration-150 transform -translate-x-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3'>
                                        Password
                                    </label>
                                </div>
                            </>

                            : <>
                                <h1 className='sm:text-2xl'>Sign In</h1>
                                <div className='relative'>
                                    <input id='username' type='text' name='username' placeholder='' className='w-full peer bg-neutral-800 p-4 my-3 rounded-sm outline-none border-none ' onChange={handleInputs} />
                                    <label htmlFor='username' className='absolute text-md text-zinc-500 duration-150  transform -translate-x-3  top-4 left-6 origin-[0]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3'>
                                        Name
                                    </label>
                                </div>
                                <div className='relative'>
                                    <input id='email' type='email' name='email' placeholder='' className='w-full peer bg-neutral-800 p-4 my-3 rounded-sm outline-none border-none ' onChange={handleInputs} />
                                    <label htmlFor='email' className='absolute text-md text-zinc-500 duration-150  transform -translate-x-3  top-4 left-5 origin-[0]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3'>
                                        Email
                                    </label>
                                </div>
                                <div className='relative'>
                                    <input id='password' type='password' name='password' placeholder='' className='w-full peer bg-neutral-800 p-4 my-3 rounded-sm outline-none border-none ' onChange={handleInputs} />
                                    <label htmlFor='password' className='absolute text-md text-zinc-500 duration-150  transform -translate-x-3  top-4 left-5 origin-[0]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3'>
                                        Password
                                    </label>
                                </div>
                                <div className='flex flex-row justify-start items-center p-3 space-x-3'>
                                    <input type='checkbox' />
                                    <h3 className='text-neutral-600 sm:text-base p-2'>I agree with <span className='text-white cursor-pointer hover:border-b-[1px] transition-all border-white'>terms and Conditions</span></h3>
                                </div>
                            </>}
                        {toggle ?
                            <button onClick={login} className='w-full p-4 bg-red-600 rounded-sm hover:bg-red-700 cursor-pointer transition-all'>
                                Sign Up
                            </button>
                            : <button onClick={register} className='w-full  p-4 bg-red-600 rounded-sm hover:bg-red-700 cursor-pointer transition-all'>
                                Sign In
                            </button>}

                        <h3 className='text-neutral-600 sm:text-base p-2'>Already have Account? <span className='text-white cursor-pointer hover:border-b-[1px] transition-all border-white' onClick={() => setToggle(!toggle)}>Sign in Now</span></h3>
                    </div>
                </div>
                <footer className='relative border-t-[2px] border-zinc-600 top-0 mt-16 bg-black self-center text-zinc-500 bg-opacity-70 p-7 space-x-3 space-y-5  '>
                    <h4 className='cursor-pointer'>Questions? Contact us.</h4>
                    <div className='flex flex-row justify-between items-center p-2'>
                        <ul>
                            <li className='cursor-pointer'>
                                FAQ
                            </li>
                            <li className='cursor-pointer'>
                                Cookie Preferences
                            </li>
                        </ul>
                        <ul>
                            <li className='cursor-pointer'>
                                Help Center
                            </li>
                            <li className='cursor-pointer'>
                                Corporate Information
                            </li>
                        </ul>
                        <ul>
                            <li className='cursor-pointer'>
                                Terms of Use
                            </li>
                        </ul>
                        <ul>
                            <li className='cursor-pointer'>
                                Privacy
                            </li>
                        </ul>
                    </div>
                    <div className='flex flex-row items-center border-[1px] border-zinc-600 w-fit  p-3  rounded-md'>
                        <TbWorld className='text-xl ' />  English
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default Auth