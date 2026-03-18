import { NodeType } from "./NodeLayer";

type PathType = {
  id: string,
  start: NodeType,
  end: NodeType
}

const PathLayer = ({ paths }: { paths: PathType[] }) => {
  return (
    <>
      <svg
        className="absolute inset-0 pointer-events-none"
        viewBox="0 0 2000 2000"
        preserveAspectRatio="none"
      >
        {paths.map((path) => (
          <line
            key={path.id}
            x1={path.start.x}
            y1={path.start.y}
            x2={path.end.x}
            y2={path.end.y}
            stroke="#9a4f34"
            strokeWidth="7"
          />
        ))}
      </svg >

    </>
  )
}

export default PathLayer;
