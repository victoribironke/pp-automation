import { Item } from "@/types/general";
import Head from "next/head";

const HeadTemplate = ({ pic }: { pic: Item | undefined }) => {
  const styles = {
    lorelei: "lorelei",
    adventurerNeutral: "adventurer-neutral",
  };

  const style = styles[(pic?.type || "lorelei") as keyof typeof styles];

  const src = `https://api.dicebear.com/8.x/${style}/svg?seed=${
    pic?.seed || "0"
  }&flip=true`;

  return (
    <Head>
      <title>profile picture history - twitter @victoribironke_</title>
      <link rel="shortcut-icon" href={src} type="image/x-icon" />
      <link rel="icon" href={src} type="image/x-icon" />
      <meta
        name="description"
        content="history of the profile pictures of @victoribironke_ twitter account"
      />
      {/* <!-- Facebook Meta Tags --> */}
      <meta
        property="og:url"
        content="https://profile-picture-automation.vercel.app/"
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content="profile picture history - twitter @victoribironke_"
      />
      <meta
        property="og:description"
        content="history of the profile pictures of @victoribironke_ twitter account"
      />
      <meta property="og:image" content={src} />
      {/* <!-- Twitter Meta Tags --> */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        property="twitter:domain"
        content="www.profile-picture-automation.vercel.app/"
      />
      <meta
        property="twitter:url"
        content="https://profile-picture-automation.vercel.app/"
      />
      <meta
        name="twitter:title"
        content="profile picture history - twitter @victoribironke_"
      />
      <meta
        name="twitter:description"
        content="history of the profile pictures of @victoribironke_ twitter account"
      />
      <meta name="twitter:image" content={src} />
    </Head>
  );
};

export default HeadTemplate;
