import {NextApiRequest,NextApiResponse}from 'next'
import serverAuth from '@/lib/serverAuth'

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    try{
    if(req.method!=='GET'){
        res.status(404).end()
    }
    const {user}:any=await serverAuth(req,res);
    return res.status(200).json(user)
    }catch(err){
        res.status(500).end()
    }
}