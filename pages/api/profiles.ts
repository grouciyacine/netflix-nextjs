import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
export default async function getProfiles(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(500).end();
    }
    try {
        const { user }:any =await serverAuth(req, res);
        if (!user) {
            return res.status(500).json("user not exist");
        }
        const profiles =await prismadb.profiles.findMany({
            where: {
                userId: user?.id,
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
