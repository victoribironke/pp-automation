import { adventurerNeutral } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { NextApiRequest, NextApiResponse } from "next";
import sharp from "sharp";
import { TwitterApi } from "twitter-api-v2";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {} = req.body;

  const SECRETS = {
    apiKey: process.env.API_KEY!,
    apiKeySecret: process.env.API_KEY_SECRET!,
    bearerToken: process.env.BEARER_TOKEN!,
    accessToken: process.env.ACCESS_TOKEN!,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET!,
    clientId: process.env.CLIENT_ID!,
    clientSecret: process.env.CLIENT_SECRET!,
  };

  const twitterClient = new TwitterApi({
    appKey: SECRETS.apiKey,
    appSecret: SECRETS.apiKeySecret,
    accessToken: SECRETS.accessToken,
    accessSecret: SECRETS.accessTokenSecret,
  });

  const getAvatar = () =>
    createAvatar(adventurerNeutral, {
      seed: Date.now().toString(),
      flip: true,
    });

  const saveImage = (str: string) =>
    sharp(Buffer.from(str))
      .png()
      .toFile("output.png", (err, info) => {
        if (err) {
          console.error("Error converting SVG to PNG:", err);
        } else {
          console.log("SVG successfully converted to PNG:", info);
        }
      });

  try {
    const twitterAvatar = getAvatar();
    saveImage(twitterAvatar.toString());
    setTimeout(
      async () =>
        await twitterClient.v1.updateAccountProfileImage("output.png"),
      1000
    );

    res.status(200).json({ data: "Successful" });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};
