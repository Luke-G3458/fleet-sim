export type NodeType = {
  id: string,
  x: number,
  y: number
}

const NodeLayer = ({ nodes }: { nodes: NodeType[] }) => {

  return (
    <>
      {nodes.map((node) => (
        <div className="absolute w-5 h-5 bg-[#d1664a] rounded-full" key={node.id}
          style={{
            left: node.x,
            top: node.y,
            transform: "translate(-50%, -50%)", // center on position
          }}
        />
      ))}
    </>
  );
}

export default NodeLayer;
