import { Node, Tool } from "../../types/types";

type Props = {
  nodes: Node[];
  tool: Tool;
  draggingNodeId: React.MutableRefObject<string | null>;
};

const NodeLayer = ({ nodes, tool, draggingNodeId }: Props) => {
  return (
    <>
      {nodes.map((node) => (
        <div
          key={node.id}
          className="absolute w-5 h-5 bg-[#d1664a] rounded-full cursor-pointer"
          style={{
            left: node.x,
            top: node.y,
            transform: "translate(-50%, -50%)",
          }}
          onMouseDown={(e) => {
            if (tool !== "node") return;

            e.stopPropagation();
            draggingNodeId.current = node.id;
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      ))}
    </>
  );
};

export default NodeLayer;
