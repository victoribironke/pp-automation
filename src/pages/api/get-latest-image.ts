import { NextApiRequest, NextApiResponse } from "next";
import { SECRETS } from "@/utils/helpers";
import axios from "axios";
import OAuth from "oauth-1.0a";
import { createHmac } from "crypto";

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
    const oauth = new OAuth({
      consumer: { key: API_KEY, secret: API_SECRET_KEY },
      signature_method: "HMAC-SHA1",
      hash_function: (base_string, key) =>
        createHmac("sha1", key).update(base_string).digest("base64"),
    });

    const token = {
      key: ACCESS_TOKEN,
      secret: ACCESS_TOKEN_SECRET,
    };

    const request_data = {
      url: "https://api.twitter.com/1.1/account/verify_credentials.json",
      method: "GET",
    };

    const response = await axios({
      url: request_data.url,
      method: request_data.method,
      headers: {
        ...oauth.toHeader(oauth.authorize(request_data, token)),
      },
    });

    res.status(200).json({ data: response.data.profile_image_url_https });
  } catch (e: any) {
    console.error("Error retrieving data", e.data);

    res.status(500).json({ error: "An error occured" });
  }
};
