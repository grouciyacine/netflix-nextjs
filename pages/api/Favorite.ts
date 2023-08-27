import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
import { without } from "lodash";
export default async function HandlerFavorite(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { movieId } = req.body;
    const { user }:any = await serverAuth(req, res);
    if (!movieId) return res.status(404).json("ERROR NO MOVIE ID");
    await prismadb.user.update({
      where: { email: user?.email },
      data: { favoriteID: { push: movieId } },
    });
    return res.status(200).json("Movie Added With Success");
  } else if (req.method === "PATCH") {
    const { movieId } = req.body;
    const { user }:any = await serverAuth(req, res);
    const updatedFavoriteIds = without(user?.favoriteID, movieId);
    if (!movieId) return res.status(404).json("ERROR NO MOVIE ID");
    await prismadb.user.update({
      where: { email: user.email },
      data: { favoriteID: updatedFavoriteIds },
    });
    return res.status(200).json("Movie remove With Success");
  }
}
