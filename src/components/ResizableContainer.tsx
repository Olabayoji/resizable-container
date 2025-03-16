import React, { FC, useCallback } from "react";
import classNames from "classnames";
import styles from "./ResizableContainer.module.css";
import useResize from "../hooks/useResize";
import { ResizableContainerProps } from "../types";

export const ResizableContainer: FC<ResizableContainerProps> = ({
  children,
  direction = "right",
  initialSize,
  maxSize,
  minSize,
  boundSize,
  onResize,
  toggleKey = "[",
  animationDuration = 300,
  storageKey,
  ariaLabel,
  containerClassName,
  sliderClassName,
  toggleButtonClassName,
  toggleButtonIcon,
}) => {
  const {
    containerRef,
    size,
    isAnimating,
    handleMouseDown,
    handlePointerDown,
    toggleCollapse,
    isHorizontal,
    isResizing,
    handleTransitionEnd,
  } = useResize({
    direction,
    initialSize,
    minSize,
    maxSize,
    boundSize,
    onResize,
    animationDuration,
    storageKey,
    toggleKey,
  });

  // Keyboard support for toggling.
  const handleSliderKeyDown = useCallback(
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
        [isHorizontal ? "width" : "height"]: `${size}px`,
        transition: isAnimating
          ? `${
              isHorizontal ? "width" : "height"
            } ${animationDuration}ms ease-in-out`
          : "none",
      }}
      onTransitionEnd={handleTransitionEnd}
      role="region"
      aria-label={ariaLabel}
    >
      {children}
      <div
        className={classNames(
          styles.slider,
          styles[direction],
          sliderClassName
        )}
        onMouseDown={handleMouseDown}
        onPointerDown={handlePointerDown}
        onKeyDown={handleSliderKeyDown}
        role="separator"
        aria-valuenow={Number(size)}
        aria-valuemin={Number(minSize)}
        aria-valuemax={Number(maxSize)}
        aria-orientation={isHorizontal ? "horizontal" : "vertical"}
        tabIndex={0}
      >
        <div className={styles.resizer} aria-hidden="true" />
        <button
          className={classNames(styles.toggleButton, toggleButtonClassName)}
          onClick={(e) => {
            console.log("click");
            e.stopPropagation();
            toggleCollapse();
          }}
          data-ignore-resize="true"
          aria-label={`Toggle ${direction} panel`}
          aria-expanded={size !== Number(minSize)}
        >
          {toggleButtonIcon}
        </button>
        <div
          className={classNames(
            styles.shadow,
            size <= Number(boundSize || 0) && isResizing && styles.infoShadow
          )}
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default ResizableContainer;
