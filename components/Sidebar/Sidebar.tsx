"use client";
import React, { useState, useEffect } from "react";
export interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  children?: MenuItem[];
  onClick?: () => void;
}

export interface SidebarProps {
  open: boolean;
  onClose: () => void;
  items: MenuItem[];
  title?: string;
}

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-90" : "rotate-0"}`}
  >
    <polyline points="7 5 13 10 7 15" />
  </svg>
);

const MenuNode = ({ item, depth = 0 }: { item: MenuItem; depth?: number }) => {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  const indentClass = depth === 0 ? "pl-4" : depth === 1 ? "pl-8" : "pl-12";

  const baseClass = [
    "flex items-center gap-3 w-full py-2.5 pr-4 rounded-lg",
    "text-sm font-medium transition-colors duration-150 cursor-pointer text-left",
    indentClass,
    depth === 0
      ? "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
      : "text-gray-500 hover:bg-gray-100 hover:text-gray-700",
  ].join(" ");

  if (hasChildren) {
    return (
      <div>
        <button
          type="button"
          className={baseClass}
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
        >
          {item.icon && (
            <span className="shrink-0 text-gray-400">{item.icon}</span>
          )}
          <span className="flex-1">{item.label}</span>
          <ChevronIcon open={expanded} />
        </button>
        <div
          className={[
            "overflow-hidden transition-all duration-300 ease-in-out",
            expanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0",
          ].join(" ")}
        >
          {item.children!.map((child) => (
            <MenuNode key={child.id} item={child} depth={depth + 1} />
          ))}
        </div>
      </div>
    );
  }

  const content = (
    <>
      {item.icon && <span className="shrink-0 text-gray-400">{item.icon}</span>}
      <span className="flex-1">{item.label}</span>
    </>
  );

  if (item.href) {
    return (
      <a href={item.href} className={baseClass}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={baseClass} onClick={item.onClick}>
      {content}
    </button>
  );
};
export const Sidebar = ({
  open,
  onClose,
  items,
  title = "Menu",
}: SidebarProps) => {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  return (
    <>
      <div
        aria-hidden="true"
        className={[
          "fixed inset-0 z-40 bg-black/40 backdrop-blur-sm",
          "transition-opacity duration-300",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        ].join(" ")}
        onClick={onClose}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={[
          "fixed top-0 right-0 h-full w-[300px] z-50",
          "bg-white border-l border-gray-200 shadow-2xl",
          "flex flex-col",
          "transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-900 tracking-tight">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="flex items-center justify-center w-8 h-8 rounded-lg
              text-gray-400 hover:text-gray-600 hover:bg-gray-100
              transition-colors duration-100"
          >
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="w-4 h-4"
            >
              <line x1="4" y1="4" x2="12" y2="12" />
              <line x1="12" y1="4" x2="4" y2="12" />
            </svg>
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-3 px-2">
          {items.map((item) => (
            <MenuNode key={item.id} item={item} depth={0} />
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
