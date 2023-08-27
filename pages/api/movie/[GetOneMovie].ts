import {NextApiRequest,NextApiResponse} from 'next'
import prismadb from '@/lib/prismadb'

export default async function GetMovie(req:NextApiRequest,res:NextApiResponse){
    if(req.method!=='GET'){
        res.status(404).end()
    }
    try{
    const {GetOneMovie}=req.query
    if(typeof GetOneMovie !== 'string'){
        return res.status(400).json('id should be string')
    }
    const movie=await prismadb.movie.findUnique({
        where:{id:GetOneMovie}
    })
    return res.status(200).json(movie)
    }catch(err){
        console.log(err)
        res.status(400).end()
    }
}