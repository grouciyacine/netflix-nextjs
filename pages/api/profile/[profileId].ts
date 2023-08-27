import {NextApiRequest,NextApiResponse} from 'next'
import prismadb from "@/lib/prismadb";
export default async function getProfiles(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(500).end();
    }
    try {
        const {profileId}=req.query
        if(typeof profileId!=='string'){
            throw new Error('Invalid ID')
        }
        if(!profileId){
            throw new Error('Invalid ID')
        }
        const profiles =await prismadb.profiles.findUnique({
            where: {
                id: profileId,
            },
        });
        if (!profiles) {
            return res.status(404).json("no profiles exist");
        }
        return res.status(200).json(profiles);
    } catch (err) {
        res.status(500).end();
    }
}
