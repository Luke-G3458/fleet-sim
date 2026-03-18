import { useState, useRef } from "react";
import World from "./World";
import GridLayer from "./layers/GridLayer";
import AMRLayer from "./layers/AMRLayer";

let Map = () => {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const dragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const WORLD_WIDTH = 2000;
  const WORLD_HEIGHT = 2000;

  // Example data (replace later with real state/backend)
  const amrs = [
    { id: 1, x: 300, y: 400 },
    { id: 2, x: 1200, y: 800 },
  ];

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

  //  Pan
  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current) return;

    const dx = e.clientX - lastMouse.current.x;
    const dy = e.clientY - lastMouse.current.y;

    setOffset((prev) => {
      const next = { x: prev.x + dx, y: prev.y + dy };
      return clampOffset(next.x, next.y, scale);
    });

    lastMouse.current = { x: e.clientX, y: e.clientY };
  };

  const stopDragging = () => {
    dragging.current = false;
  };

  //  Zoom (ctrl/pinch)
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault(); // 🔥 always stop browser behavior

    // =========================
    // 🔍 ZOOM (pinch / ctrl+wheel)
    // =========================
    if (e.ctrlKey) {
      const zoomFactor = 0.01;

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

    // =========================
    // 🖱️ PAN (scroll / trackpad)
    // =========================
    setOffset((prev) => {
      const next = {
        x: prev.x - e.deltaX,
        y: prev.y - e.deltaY,
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
      style={{ overscrollBehavior: "none", touchAction: "none" }}
    >
      {/* Camera */}
      <div
        className="absolute top-0 left-0 origin-top-left"
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
        }}
      >
        <World width={WORLD_WIDTH} height={WORLD_HEIGHT}>
          <GridLayer />
          <AMRLayer amrs={amrs} />
        </World>
      </div>
    </div>
  );
};

export default Map;
