import bcrypt from 'bcrypt'
import {NextApiRequest,NextApiResponse}  from 'next'
import  prismadb from '@/lib/prismadb'

export default async function handler(req: NextApiRequest,res: NextApiResponse){
if(req.method!=='POST'){
    return res.status(404).json('BAD Request')
}
try{
const {email,password,username}=req.body
const existingUser=await prismadb.user.findUnique({where:{email:email}})
if(existingUser){
    return res.status(500).json('User already exists')
}
const hashPassword=await bcrypt.hash(password,12)
const user=await prismadb.user.create({
    data:{
email:email,
password:hashPassword,
username:username,
cretedAt:new Date(),
image:''
    }
})
}catch(err){
console.log(err)
return res.status(500).end()
}
}