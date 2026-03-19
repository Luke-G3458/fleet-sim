import { Node, Tool } from "../../types/types";

type Props = {
  nodes: Node[];
  tool: Tool;
  draggingNodeId: React.MutableRefObject<string | null>;
  selectedNodeId: string | null;
  onNodeClick: (id: string) => void;
};

const NodeLayer = ({ nodes, tool, draggingNodeId, selectedNodeId, onNodeClick }: Props) => {
  return (
    <>
      {nodes.map((node) => (
        <div
          key={node.id}
          className={`absolute w-5 h-5 rounded-full cursor-pointer ${selectedNodeId === node.id ? "bg-rail-hover" : "bg-rail"
            }`}
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
            onNodeClick(node.id);
          }}
        />
      ))}
    </>
  );
};

export default NodeLayer;
