import { Item } from "@/types/general";
import { Tooltip } from "react-tooltip";

const Image = ({ seed, type, timestamp }: Item) => {
  const datetime = (timestamp as any).toDate().toLocaleString();

  const styles = {
    lorelei: "lorelei",
    adventurerNeutral: "adventurer-neutral",
  };

  const style = styles[type as keyof typeof styles];

  const src = `https://api.dicebear.com/8.x/${style}/svg?seed=${seed}&flip=true`;

  return (
    <>
      <img
        src={src}
        alt={datetime}
        data-tooltip-id={seed}
        data-tooltip-content={datetime}
        className="rounded-md cursor-pointer w-[25%] max-w-[3.8rem] sm:max-w-[6rem]"
      />

      <Tooltip
        id={seed}
        arrowColor="#fff"
        style={{ background: "white", color: "black", borderRadius: "8px" }}
      />
    </>
  );
};

export default Image;
