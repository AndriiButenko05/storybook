"use client";

import React, { useState, useRef } from "react";
export type InputType = "text" | "password" | "number" | "email" | "search";
export interface InputProps {
  type?: InputType;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  clearable?: boolean;
  label?: string;
  helperText?: string;
  error?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  onClear?: () => void;
  className?: string;
}
const EyeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const XIcon = () => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    className="w-3.5 h-3.5"
  >
    <line x1="4" y1="4" x2="12" y2="12" />
    <line x1="12" y1="4" x2="4" y2="12" />
  </svg>
);
export const Input = ({
  type = "text",
  placeholder,
  value,
  defaultValue,
  clearable = false,
  label,
  helperText,
  error,
  disabled = false,
  onChange,
  onClear,
  className = "",
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");

  const inputRef = useRef<HTMLInputElement>(null);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInternalValue(e.target.value);
    onChange?.(e.target.value);
  };

  const handleClear = () => {
    if (!isControlled) setInternalValue("");
    onChange?.("");
    onClear?.();
    inputRef.current?.focus();
  };

  const resolvedType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  const hasValue = !!currentValue && currentValue.length > 0;
  const showClearBtn = clearable && hasValue && !disabled;
  const showEyeBtn = type === "password";

  let rightPadding = "pr-3";
  if (showEyeBtn && showClearBtn) rightPadding = "pr-[4.5rem]";
  else if (showEyeBtn || showClearBtn) rightPadding = "pr-10";

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-sm font-semibold text-gray-700 tracking-wide">
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        <input
          ref={inputRef}
          type={resolvedType}
          value={currentValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          className={[
            "w-full rounded-lg border bg-white text-sm text-gray-900",
            "px-3 py-2.5 outline-none transition-all duration-150",
            "focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500",
            "placeholder:text-gray-400",
            rightPadding,
            error
              ? "border-red-400 focus:ring-red-500/20 focus:border-red-500"
              : "border-gray-300 hover:border-gray-400",
            disabled
              ? "bg-gray-50 text-gray-400 cursor-not-allowed border-gray-200 hover:border-gray-200"
              : "",
          ]
            .filter(Boolean)
            .join(" ")}
        />
        <div className="absolute right-2.5 flex items-center gap-1">
          {showClearBtn && (
            <button
              type="button"
              onClick={handleClear}
              tabIndex={-1}
              aria-label="Clear input"
              className="flex items-center justify-center w-5 h-5 rounded
                text-gray-400 hover:text-gray-600 hover:bg-gray-100
                transition-colors duration-100"
            >
              <XIcon />
            </button>
          )}

          {showEyeBtn && (
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="flex items-center justify-center w-6 h-6 rounded
                text-gray-400 hover:text-gray-600 hover:bg-gray-100
                transition-colors duration-100"
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          )}
        </div>
      </div>
      {(error || helperText) && (
        <p className={`text-xs ${error ? "text-red-500" : "text-gray-500"}`}>
          {error ?? helperText}
        </p>
      )}
    </div>
  );
};

export default Input;
