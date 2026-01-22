import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void; // updated to accept event
  type?: "button" | "submit";
  disabled?: boolean; // NEW
  className?: string;  // optional additional classes
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  disabled = false,    
  className = "",      
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}               // NEW
      className={`px-4 py-2 rounded-md bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
