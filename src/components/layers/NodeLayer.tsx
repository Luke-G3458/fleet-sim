import { Node, Tool } from "../../types/types";
import * as ContextMenu from "@radix-ui/react-context-menu";

type Props = {
  nodes: Node[];
  tool: Tool;
  draggingNodeId: React.MutableRefObject<string | null>;
  selectedNodeId: string | null;
  onNodeClick: (id: string) => void;
  deleteNode: (node: Node) => void;
};

const NodeLayer = ({ nodes, tool, draggingNodeId, selectedNodeId, onNodeClick, deleteNode }: Props) => {
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
        >
          <ContextMenu.Root>
            <ContextMenu.Trigger>
              <div className="w-5 h-5 rounded-full"
              />
            </ContextMenu.Trigger>
            <ContextMenu.Portal>
              <ContextMenu.Content className="w-30 rounded-md bg-box-bg shadow-lg">
                <ContextMenu.Item className="p-2 text-text-secondary hover:bg-text-secondary/10 focus:outline-none">Info</ContextMenu.Item>
                <ContextMenu.Item onClick={() => { deleteNode(node) }} className="p-2 text-element-error/90 font-bold hover:bg-element-error/10 focus:outline-none">Delete</ContextMenu.Item>
              </ContextMenu.Content>
            </ContextMenu.Portal>
          </ContextMenu.Root>
        </div>
      ))}
    </>
  );
};

export default NodeLayer;
