import React from "react";

const CommonButton = ({ children, type = "button", bgColor = "bg-blue-600", textColor = "text-white", className = "", ...props }) => {
  return (
    <button className={`px-4 pt-2 rounded-lg ${className} ${bgColor} ${textColor}`} {...props}>
      {children}
    </button>
  );
};

export default CommonButton;
