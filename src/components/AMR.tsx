type Props = {
  x: number;
  y: number;
};

const AMR = ({ x, y }: Props) => {
  return (
    <div
      className="absolute h-20 w-30 z-10 bg-[#1c1512] border border-[#3a3029] hover:bg-[#4a2419] hover:border-[#a0553b] rounded-xl flex items-center justify-center"
      style={{
        left: x,
        top: y,
        transform: "translate(-50%, -50%)", // center on position
      }}
    >
      <div className="h-5 w-5 rounded-full border border-[#9a4f34]" />
    </div>
  );
};

export default AMR;
