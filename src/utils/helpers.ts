import { adventurerNeutral } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import sharp from "sharp";

export const SECRETS = {
  apiKey: process.env.API_KEY!,
  apiKeySecret: process.env.API_KEY_SECRET!,
  bearerToken: process.env.BEARER_TOKEN!,
  accessToken: process.env.ACCESS_TOKEN!,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET!,
  clientId: process.env.CLIENT_ID!,
  clientSecret: process.env.CLIENT_SECRET!,
  password: process.env.PASSWORD!,
};

export const getAvatar = () => {
  const seed = Date.now().toString();

  const avatar = createAvatar(adventurerNeutral, {
    seed,
    flip: true,
  });

  return { seed, avatar };
};

export const convertSvgToBase64 = async (avatar: string) => {
  const svgBuffer = Buffer.from(avatar);
  const buffer = await sharp(svgBuffer).png().toBuffer();
  const image = buffer.toString("base64");

  return image;
};
