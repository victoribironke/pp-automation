import "@/styles/globals.css";
import { Bricolage_Grotesque } from "next/font/google";
import type { AppProps } from "next/app";

const bg = Bricolage_Grotesque({ subsets: ["latin"], display: "swap" });

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <main
      className={
        "min-h-screen w-full bg-black flex items-center justify-start flex-col relative p-6 " +
        bg.className
      }
    >
      <Component {...pageProps} />
    </main>
  );
};

export default App;
