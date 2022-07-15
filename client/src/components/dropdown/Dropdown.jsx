import React from "react";

const Dropdown = ({ targetLocation, setTargetLocation, waypoints }) => {
  const handleChange = (e) => {
    setTargetLocation(e.target.value);
  };

  return (
    <>
      <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400 md:text-base">
        Select destination
      </label>

      <select
        id="destinations"
        value={targetLocation}
        className="block w-full rounded-lg border-none bg-white py-3 px-4 text-base text-gray-900 shadow-sm drop-shadow-sm focus:ring-0 dark:border-gray-600 dark:bg-tertiary dark:text-white"
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
