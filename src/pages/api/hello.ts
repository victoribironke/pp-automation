import axios from "axios";
import OAuth from "oauth-1.0a";
import { createHmac } from "crypto";
import { NextApiRequest, NextApiResponse } from "next";
import { SECRETS, convertSvgToBase64, getAvatar } from "@/utils/helpers";
import { firebaseLogin, saveImageToFirebase } from "@/utils/firebase";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { password } = req.query;

  if (password !== SECRETS.password) {
    res.status(500).json({ error: "Wrong or missing password" });
    return;
  }

  const API_KEY = SECRETS.apiKey;
  const API_SECRET_KEY = SECRETS.apiKeySecret;
  const ACCESS_TOKEN = SECRETS.accessToken;
  const ACCESS_TOKEN_SECRET = SECRETS.accessTokenSecret;

  try {
    const { avatar, seed } = getAvatar();
    const twitterAvatar = avatar.toString();
    const image = await convertSvgToBase64(twitterAvatar);

    const signedIn = await firebaseLogin(
      SECRETS.firebaseEmail,
      SECRETS.firebasePassword
    );

    if (signedIn) {
      await saveImageToFirebase(seed);
    }

    const oauth = new OAuth({
      consumer: { key: API_KEY, secret: API_SECRET_KEY },
      signature_method: "HMAC-SHA1",
      hash_function: (base_string, key) => {
        return createHmac("sha1", key).update(base_string).digest("base64");
      },
    });

    const token = {
      key: ACCESS_TOKEN,
      secret: ACCESS_TOKEN_SECRET,
    };

    const request_data = {
      url: "https://api.twitter.com/1.1/account/update_profile_image.json",
      method: "POST",
      data: {
        image,
      },
    };

    const response = await axios({
      url: request_data.url,
      method: request_data.method,
      headers: {
        ...oauth.toHeader(oauth.authorize(request_data, token)),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: new URLSearchParams(request_data.data).toString(),
    });

    console.log("Profile image updated successfully", response.data);

    res.status(200).json({ data: "Successful" });
  } catch (e: any) {
    console.error("Error updating profile image", e.response.data);

    res.status(500).json({ error: "An error occured" });
  }
};
