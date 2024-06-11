import "@/styles/globals.css";
// import { classNames } from "@/utils/helpers";
// import { Bricolage_Grotesque } from "next/font/google";
import type { AppProps } from "next/app";

// const bg = Bricolage_Grotesque({ subsets: ["latin"], display: "swap" });

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <main
      // className={classNames(
      //   bg.className,
      //   "min-h-screen w-full flex items-center justify-start flex-col relative"
      // )}
      className="min-h-screen w-full flex items-center justify-start flex-col relative"
    >
      <Component {...pageProps} />;
    </main>
  );
};

export default App;
