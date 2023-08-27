import {getServerSession} from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import {NextApiRequest,NextApiResponse} from 'next'
import prismadb from '@/lib/prismadb'

const serverAuth=async(Req:NextApiRequest,Res:NextApiResponse)=>{
try{
const session=await getServerSession(Req,Res,authOptions)
if(!session?.user?.email){
    throw new Error('Invalid session')
}
const user=await prismadb.user.findUnique({where:{email:session?.user?.email}})
if(!user){
    throw new Error('Invalid user')
}
return {user}
}catch(err){
    Res.status(500).end()
}
}
export default serverAuth