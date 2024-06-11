import HeadTemplate from "@/components/HeadTemplate";
import Image from "@/components/Image";
import { db } from "@/services/firebase";
import { Item } from "@/types/general";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

const Home = () => {
  const [twtImages, setTWTImages] = useState<Item[]>([]);

  useEffect(() => {
    const twitterImages: Item[] = [];

    (async () => {
      const res = await getDocs(collection(db, "twitter"));

      res.forEach((t) => twitterImages.push(t.data() as Item));

      setTWTImages(twitterImages.sort((a, b) => (a.seed > b.seed ? 1 : -1)));
    })();
  }, []);

  return (
    <>
      <HeadTemplate pic={twtImages.at(-1)} />

      <p className="text-white w-full max-w-4xl text-left mb-6 text-xl">
        twitter images
      </p>

      <section className="w-full max-w-4xl flex items-center justify-start gap-4 rounded-xl flex-wrap">
        {twtImages.map((t, i) => (
          <Image seed={t.seed} key={i} type={t.type} timestamp={t.timestamp} />
        ))}
      </section>
    </>
  );
};

export default Home;
