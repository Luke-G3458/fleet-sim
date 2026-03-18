import AMR from "../AMR";

type AMRType = {
  id: number;
  x: number;
  y: number;
};

const AMRLayer = ({ amrs }: { amrs: AMRType[] }) => {
  return (
    <>
      {amrs.map((amr) => (
        <AMR key={amr.id} x={amr.x} y={amr.y} />
      ))}
    </>
  );
};

export default AMRLayer;
