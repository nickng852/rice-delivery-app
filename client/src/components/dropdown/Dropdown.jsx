import React from "react";

const Dropdown = ({
  labelText,
  value,
  defaultOption,
  options,
  handleChange,
}) => {
  return (
    <>
      {labelText && (
        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400 md:text-base">
          {labelText}
        </label>
      )}

      <select
        id="destinations"
        value={value}
        className="block w-full rounded-lg border-none bg-white py-3 px-4 text-base text-gray-900 shadow-sm drop-shadow-sm focus:ring-0 dark:border-gray-600 dark:bg-tertiary dark:text-white"
        onChange={handleChange}
      >
        <option defaultValue>{defaultOption}</option>
        {options &&
          options.map((option, index) => {
            return (
              <option key={index} value={option.key}>
                {option.name}
              </option>
            );
          })}
      </select>
    </>
  );
};

export default Dropdown;
