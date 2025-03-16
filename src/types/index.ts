import { ReactNode } from "react";

 type ResizableContainerProps = {
  children: ReactNode;
  direction?: "right" | "left" | "top" | "bottom";
  toggleKey?: string;
  initialSize?: number | string;
  maxSize?: number | string;
  minSize?: number | string;
  boundSize?: number | string;
  onResize?: (size: number) => void;
  animationDuration?: number;
  storageKey: string;
  ariaLabel?: string;
  containerClassName?: string;
  sliderClassName?: string;
  toggleButtonClassName?: string;
  toggleButtonIcon?: ReactNode;
};

export interface UseResizeOptions {
    direction?: "right" | "left" | "bottom" | "top";
    initialSize?: number | string;
    minSize?: number | string;
    maxSize?: number | string;
    boundSize?: number | string;
    onResize?: (size: number) => void;
    animationDuration?: number;
    storageKey: string;
    toggleKey?: string;
  }

  export type { ResizableContainerProps };