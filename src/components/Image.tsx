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
        className="w-full max-w-[5rem] md:max-w-[7rem] rounded-md cursor-pointer"
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
