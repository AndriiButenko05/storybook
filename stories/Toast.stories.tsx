import type { Meta, StoryObj } from "@storybook/nextjs";
import { ToastDemo } from "../components/Toast/Toast";
const meta: Meta<typeof ToastDemo> = {
  title: "Feedback/Toast",
  component: ToastDemo,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    message: "This is a notification!",
    duration: 3000,
    closable: true,
  },
};

export default meta;
type Story = StoryObj<typeof ToastDemo>;

export const Success: Story = {
  args: {
    type: "success",
    message: "Your changes have been saved.",
  },
};

export const Error: Story = {
  args: {
    type: "error",
    message: "Something went wrong. Please try again.",
  },
};

export const Warning: Story = {
  args: {
    type: "warning",
    message: "Your session expires in 5 minutes.",
  },
};

export const Info: Story = {
  args: {
    type: "info",
    message: "A new version is available.",
  },
};
export const ShortDuration: Story = {
  name: "Duration — 1.5 s",
  args: {
    type: "info",
    message: "Gone in 1.5 seconds!",
    duration: 1500,
  },
};

export const LongDuration: Story = {
  name: "Duration — 8 s",
  args: {
    type: "success",
    message: "I'll hang around for a while (8 s).",
    duration: 8000,
  },
};

export const NeverAutoDismiss: Story = {
  name: "No auto-dismiss (duration=0)",
  args: {
    type: "warning",
    message: "I won't disappear on my own — click × to close me.",
    duration: 0,
    closable: true,
  },
};
export const WithCloseButton: Story = {
  name: "With close button",
  args: {
    type: "info",
    message: "You can close me manually.",
    closable: true,
  },
};

export const WithoutCloseButton: Story = {
  name: "Without close button",
  args: {
    type: "info",
    message: "Only the timer will dismiss me.",
    closable: false,
    duration: 4000,
  },
};
