import { useState, useEffect } from "react";

import Spinner from "components/loader/Spinner";
import Button from "components/button/Button";
import Dropdown from "components/dropdown/Dropdown";
import Modal from "components/modal/ErrorModal";

import {
  useGetStatusQuery,
  useGetMapWaypointsQuery,
  usePostLidMutation,
  usePostGoalMutation,
} from "services/robotApi";

import { upperCaseFirstChar } from "utils/wordFormatter";

const MainPage = () => {
  const [lid, setLid] = useState("");
  const [waypoints, setWaypoints] = useState("");
  const [currentLocation, setCurrentLocation] = useState("Home");
  const [targetLocation, setTargetLocation] = useState("Home");
  const [error, setError] = useState(null);

  const { data: status, isFetching: isStatusFetching } = useGetStatusQuery();
  const { data: mapWaypoints, isFetching: isMapWaypointsFetching } =
    useGetMapWaypointsQuery();
  const [postLid, { isLoading: isLidPosting }] = usePostLidMutation();
  const [postGoal, { isLoading: isGoalPosting }] = usePostGoalMutation();

  const openLid = () => {
    if (lid === "Open") {
      setError("The lid is already opend.");
      return;
    }

    postLid({ lid: "Open" })
      .then(() => {
        setLid("Open");
        setError("The lid is now opened.");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const closeLid = () => {
    if (lid === "Close") {
      setError("The lid is already closed.");
      return;
    }

    postLid({ lid: "Close" })
      .then(() => {
        setLid("Close");
        setError("The lid is now closed.");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = () => {
    if (lid === "Open") {
      setError("Please close the lid before delivery");
      return;
    } else if (targetLocation === currentLocation) {
      setError("Target destination cannot be the same with current location.");
      return;
    }

    postGoal({ waypoint: targetLocation })
      .then(() => {
        setCurrentLocation(targetLocation);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setLid(upperCaseFirstChar(status?.lid));
    setWaypoints(mapWaypoints);
  }, [status, mapWaypoints]);

  return (
    <main>
      {!isStatusFetching && !isMapWaypointsFetching && (
        <>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div>Current Location: {currentLocation}</div>
              <div>Lid Status: {lid}</div>
            </div>
            <Button text="Open Lid" onClick={openLid} />
            <Button text="Close Lid" onClick={closeLid} />

            <Dropdown
              targetLocation={targetLocation}
              setTargetLocation={setTargetLocation}
              waypoints={waypoints}
            />

            <Button text="Go" onClick={handleSubmit} />
          </div>
        </>
      )}

      {(isStatusFetching ||
        isMapWaypointsFetching ||
        isLidPosting ||
        isGoalPosting) && (
        <>
          <main
            className={`absolute inset-0 flex justify-center items-center ${
              (isLidPosting || isGoalPosting) && "bg-gray-50 opacity-20"
            }`}
          >
            <Spinner />
          </main>
        </>
      )}

      {error && <Modal error={error} setError={setError} />}
    </main>
  );
};

export default MainPage;
