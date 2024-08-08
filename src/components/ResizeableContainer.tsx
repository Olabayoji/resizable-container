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
import useResize from "../hooks/useResize";

/**
 * The props for the ResizableContainer component.
 */
type Props = {
  children: ReactNode;
  direction?: "right" | "left" | "top" | "bottom";
  toggleKey?: string; // The key that triggers the toggle collapse functionality
  initialSize?: number | string; // The initial size of the container
  minSize?: number | string; // The minimum size of the container
  maxSize?: number | string; // The maximum size of the container
  boundSize?: number | string; // The bound size of the container
  onResize?: (size: number) => void; // Callback function for when the container is resized
  animationDuration?: number; // The duration of the animation when the container is collapsed
  storageKey: string; // The key used to store the container size in localStorage
  ariaLabel?: string; // The aria-label for the container
  containerClassName?: string; // Additional CSS class for the container
  childWrapperClassName?: string; // Additional CSS class for the child wrapper
  sliderClassName?: string; // Additional CSS class for the slider
  toggleButtonClassName?: string; // Additional CSS class for the toggle button
  toggleButtonIcon?: ReactNode; // The icon for the toggle button
};

/**
 * A resizable container component that can be collapsed and expanded.
 *
 * @param {Props} props - The props for the ResizableContainer component.
 * @returns {JSX.Element} - The ResizableContainer component.
 */
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
  toggleButtonIcon,
}) => {
  // Use the custom useResize hook to manage the resizing logic
  const {
    containerRef,
    size,
    isAnimating,
    handleMouseDown,
    handleMouseUp,
    toggleCollapse,
    isHorizontal,
    isResizing,
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

  // State to track the visibility of the toggle button
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  // State to track whether the toggle button was clicked
  const [isToggleButtonClicked, setIsToggleButtonClicked] = useState(false);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  // Hide the toggle button after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsButtonVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Add a keyboard event listener to toggle the container on Ctrl + [toggleKey]
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

  // Show the toggle button when the slider is hovered over
  const handleSliderMouseEnter = useCallback(() => {
    setIsButtonVisible(true);
  }, []);

  // Hide the toggle button when the slider is no longer hovered over
  const handleSliderMouseLeave = useCallback(() => {
    setIsButtonVisible(false);
  }, []);

  // Handle the click event on the toggle button
  const handleToggleButtonClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsToggleButtonClicked(true);
      toggleCollapse();
    },
    [toggleCollapse]
  );

  // Handle the mouseup event on the container
  const handleContainerMouseUp = useCallback(() => {
    handleMouseUp(!isToggleButtonClicked);
    setIsToggleButtonClicked(false);
  }, [handleMouseUp, isToggleButtonClicked]);

  // Add a mouseup event listener to the document to handle container mouseup
  useEffect(() => {
    document.addEventListener("mouseup", handleContainerMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleContainerMouseUp);
    };
  }, [handleContainerMouseUp]);

  // Handle the keydown event on the slider
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleCollapse();
      }
    },
    [toggleCollapse]
  );

  // Render the ResizableContainer component
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
          {toggleButtonIcon}
        </button>
        <div
          className={classNames(
            styles.shadow,
            (size || 0) <= Number(boundSize || 0) &&
              isResizing &&
              styles.infoShadow
          )}
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default ResizableContainer;
