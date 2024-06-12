import HeadTemplate from "@/components/HeadTemplate";
import Image from "@/components/Image";
import { db } from "@/services/firebase";
import { Item } from "@/types/general";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

const Home = () => {
  const today = new Date().toISOString().split("T")[0];

  const [twtImages, setTWTImages] = useState<Item[]>([]);
  const [day, setDay] = useState(today);

  useEffect(() => {
    const twitterImages: Item[] = [];

    (async () => {
      const res = await getDocs(collection(db, "twitter"));

      res.forEach((t) => twitterImages.push(t.data() as Item));

      setTWTImages(
        twitterImages
          .filter((i) => {
            const date = (i.timestamp as any)
              .toDate()
              .toISOString()
              .split("T")[0];

            return date === day;
          })
          .sort((a, b) => (a.seed > b.seed ? 1 : -1))
      );
    })();
  }, [day]);

  return (
    <>
      <HeadTemplate pic={twtImages.at(-1)} />

      <div className="w-full max-w-4xl mb-6 flex items-center justify-between flex-wrap gap-4">
        <p className="text-white text-xl">
          <a
            href="https://twitter.com/victoribironke_"
            className="border-b pb-1"
            target="_blank"
            rel="noreferrer"
          >
            twitter
          </a>{" "}
          images
        </p>

        <input
          type="date"
          value={day}
          min="2024-06-11"
          max={today}
          onChange={(e) => setDay(e.target.value)}
          className="py-2 px-3 border border-white bg-transparent text-white rounded-lg"
        />
      </div>

      <section className="w-full max-w-4xl flex items-center justify-start gap-4 rounded-xl flex-wrap">
        {twtImages.map((t, i) => (
          <Image seed={t.seed} key={i} type={t.type} timestamp={t.timestamp} />
        ))}
      </section>
    </>
  );
};

export default Home;
