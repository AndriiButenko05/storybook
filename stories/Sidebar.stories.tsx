import type { Meta, StoryObj } from "@storybook/nextjs";
import React, { useState } from "react";
import { Sidebar, MenuItem } from "../components/Sidebar/Sidebar";
const meta: Meta<typeof Sidebar> = {
  title: "Navigation/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

const HomeIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h3a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h3a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
  </svg>
);

const FolderIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
  </svg>
);

const SettingsIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path
      fillRule="evenodd"
      d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
      clipRule="evenodd"
    />
  </svg>
);
const flatItems: MenuItem[] = [
  { id: "home", label: "Home", icon: <HomeIcon />, href: "#" },
  { id: "projects", label: "Projects", icon: <FolderIcon />, href: "#" },
  { id: "settings", label: "Settings", icon: <SettingsIcon />, href: "#" },
  { id: "help", label: "Help", href: "#" },
];
const nestedItems: MenuItem[] = [
  { id: "home", label: "Home", icon: <HomeIcon />, href: "#" },
  {
    id: "projects",
    label: "Projects",
    icon: <FolderIcon />,
    children: [
      { id: "projects-web", label: "Web Apps", href: "#" },
      { id: "projects-mobile", label: "Mobile", href: "#" },
      { id: "projects-api", label: "APIs", href: "#" },
    ],
  },
  { id: "settings", label: "Settings", icon: <SettingsIcon />, href: "#" },
];
const deeplyNestedItems: MenuItem[] = [
  { id: "home", label: "Home", icon: <HomeIcon />, href: "#" },
  {
    id: "projects",
    label: "Projects",
    icon: <FolderIcon />,
    children: [
      {
        id: "projects-web",
        label: "Web Apps",
        children: [
          { id: "projects-web-next", label: "Next.js", href: "#" },
          { id: "projects-web-remix", label: "Remix", href: "#" },
        ],
      },
      {
        id: "projects-mobile",
        label: "Mobile",
        children: [
          { id: "projects-mobile-rn", label: "React Native", href: "#" },
          { id: "projects-mobile-expo", label: "Expo", href: "#" },
        ],
      },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    icon: <SettingsIcon />,
    children: [
      { id: "settings-account", label: "Account", href: "#" },
      { id: "settings-billing", label: "Billing", href: "#" },
    ],
  },
];
const SidebarDemo = ({
  items,
  title,
  defaultOpen = false,
}: {
  items: MenuItem[];
  title?: string;
  defaultOpen?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm
          font-medium hover:bg-indigo-700 transition-colors"
      >
        Open Sidebar
      </button>

      {open && (
        <p className="mt-3 text-sm text-gray-500">
          Click the backdrop or press{" "}
          <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">Esc</kbd> to
          close.
        </p>
      )}

      <Sidebar
        open={open}
        onClose={() => setOpen(false)}
        items={items}
        title={title}
      />
    </div>
  );
};
export const FlatMenu: Story = {
  name: "Flat (1 level)",
  render: () => <SidebarDemo items={flatItems} title="Navigation" />,
};
export const NestedMenu: Story = {
  name: "Nested (2 levels)",
  render: () => <SidebarDemo items={nestedItems} title="Navigation" />,
};
export const DeeplyNestedMenu: Story = {
  name: "Deeply Nested (3 levels)",
  render: () => <SidebarDemo items={deeplyNestedItems} title="Navigation" />,
};
export const DefaultOpen: Story = {
  name: "Default Open State",
  render: () => (
    <SidebarDemo items={nestedItems} title="Navigation" defaultOpen={true} />
  ),
};
