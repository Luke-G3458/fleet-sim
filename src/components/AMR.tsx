import { AMRType } from "../types/types.ts";

const AMR = ({ amr }: { amr: AMRType }) => {
  return (
    <div
      className="absolute h-20 w-30 z-10
        bg-[#1c1512] border border-7 border-[#3a3029]
        transition duration-200
        hover:bg-[#4a2419] hover:border-[#a0553b] hover:animate-pulse
        rounded-xl flex items-center justify-center"
      style={{
        left: amr.x,
        top: amr.y,
        transform: "translate(-50%, -50%)", // center on position
      }}
    >
      <div className="h-7 w-7 rounded-full border border-5 border-[#9a4f34]" />
    </div>
  );
};

export default AMR;
