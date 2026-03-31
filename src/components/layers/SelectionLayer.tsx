type Props = {
  startingPoint: { x: number, y: number };
  endingPoint: { x: number, y: number };
}

const SelectLayer = ({ startingPoint, endingPoint }: Props) => {
  const width = Math.abs(endingPoint.x - startingPoint.x);
  const height = Math.abs(endingPoint.y - startingPoint.y);
  let translateX = 0;
  let translateY = 0;
  if (endingPoint.x < startingPoint.x) {
    translateX = 100;
  };
  if (endingPoint.y < startingPoint.y) {
    translateY = 100;
  }

  return (
    <div className="absolute inset-0 z-10 border-2 border-accent/60 bg-accent/10 rounded-md" style={{
      top: `${startingPoint.y}px`,
      left: `${startingPoint.x}px`,
      width: `${width}px`,
      height: `${height}px`,
      transform: `translate(-${translateX}%, -${translateY}%)`,
    }} />
  );
};

export default SelectLayer;
