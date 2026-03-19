import { Path, Node } from "../../types/types.ts";


const PathLayer = ({ paths, nodes, x, y }: { paths: Path[], nodes: Node[], x: number, y: number }) => {
  const nodeMap = new Map(nodes.map(n => [n.id, n]));
  return (
    <>
      <svg
        className="absolute pointer-events-none"
        viewBox={`0 0 ${x} ${y}`}
        preserveAspectRatio="none"
      >
        {paths.map((path) => {
          const start = nodeMap.get(path.start);
          const end = nodeMap.get(path.end);

          if (!start || !end) {
            return null;
          }

          return (
            <line
              key={path.id}
              x1={start.x}
              y1={start.y}
              x2={end.x}
              y2={end.y}
              stroke="#9a4f34"
              strokeWidth="7"
            />
          )
        })}
      </svg >

    </>
  )
}

export default PathLayer;
