import React from "react";

const Dropdown = ({ title, options, func }) => {
  return (
    <div className="flex items-center gap-2">
      <label className="text-zinc-400 font-semibold">{title}:</label>
      <select
        onChange={func}
        className="bg-zinc-800 text-white px-3 py-2 rounded-lg"
      >
        {options.map((o, i) => (
          <option key={i} value={typeof o === "string" ? o : o.value}>
            {typeof o === "string" ? o.toUpperCase() : o.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;


