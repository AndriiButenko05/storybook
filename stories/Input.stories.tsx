import type { Meta, StoryObj } from "@storybook/nextjs";
import { Input } from "../components/Input/Input";

const meta: Meta<typeof Input> = {
  title: "Input/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  args: {
    placeholder: "Type here…",
    disabled: false,
    clearable: false,
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Text: Story = {
  args: {
    type: "text",
    label: "Full name",
    placeholder: "e.g. Jane Doe",
  },
};
export const Password: Story = {
  args: {
    type: "password",
    label: "Password",
    placeholder: "Enter your password",
    helperText: "Click the eye icon to reveal the password.",
  },
};
export const NumberInput: Story = {
  name: "Number",
  args: {
    type: "number",
    label: "Age",
    placeholder: "25",
  },
};
export const ClearableText: Story = {
  name: "Clearable — text",
  args: {
    type: "text",
    label: "Search",
    clearable: true,
    defaultValue: "Hello world",
    placeholder: "Search anything…",
  },
};

export const ClearablePassword: Story = {
  name: "Clearable — password",
  args: {
    type: "password",
    label: "Password",
    clearable: true,
    defaultValue: "supersecret",
  },
};
export const WithError: Story = {
  name: "State — error",
  args: {
    label: "Email",
    defaultValue: "not-an-email",
    error: "Please enter a valid email address.",
  },
};

export const WithHelperText: Story = {
  name: "State — helper text",
  args: {
    label: "Username",
    helperText: "Only letters, numbers, and underscores.",
  },
};

export const Disabled: Story = {
  name: "State — disabled",
  args: {
    label: "Read-only field",
    defaultValue: "You cannot edit this",
    disabled: true,
  },
};
