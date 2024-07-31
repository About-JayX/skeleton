"use client";
import { Text } from "../text";
import "./index.css";
export default function Button({
  children,
  onClick,
  className = "",
  disabled = false,
}: {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      className={`relative bnt-box grid justify-items-center ${className}`}
      style={{width:"100%"}}
      onClick={() => onClick && onClick()}
      disabled={disabled}
    >
      <div className="button"><Text>{children}</Text></div>
    </button>
  );
}
