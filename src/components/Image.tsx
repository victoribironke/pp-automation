const Image = ({ seed, type }: { seed: string; type: string }) => {
  // alt should be the date it was generated
  const styles = {
    lorelei: "lorelei",
    adventurerNeutral: "adventurer-neutral",
  };

  const style = styles[type as keyof typeof styles];

  const src = `https://api.dicebear.com/8.x/${style}/svg?seed=${seed}&flip=false`;

  return <img src={src} alt="hi" className="w-full max-w-[5rem] rounded-md" />;
};

export default Image;
