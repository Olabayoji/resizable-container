import type { Meta, StoryObj } from "@storybook/react";
import ResizableContainer from "../components/ResizableContainer";

const meta = {
  title: "Components/ResizableContainer",
  component: ResizableContainer,
  parameters: {
    layout: "fullscreen",

    docs: {
      description: {
        component:
          "A resizable and collapsible container component for React applications.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: "select",
      options: ["right", "left", "top", "bottom"],
      description: "Direction in which the container can be resized",
    },
    initialSize: {
      control: "number",
      description: "Initial size of the container in pixels",
    },
    minSize: {
      control: "number",
      description: "Minimum size the container can be resized to",
    },
    maxSize: {
      control: "number",
      description: "Maximum size the container can be resized to",
    },
    boundSize: {
      control: "number",
      description: "Size below which the container will snap to minSize",
    },
    toggleKey: {
      control: "text",
      description:
        "Keyboard key that when pressed with Ctrl will toggle the panel",
    },
    animationDuration: {
      control: "number",
      description: "Duration of the collapse/expand animation in milliseconds",
    },
    storageKey: {
      control: "text",
      description: "Key used to store the container size in localStorage",
      required: true,
    },
    toggleButtonIcon: {
      control: false,
      description: "Custom icon for the toggle button",
    },
    children: {
      control: false,
      description: "Content to be placed inside the container",
    },
  },
  args: {
    direction: "right",
    initialSize: 300,
    minSize: 0,
    maxSize: 500,
    boundSize: 100,
    animationDuration: 300,
    toggleKey: "[",
    storageKey: "storybook-resizable-container",
    children: (
      <div
        style={{
          height: "99dvh",
          backgroundColor: "#f5f5f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        Resizable Container Content
      </div>
    ),
  },
} satisfies Meta<typeof ResizableContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LeftDirection: Story = {
  args: {
    direction: "left",
    storageKey: "storybook-resizable-container-left",
    children: (
      <div
        style={{
          height: "100dvh",
          backgroundColor: "#f5f5f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        Left Direction Content
      </div>
    ),
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: "grid",
          width: "100dvw",
          justifyContent: "end",
          overflow: "hidden",
        }}
      >
        <Story />
      </div>
    ),
  ],
};
export const TopDirection: Story = {
  args: {
    direction: "top",
    storageKey: "storybook-resizable-container-top",
    children: (
      <div
        style={{
          width: "100dvw",
          height: "inherit",
          backgroundColor: "#f5f5f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        Top Direction Content
      </div>
    ),
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: "grid",
          height: "100dvh",
          width: "100dvw",
          justifyContent: "start",
          overflow: "hidden",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const BottomDirection: Story = {
  args: {
    direction: "bottom",
    storageKey: "storybook-resizable-container-bottom",
    children: (
      <div
        style={{
          width: "100dvw",
          height: "inherit",
          backgroundColor: "#f5f5f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        Bottom Direction Content
      </div>
    ),
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: "grid",
          height: "100dvh",
          justifyContent: "end",
          alignContent: "end",
          overflow: "hidden",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const WithCustomStyle: Story = {
  args: {
    storageKey: "storybook-resizable-container-styled",
    containerClassName: "custom-container",
    sliderClassName: "custom-slider",
    toggleButtonClassName: "custom-toggle",
  },
  decorators: [
    (Story) => (
      <div>
        <style>
          {`
            .custom-container {
              border: 2px solid #3498db;
              border-radius: 8px;
            }
          
            .custom-slider {
            }
            .custom-toggle {
              background-color: #2980b9 !important;
              top: 50% !important;
            }
          `}
        </style>
        <Story />
      </div>
    ),
  ],
};

export const WithCustomToggleIcon: Story = {
  args: {
    storageKey: "storybook-resizable-container-custom-icon",
    toggleButtonIcon: <span>⇄</span>,
  },
};

export const SlowAnimation: Story = {
  args: {
    storageKey: "storybook-resizable-container-slow-animation",
    animationDuration: 1000,
  },
};

export const WithMinMaxConstraints: Story = {
  args: {
    storageKey: "storybook-resizable-container-constraints",
    minSize: 200,
    maxSize: 400,
    initialSize: 300,
  },
};

// Use a play function to demonstrate the toggle collapse functionality
export const WithToggleCollapse: Story = {
  args: {
    storageKey: "storybook-resizable-container-toggle",
  },
  play: async ({ canvasElement, step }) => {
    const toggleButton = canvasElement.querySelector("button");
    if (toggleButton) {
      await step("Toggle collapse", async () => {
        toggleButton.click();
      });
    }
  },
};
