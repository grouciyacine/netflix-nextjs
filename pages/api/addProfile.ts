import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function AddProfile(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        try {
            const { user }:any = await serverAuth(req, res);
            const { img, title } = req.body;
            if (!user) {
                return res.status(404).json("user not found");
            }
            if (!img || !title) {
                return res.status(404).json("img and title required");
            }
            await prismadb.profiles.create({
                data: { img: img, title: title, userId: user?.id },
            });
            return res.status(200).json("success");
        } catch (err) {
            res.status(500).end(err);
        }
    }
    if (req.method === "PATCH") {
        const { img, title,id } = req.body;
        const { user }:any = await serverAuth(req, res);
        if (!user) {
            return res.status(404).json("user not found");
        }
        if (!img || !title) {
            return res.status(404).json("img and title required");
        }
        await prismadb.profiles.update({where:{
            id:id
        },data:{
            title:title,
            img:img
        }})
        return res.status(200).json("success");
    }
}
