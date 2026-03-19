import AMR from "../AMR";
import { AMRType } from "../../types/types.ts";

const AMRLayer = ({ amrs }: { amrs: AMRType[] }) => {
  return (
    <>
      {amrs.map((amr) => (
        <AMR key={amr.id} amr={amr} />
      ))}
    </>
  );
};

export default AMRLayer;
