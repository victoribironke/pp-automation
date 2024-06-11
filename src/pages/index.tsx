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

      setTWTImages(twitterImages);
    })();
  }, []);

  return (
    <>
      <HeadTemplate />

      <p className="text-white w-full text-left mb-6 text-xl">Twitter images</p>

      <section className="w-full max-w-6xl flex items-center justify-start gap-4 rounded-xl">
        {twtImages.map((t, i) => (
          <Image seed={t.seed} key={i} type={t.type} />
        ))}
      </section>
    </>
  );
};

export default Home;
