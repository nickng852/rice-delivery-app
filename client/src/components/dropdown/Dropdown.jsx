import React from "react";

const Dropdown = ({ targetLocation, setTargetLocation, waypoints }) => {
  const handleChange = (e) => {
    setTargetLocation(e.target.value);
  };

  return (
    <>
      <label
        htmlFor="destinations"
        className="mb-2 block text-base font-medium text-gray-900 dark:text-gray-400"
      >
        Select destination
      </label>

      <select
        id="destinations"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 py-3 px-4 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
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
