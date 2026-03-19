import { useState, useRef } from "react";
import World from "./World";
import GridLayer from "./layers/GridLayer";
import AMRLayer from "./layers/AMRLayer";
import NodeLayer from "./layers/NodeLayer";
import PathLayer from "./layers/PathLayer";
import { Path, Node, AMRType, Tool } from "../types/types";

let View = ({ tool }: { tool: Tool }) => {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const dragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const draggingNodeId = useRef<string | null>(null);
  const movedDuringDrag = useRef(false);

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const WORLD_WIDTH = 3000;
  const WORLD_HEIGHT = 3000;

  const amrs: AMRType[] = [
    { id: "1", x: 300, y: 400 },
    { id: "2", x: 1200, y: 800 },
    { id: "3", x: 100, y: 800 },
    { id: "4", x: 600, y: 1200 },
    { id: "5", x: 1500, y: 1500 },
  ];

  const [nodes, setNodes] = useState<Node[]>([
    { id: "6", x: 100, y: 300 },
    { id: "7", x: 900, y: 1200 },
  ]);

  const [paths, setPaths] = useState<Path[]>(([
    { id: "3", start: "6", end: "7" }
  ]));

  const screenToWorld = (clientX: number, clientY: number) => {
    const rect = containerRef.current!.getBoundingClientRect();

    const x = (clientX - rect.left - offset.x) / scale;
    const y = (clientY - rect.top - offset.y) / scale;

    return { x, y };
  };

  const clampOffset = (x: number, y: number, scale: number) => {
    const container = containerRef.current;
    if (!container) return { x, y };

    const rect = container.getBoundingClientRect();

    const scaledWidth = WORLD_WIDTH * scale;
    const scaledHeight = WORLD_HEIGHT * scale;

    const minX = Math.min(0, rect.width - scaledWidth);
    const minY = Math.min(0, rect.height - scaledHeight);

    return {
      x: Math.min(0, Math.max(minX, x)),
      y: Math.min(0, Math.max(minY, y)),
    };
  };

  const onMouseDown = (e: React.MouseEvent) => {
    movedDuringDrag.current = false;

    if (tool === "pan") {
      dragging.current = true;
      lastMouse.current = { x: e.clientX, y: e.clientY };
    }
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (tool === "pan") {
      if (!dragging.current) return;

      const dx = e.clientX - lastMouse.current.x;
      const dy = e.clientY - lastMouse.current.y;

      setOffset((prev) => {
        const next = { x: prev.x + dx, y: prev.y + dy };
        return clampOffset(next.x, next.y, scale);
      });

      lastMouse.current = { x: e.clientX, y: e.clientY };
      return;
    }

    if (tool === "node" && draggingNodeId.current) {
      movedDuringDrag.current = true;

      const { x, y } = screenToWorld(e.clientX, e.clientY);

      setNodes((prev) =>
        prev.map((n) =>
          n.id === draggingNodeId.current ? { ...n, x, y } : n
        )
      );
    }
  };

  const stopDragging = () => {
    dragging.current = false;
    draggingNodeId.current = null;
  };

  const onClick = (e: React.MouseEvent) => {
    if (tool !== "node") return;

    if (movedDuringDrag.current) return;

    const { x, y } = screenToWorld(e.clientX, e.clientY);

    const newNode: Node = {
      id: crypto.randomUUID(),
      x,
      y,
    };

    setNodes((prev) => [...prev, newNode]);
    setSelectedNodeId(null);
  };

  const handleNodeClick = (nodeId: string) => {
    if (tool !== "node") return;

    if (movedDuringDrag.current) return;

    if (!selectedNodeId) {
      setSelectedNodeId(nodeId);
      return;
    }

    if (selectedNodeId === nodeId) {
      setSelectedNodeId(null);
      return;
    }

    const newPath: Path = {
      id: crypto.randomUUID(),
      start: selectedNodeId,
      end: nodeId,
    };

    setPaths((prev) => [...prev, newPath]);
    setSelectedNodeId(null);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();

    if (e.ctrlKey) {
      const zoomFactor = 0.001;

      const newScale = Math.min(
        Math.max(scale - e.deltaY * zoomFactor, 0.2),
        3
      );

      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const worldX = (mouseX - offset.x) / scale;
      const worldY = (mouseY - offset.y) / scale;

      let newOffset = {
        x: mouseX - worldX * newScale,
        y: mouseY - worldY * newScale,
      };

      newOffset = clampOffset(newOffset.x, newOffset.y, newScale);

      setScale(newScale);
      setOffset(newOffset);
      return;
    }

    setOffset((prev) => {
      let dx = e.deltaX;
      let dy = e.deltaY;

      if (e.shiftKey) {
        dx = -e.deltaY;
        dy = 0;
      }

      const next = {
        x: prev.x - dx,
        y: prev.y - dy,
      };

      return clampOffset(next.x, next.y, scale);
    });
  };

  return (
    <div
      ref={containerRef}
      className="bg-app-bg h-full w-full overflow-hidden relative cursor-grab active:cursor-grabbing"
      onWheel={handleWheel}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
      onClick={onClick}
      style={{ overscrollBehavior: "none", touchAction: "none" }}
    >
      <div
        className="absolute top-0 left-0 origin-top-left"
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
        }}
      >
        <World width={WORLD_WIDTH} height={WORLD_HEIGHT}>
          <GridLayer />
          <PathLayer paths={paths} nodes={nodes} x={WORLD_WIDTH} y={WORLD_HEIGHT} />
          <NodeLayer
            nodes={nodes}
            tool={tool}
            draggingNodeId={draggingNodeId}
            selectedNodeId={selectedNodeId}
            onNodeClick={handleNodeClick}
          />
          <AMRLayer amrs={amrs} />
        </World>
      </div>
    </div>
  );
};

export default View;
