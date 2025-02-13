import React from "react";

const TextField = ({ type = "text", name, value, onChange, placeholder, required = false, className = "" }) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`w-full p-2 border rounded-md ${className}`}
    />
  );
};

export default TextField;
