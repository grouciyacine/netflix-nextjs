import {NextApiRequest,NextApiResponse} from 'next'
import prismadb from '@/lib/prismadb'

export default async function   GetMovies(req:NextApiRequest,res:NextApiResponse){
    if(req.method === 'GET'){
        try{
            const MoviesLength=await prismadb.movie.count()
            const randomIndex=Math.floor(Math.random()*MoviesLength)
            const movies=await prismadb.movie.findMany(
                {
                    take:1,
                    skip:randomIndex
                }
            )
            if(!movies){
                return res.status(404).json('no movie exist')
            }
            return res.status(200).json(movies[0])
        }catch(err){
            console.log(err)
            res.status(404).end()
        }
    }
}