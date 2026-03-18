type Props = {
  width: number;
  height: number;
  children: React.ReactNode;
};

const World = ({ width, height, children }: Props) => {
  return (
    <div
      className="relative"
      style={{ width, height }}
    >
      {children}
    </div>
  );
};

export default World;
