import { NextApiRequest, NextApiResponse } from "next";
import { SECRETS } from "@/utils/helpers";
import { getLatestImage } from "@/utils/firebase";
import { Item } from "@/types/general";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { password } = req.query;

  if (password !== SECRETS.password) {
    res.status(500).json({ error: "Wrong or missing password" });
    return;
  }

  try {
    const item: Item = await getLatestImage();

    res.status(200).json({ data: item });
  } catch (e: any) {
    console.error("Error retrieving data", e);

    res.status(500).json({ error: "An error occured" });
  }
};
