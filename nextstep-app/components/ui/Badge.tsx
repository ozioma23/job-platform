import React from "react";

interface BadgeProps {
  children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ children }) => {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
      {children}
    </span>
  );
};

export default Badge;
