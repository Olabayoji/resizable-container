import { useState, useEffect, useCallback, useRef } from "react";
import { UseResizeOptions } from "../types";



export const useResize = ({
  direction = "right",
  initialSize,
  minSize,
  maxSize,
  boundSize,
  onResize,
  storageKey,
  toggleKey
}: UseResizeOptions) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Default initial size if not provided.
  const defaultInitialSize =
    initialSize !== undefined ? parseInt(initialSize as string, 10) : 200;

  // Helper to convert size props to numbers.
  const parseSize = (
    value: number | string | undefined,
    defaultVal: number = 0
  ): number => {
    if (typeof value === "number") return value;
    if (typeof value === "string") {
      const parsed = parseInt(value, 10);
      return isNaN(parsed) ? defaultVal : parsed;
    }
    return defaultVal;
  };

  const minSizeNum = parseSize(minSize, 0);
  const maxSizeNum = maxSize !== undefined ? parseSize(maxSize) : undefined;
  const boundSizeNum = parseSize(boundSize, 0);

  // Retrieve stored size from localStorage.
  const getStoredSize = (): number => {
    if (typeof window === "undefined") return defaultInitialSize;
    try {
      const storedData = localStorage.getItem(storageKey);
      if (storedData) {
        const parsed = JSON.parse(storedData);
        return parsed.currentSize || defaultInitialSize;
      }
    } catch (err) {
      console.error("Error reading stored size:", err);
    }
    return defaultInitialSize;
  };

  const [size, setSize] = useState<number>(() => getStoredSize());
  const [isAnimating, setIsAnimating] = useState(false);

  // Ref to track the starting pointer position; when non-null, we’re actively resizing.
  const startPosRef = useRef<{ x: number; y: number } | null>(null);
  // Ref to track the last expanded (non-collapsed) size.
  const lastExpandedSizeRef = useRef<number>(getStoredSize());

  // Refs for throttling move events.
  const frameRef = useRef<number | null>(null);
  const latestEventRef = useRef<MouseEvent | PointerEvent | null>(null);

  const isHorizontal = direction === "right" || direction === "left";

  // Helper: update localStorage with both current and last expanded sizes.
  const updateStorage = useCallback((currentSize: number, previousSize: number) => {
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ currentSize, previousSize })
      );
    } catch (err) {
      console.error("Error saving size to localStorage:", err);
    }
  }, [storageKey]);

  // Begin a resizing action by storing the pointer's start position.
  const startResizing = useCallback((clientX: number, clientY: number) => {
    startPosRef.current = { x: clientX, y: clientY };
  }, []);

  // Improved helper: traverse up the DOM tree to check for data-ignore-resize.
  const shouldIgnoreResize = (e: Event): boolean => {
    let target = e.target as HTMLElement | null;
    while (target) {
      if (target.getAttribute("data-ignore-resize") === "true") {
        return true;
      }
      target = target.parentElement;
    }
    return false;
  };

  // Mouse down handler.
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (shouldIgnoreResize(e.nativeEvent)) return;
      e.preventDefault();
      startResizing(e.clientX, e.clientY);
    },
    [startResizing]
  );

  // Pointer down handler with pointer capture.
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (shouldIgnoreResize(e.nativeEvent)) return;
      e.preventDefault();
      if (e.currentTarget && e.currentTarget.setPointerCapture) {
        e.currentTarget.setPointerCapture(e.pointerId);
      }
      startResizing(e.clientX, e.clientY);
    },
    [startResizing]
  );

  // Process move events: compute the offset and update the size.
  const processMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!startPosRef.current) return;
      const offsetX = clientX - startPosRef.current.x;
      const offsetY = clientY - startPosRef.current.y;
      setSize((prevSize) => {
        let newSize = prevSize;
        if (isHorizontal) {
          newSize = prevSize + (direction === "right" ? offsetX : -offsetX);
        } else {
          newSize = prevSize + (direction === "top" ? offsetY : -offsetY);
        }
        
        newSize = Math.max(newSize, minSizeNum);
        if (maxSizeNum !== undefined) {
          newSize = Math.min(newSize, maxSizeNum);
        }
        if (newSize > minSizeNum) {
          lastExpandedSizeRef.current = newSize;
        }
        if (onResize) onResize(newSize);
        return newSize;
      });
      startPosRef.current = { x: clientX, y: clientY };
    },
    [isHorizontal, direction, minSizeNum, maxSizeNum, onResize]
  );

  // Throttle move events with requestAnimationFrame.
  const handleMove = useCallback(
    (e: MouseEvent | PointerEvent) => {
      latestEventRef.current = e;
      if (frameRef.current === null) {
        frameRef.current = requestAnimationFrame(() => {
          if (latestEventRef.current) {
            processMove(
              latestEventRef.current.clientX,
              latestEventRef.current.clientY
            );
          }
          frameRef.current = null;
        });
      }
    },
    [processMove]
  );

  // Finish resizing on mouse/pointer up.
  const finishResizing = useCallback(() => {
    if (startPosRef.current) {
      setSize((currentSize) => {
        const finalSize = currentSize < boundSizeNum ? minSizeNum : currentSize;
        if (finalSize > minSizeNum) {
          lastExpandedSizeRef.current = finalSize;
        }
        updateStorage(finalSize, lastExpandedSizeRef.current);
        if (currentSize < boundSizeNum) {
          setIsAnimating(true);
        }
        return finalSize;
      });
      startPosRef.current = null;
    }
  }, [boundSizeNum, minSizeNum, updateStorage]);

  const handleMouseUp = useCallback(() => {
    finishResizing();
  }, [finishResizing]);

  const handlePointerUp = useCallback(() => {
    finishResizing();
  }, [finishResizing]);

  // Toggle collapse/expand: if collapsed, restore the last expanded size.
  const toggleCollapse = useCallback(() => {
    setSize((currentSize) => {
      const newSize =
        currentSize === minSizeNum ? lastExpandedSizeRef.current : minSizeNum;
        console.log(currentSize, newSize)
      setIsAnimating(true);
      updateStorage(newSize, lastExpandedSizeRef.current);
      return newSize;
    });
    
  }, [minSizeNum, updateStorage]);


// Toggle collapse/expand with keyboard shortcut.
  const handleToggleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === toggleKey) {
        e.preventDefault();
        toggleCollapse();
      }
    },
    [toggleCollapse, toggleKey]
  );

  // Attach document-level listeners.
  useEffect(() => {
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("pointermove", handleMove);
    document.addEventListener("pointerup", handlePointerUp);
    document.addEventListener("keydown", handleToggleKeyDown);
    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerup", handlePointerUp);
      document.removeEventListener("keydown", handleToggleKeyDown);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [handleMove, handleMouseUp, handlePointerUp, handleToggleKeyDown]);

  const handleTransitionEnd = useCallback(() => {
    setIsAnimating(false);
  }, []);

  return {
    containerRef,
    size,
    isAnimating,
    handleMouseDown,
    handlePointerDown,
    toggleCollapse,
    isHorizontal,
    handleMouseUp,
    isResizing: !!startPosRef.current,
    handleTransitionEnd,
  };
};

export default useResize;
