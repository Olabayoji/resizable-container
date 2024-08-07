import React, {
  FC,
  ReactNode,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import classNames from "classnames";
import styles from "./ResizeableContainer.module.scss";
import { useResize } from "../hooks/useResize";

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
  ariaLabel?: string;
  containerClassName?: string;
  childWrapperClassName?: string;
  sliderClassName?: string;
  toggleButtonClassName?: string;
};

const ResizableContainer: FC<Props> = ({
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
  ariaLabel,
  containerClassName,
  childWrapperClassName,
  sliderClassName,
  toggleButtonClassName,
}) => {
  const {
    containerRef,
    size,
    isAnimating,
    handleMouseDown,
    handleMouseUp,
    toggleCollapse,
    isHorizontal,
  } = useResize({
    direction,
    initialSize,
    minSize,
    maxSize,
    boundSize,
    onResize,
    animationDuration,
    storageKey,
  });

  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [isToggleButtonClicked, setIsToggleButtonClicked] = useState(false);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsButtonVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
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

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [toggleCollapse, toggleKey]);

  const handleSliderMouseEnter = useCallback(() => {
    setIsButtonVisible(true);
  }, []);

  const handleSliderMouseLeave = useCallback(() => {
    setIsButtonVisible(false);
  }, []);

  const handleToggleButtonClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsToggleButtonClicked(true);
      toggleCollapse();
    },
    [toggleCollapse]
  );

  const handleContainerMouseUp = useCallback(() => {
    handleMouseUp(!isToggleButtonClicked);
    setIsToggleButtonClicked(false);
  }, [handleMouseUp, isToggleButtonClicked]);

  useEffect(() => {
    document.addEventListener("mouseup", handleContainerMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleContainerMouseUp);
    };
  }, [handleContainerMouseUp]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleCollapse();
      }
    },
    [toggleCollapse]
  );

  return (
    <div
      ref={containerRef}
      className={classNames(styles.container, containerClassName, {
        [styles.animating]: isAnimating,
      })}
      style={{
        [isHorizontal ? "width" : "height"]:
          size !== null ? `${size}px` : `${maxSize}px`,
        transition: isAnimating
          ? `${
              isHorizontal ? "width" : "height"
            } ${animationDuration}ms ease-in-out`
          : "none",
      }}
      role="region"
      aria-label={ariaLabel}
    >
      <div className={classNames(styles.childWrapper, childWrapperClassName)}>
        {children}
      </div>
      <div
        className={classNames(
          styles.slider,
          styles[direction],
          sliderClassName
        )}
        onMouseEnter={handleSliderMouseEnter}
        onMouseLeave={handleSliderMouseLeave}
        onMouseDown={handleMouseDown}
        role="separator"
        aria-valuenow={Number(size)}
        aria-valuemin={Number(minSize)}
        aria-valuemax={Number(maxSize)}
        aria-orientation={isHorizontal ? "horizontal" : "vertical"}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <div className={styles.resizer} aria-hidden="true"></div>
        <button
          ref={toggleButtonRef}
          className={classNames(styles.toggleButton, toggleButtonClassName, {
            [styles.hidden]: !isButtonVisible,
          })}
          onClick={handleToggleButtonClick}
          aria-label={`Toggle ${direction} panel`}
          aria-expanded={size !== minSize}
        >
          <i
            className={getIconClass(size === minSize, direction)}
            aria-hidden="true"
          ></i>
        </button>
        <div className={styles.shadow} aria-hidden="true" />
      </div>
    </div>
  );
};

export default ResizableContainer;

const getIconClass = (isCollapsed: boolean, direction: string): string => {
  const baseClass = "fas fa-chevron-";

  switch (direction) {
    case "right":
      return `${baseClass}${isCollapsed ? "right" : "left"}`;
    case "left":
      return `${baseClass}${isCollapsed ? "left" : "right"}`;
    case "top":
      return `${baseClass}${isCollapsed ? "up" : "down"}`;
    case "bottom":
      return `${baseClass}${isCollapsed ? "down" : "up"}`;
    default:
      return `${baseClass}right`;
  }
};
