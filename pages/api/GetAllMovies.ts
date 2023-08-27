import {NextApiResponse,NextApiRequest} from 'next'
import prismadb from '@/lib/prismadb'

export default async function gelAll(req:NextApiRequest,res:NextApiResponse){
    if(req.method==='GET'){
        try{
            const AllMovies=await prismadb.movie.findMany()
            if(!AllMovies) return res.status(404).json("error")
            return res.status(200).json(AllMovies) 
        }catch(err){
            console.log(err)
            res.status(404).end()
        }
    }
}