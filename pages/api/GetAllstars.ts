import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

export default async function GetStarId( req: NextApiRequest,res: NextApiResponse){
    if (req.method === "GET") {
    try {
        const stars = await prismadb.star.findMany();
        if (!stars) return res.status(404).json("error no movie found");
        return res.status(200).json(stars);
    } catch (err) {
        console.log(err);
        res.status(404).end();
    }
    }
};
