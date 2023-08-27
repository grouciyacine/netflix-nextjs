import {NextApiRequest,NextApiResponse} from 'next'
import prismadb from '@/lib/prismadb'
import serverAuth from '@/lib/serverAuth'

export default async function (req: NextApiRequest, res: NextApiResponse){
    if(req.method ==='GET'){
        const {user}:any=await serverAuth(req,res)
        const movies=await prismadb.movie.findMany({where:{id:{in:user?.favoriteID}}})
        if(!movies){
            return  res.status(200).json('0 Favorite movies')
        }
        return res.status(200).json(movies)
    }
    

}