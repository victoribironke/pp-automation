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
      <title>profile picture history - twitter @victoribironke_ </title>
      <link rel="shortcut-icon" href={src} type="image/x-icon" />
      <link rel="icon" href={src} type="image/x-icon" />
      <meta
        name="description"
        content="history of the profile pictures of @victoribironke_ twitter account"
      />
    </Head>
  );
};

export default HeadTemplate;
