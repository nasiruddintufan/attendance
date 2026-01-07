import React from "react";

const Select = ({ options=[] , onChange, value }) => {

  return (
    <div className="relative w-full group">
      <span className="absolute -left-0.5 top-2 bottom-2 w-1.5 rounded bg-gradient-to-b from-indigo-500 to-purple-500 opacity-70 transition-all duration-300 group-focus-within:opacity-100" />
      <select
        value={value}
        onChange={onChange}
        id=""
        className="peer w-full pl-6 pr-4 py-4 text-sm text-gray-800 bg-white border border-gray-200 rounded-lg shadow-md focus:border-transparent focus:ring-2 focus:ring-indigo-300 focus:outline-none transition-all duration-300 delay-200 placeholder-transparent"
      >
        <option hidden>Select Batch</option>
        {options.map((item) => (
          <option value={item.id} key={item.id}>
            {item.batchname}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
