import React, {
  FC,
  ReactNode,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import styles from "./ResizeableContainer.module.css";

type Props = {
  children: ReactNode;
  direction?: "right" | "left" | "top" | "bottom";
  toggleKey?: string;
  initialSize?: number | string;
  minSize?: number | string;
  maxSize?: number | string;
  boundSize?: number | string;
  onResize?: (size: number) => void;
  animationDuration?: number;
  storageKey: string;
};

const ResizeableContainer: FC<Props> = ({
  children,
  direction = "right",
  initialSize,
  maxSize,
  minSize,
  boundSize,
  onResize,
  toggleKey,
  animationDuration = 300,
  storageKey,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<number | null>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [startMousePos, setStartMousePos] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  const minSizeNum =
    typeof minSize === "string" ? parseInt(minSize, 10) : minSize || 0;
  const maxSizeNum =
    typeof maxSize === "string" ? parseInt(maxSize, 10) : maxSize;
  const boundSizeNum =
    typeof boundSize === "string" ? parseInt(boundSize, 10) : boundSize || 0;

  const isHorizontal = direction === "right" || direction === "left";

  useEffect(() => {
    const storedData = localStorage.getItem(storageKey);
    let storedSize: number | null = null;
    let storedPreviousSize: number | null = null;

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      storedSize = parsedData.currentSize || null;
      storedPreviousSize = parsedData.previousSize || null;
    }

    if (containerRef.current) {
      const containerSize = isHorizontal
        ? containerRef.current.offsetWidth
        : containerRef.current.offsetHeight;
      const initialSizeNum =
        storedSize !== null
          ? storedSize
          : initialSize !== undefined
          ? typeof initialSize === "string"
            ? parseInt(initialSize, 10)
            : initialSize
          : Math.max(containerSize, boundSizeNum);

      setSize(initialSizeNum);
      if (storedPreviousSize === null) {
        localStorage.setItem(
          storageKey,
          JSON.stringify({
            currentSize: initialSizeNum,
            previousSize: initialSizeNum,
          })
        );
      }
    }
  }, [direction, boundSizeNum, isHorizontal, storageKey, initialSize]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsButtonVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  console.log(isButtonVisible);
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    setIsAnimating(false);
    setStartMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseUp = useCallback(() => {
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
  }, [storageKey, boundSizeNum, animationDuration, minSizeNum]);

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
          JSON.stringify({ currentSize: newSize, previousSize: newSize })
        );
        if (onResize) {
          onResize(newSize);
        }

        setStartMousePos({ x: e.clientX, y: e.clientY });
      }
    },
    [
      isResizing,
      direction,
      minSizeNum,
      maxSizeNum,
      onResize,
      isHorizontal,
      storageKey,
      size,
    ]
  );

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

  const handleSliderMouseEnter = useCallback(() => {
    setIsButtonVisible(true);
  }, []);

  const handleSliderMouseLeave = useCallback(() => {
    setIsButtonVisible(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.ctrlKey &&
        toggleKey &&
        e.key.toLowerCase() === toggleKey.toLowerCase()
      ) {
        toggleCollapse();
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleMouseMove, handleMouseUp, toggleCollapse, toggleKey]);

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${isAnimating ? styles.animating : ""}`}
      style={{
        [isHorizontal ? "width" : "height"]:
          size !== null ? `${size}px` : "auto",
        transition: isAnimating
          ? `${
              isHorizontal ? "width" : "height"
            } ${animationDuration}ms ease-in-out`
          : "none",
      }}
    >
      {children}
      <div
        className={`${styles.slider} ${styles[direction]}`}
        onMouseEnter={handleSliderMouseEnter}
        onMouseLeave={handleSliderMouseLeave}
      >
        <div className={styles.resizer} onMouseDown={handleMouseDown}>
          <span></span>
        </div>
        <button
          className={`${styles.toggleButton} ${
            !isButtonVisible ? styles.hidden : ""
          }`}
          onClick={toggleCollapse}
        >
          {">"}
        </button>
        <div className={styles.shadow} />
      </div>
    </div>
  );
};

export default ResizeableContainer;
