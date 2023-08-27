import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

const GetStarId = async ( req: NextApiRequest,res: NextApiResponse,) => {
    if (req.method !== "GET") {
        res.status(500).end();
    }
    try {
        const { GetStar }: any = req.query;
        if (!GetStar) return res.status(404).json("error no id");
        const stars = await prismadb.star.findUnique({where:{id:GetStar}});
        if (!stars) return res.status(404).json("error no movie found");
        return res.status(200).json(stars);
    } catch (err) {
        console.log(err);
        return res.status(404).end();
    }
};
export default GetStarId;
