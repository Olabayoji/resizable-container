import { FC, ReactNode, useRef } from "react";

type Props = {
  children: ReactNode;
};

const ResizeableContainer: FC<Props> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef}>
      {children}

      {/* Slider */}
    </div>
  );
};

export default ResizeableContainer;
