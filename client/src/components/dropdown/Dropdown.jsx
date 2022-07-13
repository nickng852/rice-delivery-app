import React from "react";

const Dropdown = ({ targetLocation, setTargetLocation, waypoints }) => {
  const handleChange = (e) => {
    setTargetLocation(e.target.value);
  };

  return (
    <>
      <label
        htmlFor="destinations"
        className="block mb-2 text-base font-medium text-gray-900 dark:text-gray-400"
      >
        Select destination
      </label>

      <select
        id="destinations"
        className="block py-3 px-4 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={targetLocation}
        onChange={handleChange}
      >
        <option defaultValue>Choose a destination</option>
        {waypoints &&
          waypoints.map((waypoint, index) => {
            return (
              <option key={index} value={waypoint.name}>
                {waypoint.name}
              </option>
            );
          })}
      </select>
    </>
  );
};

export default Dropdown;
