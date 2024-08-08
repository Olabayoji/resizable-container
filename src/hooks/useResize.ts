import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Interface for the options used in the `useResize` hook.
 */
interface UseResizeOptions {
  direction?: "right" | "left" | "bottom" | "top"; // The direction of the resizable container
  initialSize?: number | string; // The initial size of the container
  minSize?: number | string; // The minimum size of the container
  maxSize?: number | string; // The maximum size of the container
  boundSize?: number | string; // The bound size of the container
  onResize?: (size: number) => void; // Callback function for when the container is resized
  animationDuration?: number; // The duration of the animation when the container is collapsed
  storageKey: string; // The key used to store the container size in localStorage
}

/**
 * A custom hook that manages the resizing logic for a resizable container.
 *
 * @param {UseResizeOptions} options - The options for the `useResize` hook.
 * @returns {Object} - The resizing-related state and functions.
 */
const useResize = ({
  direction = "right",
  initialSize,
  minSize,
  maxSize,
  boundSize,
  onResize,
  animationDuration = 300,
  storageKey,
}: UseResizeOptions) => {
  const containerRef = useRef<HTMLDivElement>(null); // Reference to the container element
  const [size, setSize] = useState<number | null>(() => {
    // Get the stored size from localStorage, or use the initialSize if it's not stored
    const storedData = localStorage.getItem(storageKey);
    if (storedData) {
      return JSON.parse(storedData).currentSize;
    }
    return initialSize || 0; // Use the initialSize if it's provided, or default to 0
  });
  const [isResizing, setIsResizing] = useState(false); // Whether the container is currently being resized
  const [isAnimating, setIsAnimating] = useState(false); // Whether the container is currently animating
  const [startMousePos, setStartMousePos] = useState<{
    x: number;
    y: number;
  } | null>(null); // The starting mouse position during a resize

  // Convert minSize, maxSize, and boundSize to numbers if they are strings
  const minSizeNum =
    typeof minSize === "string" ? parseInt(minSize, 10) : minSize || 0;
  const maxSizeNum =
    typeof maxSize === "string" ? parseInt(maxSize, 10) : maxSize;
  const boundSizeNum =
    typeof boundSize === "string" ? parseInt(boundSize, 10) : boundSize || 0;

  const isHorizontal = direction === "right" || direction === "left"; // Whether the container is resizable horizontally

  // Handle mouse down event to start resizing
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    setIsAnimating(false);
    setStartMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  // Handle mouse up event to stop resizing
  const handleMouseUp = useCallback(
    (shouldExecute: boolean = true) => {
      if (!shouldExecute) {
        setIsResizing(false);
        return;
      }

      setIsResizing(false);
      setSize((currentSize) => {
        if (currentSize !== null) {
          const newSize = currentSize < boundSizeNum ? minSizeNum : currentSize;
          localStorage.setItem(
            storageKey,
            JSON.stringify({
              currentSize: newSize,
              previousSize: Math.max(newSize, boundSizeNum),
            })
          );
          if (currentSize < boundSizeNum) {
            setIsAnimating(true);
            setTimeout(() => setIsAnimating(false), animationDuration);
            return minSizeNum;
          }
        }
        return currentSize;
      });
    },
    [storageKey, boundSizeNum, animationDuration, minSizeNum]
  );

  // Handle mouse move event during resizing
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isResizing && containerRef.current && startMousePos) {
        const offsetX = e.clientX - startMousePos.x;
        const offsetY = e.clientY - startMousePos.y;

        let newSize: number;
        if (isHorizontal) {
          newSize = (size || 0) + (direction === "right" ? offsetX : -offsetX);
        } else {
          newSize = (size || 0) + (direction === "bottom" ? offsetY : -offsetY);
        }

        newSize = Math.max(newSize, minSizeNum);
        if (maxSizeNum !== undefined) {
          newSize = Math.min(newSize, maxSizeNum);
        }

        setSize(newSize);
        localStorage.setItem(
          storageKey,
          JSON.stringify({
            currentSize: newSize,
            previousSize: newSize,
          })
        );
        if (onResize) {
          onResize(newSize);
        }

        setStartMousePos({ x: e.clientX, y: e.clientY });
      }
    },
    [
      isResizing,
      startMousePos,
      isHorizontal,
      minSizeNum,
      maxSizeNum,
      storageKey,
      onResize,
      size,
      direction,
    ]
  );

  // Handle the toggle collapse functionality
  const toggleCollapse = useCallback(() => {
    setSize((currentSize) => {
      const storage = localStorage.getItem(storageKey);
      let previousSize = currentSize;
      if (storage) {
        previousSize = JSON.parse(storage).previousSize;
      }
      const newSize = currentSize === minSizeNum ? previousSize : minSizeNum;
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), animationDuration);
      localStorage.setItem(
        storageKey,
        JSON.stringify({ currentSize: newSize, previousSize })
      );
      return newSize;
    });
  }, [minSizeNum, animationDuration, storageKey]);

  // Add event listener for mouse move during resizing
  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  return {
    containerRef,
    size,
    isAnimating,
    handleMouseDown,
    toggleCollapse,
    isHorizontal,
    handleMouseUp,
    isResizing,
  };
};

export default useResize;
