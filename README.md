# ResizableContainer

A resizable and collapsible container component for React applications.

![Resizable Container Demo](src/assets/resizeable_container_demo.gif)

## Table of Contents

- [ResizableContainer](#resizablecontainer)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
- [ResizableContainer Component](#resizablecontainer-component)
  - [Keyboard Shortcuts](#keyboard-shortcuts)
  - [Styling](#styling)
  - [Examples](#examples)

## Installation

To use the `ResizableContainer` component in your React project, you can install it via npm or yarn:

//add instalation script

## Usage

Import the `ResizableContainer` component and use it in your React application:

```jsx
import ResizableContainer from '@your-org/resizable-container';

const MyComponent = () => {
  return (
    <ResizableContainer
      direction="right"
      initialSize={300}
      minSize={200}
      maxSize={500}
      boundSize={100}
      storageKey="my-resizable-container"
    >
      <div>
        This is the content inside the resizable container.
      </div>
    </ResizableContainer>
  );
};
```
# ResizableContainer Component

The `ResizableContainer` component accepts the following props:

| Prop                      | Type                                        | Default   | Description                                                                                  |
| ------------------------- | ------------------------------------------- | --------- | -------------------------------------------------------------------------------------------- |
| `children`                | `ReactNode`                                 | -         | The content to be displayed inside the resizable container.                                   |
| `direction`               | `"right" \| "left" \| "top" \| "bottom"`    | `"right"` | The direction in which the container is resizable.                                            |
| `toggleKey`               | `string`                                    | -         | The key that triggers the toggle collapse functionality when pressed with `Ctrl`.             |
| `initialSize`             | `number \| string`                          | -         | The initial size of the container.                                                            |
| `minSize`                 | `number \| string`                          | -         | The minimum size of the container.                                                            |
| `maxSize`                 | `number \| string`                          | -         | The maximum size of the container.                                                            |
| `boundSize`               | `number \| string`                          | -         | The bound size of the container.                                                              |
| `onResize`                | `(size: number) => void`                    | -         | Callback function called when the container is resized.                                       |
| `animationDuration`       | `number`                                    | `300`     | The duration of the animation when the container is collapsed.                                |
| `storageKey`              | `string`                                    | -         | The key used to store the container size in `localStorage`.                                   |
| `ariaLabel`               | `string`                                    | -         | The `aria-label` for the container.                                                           |
| `containerClassName`      | `string`                                    | -         | Additional CSS class for the container.                                                       |

| `sliderClassName`         | `string`                                    | -         | Additional CSS class for the slider.                                                          |
| `toggleButtonClassName`   | `string`                                    | -         | Additional CSS class for the toggle button.                                                   |
| `toggleButtonIcon`        | `string`                                    | `[`        | The icon for the toggle button                                                                |


## Keyboard Shortcuts

The `ResizableContainer` component supports the following keyboard shortcut:

- **Ctrl + [toggleKey]**: Toggle the collapse/expand state of the container.

## Styling

The `ResizableContainer` component uses CSS modules for styling. You can override the default styles by passing additional class names through the `containerClassName`, `childWrapperClassName`, `sliderClassName`, and `toggleButtonClassName` props.

## Examples

Here are a few examples of how to use the `ResizableContainer` component:

```jsx
// Resizable container on the right side
<ResizableContainer
  direction="right"
  initialSize={300}
  minSize={200}
  maxSize={500}
  storageKey="my-resizable-container"
/>

// Resizable container on the left side
<ResizableContainer
  direction="left"
  initialSize="50%"
  minSize={200}
  maxSize="80%"
  storageKey="my-left-resizable-container"
/>

// Resizable container on the top
<ResizableContainer
  direction="top"
  initialSize={200}
  minSize={100}
  maxSize={400}
  storageKey="my-top-resizable-container"
/>

// Resizable container on the bottom
<ResizableContainer
  direction="bottom"
  initialSize={300}
  minSize={200}
  maxSize={500}
  storageKey="my-bottom-resizable-container"
/>
