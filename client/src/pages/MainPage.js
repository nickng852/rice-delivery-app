import { useState, useEffect } from "react";

// Components
import Spinner from "components/loader/Spinner";
import Button from "components/button/Button";
import Dropdown from "components/dropdown/Dropdown";
import Modal from "components/modal/ErrorModal";

// API
import {
  useGetStatusQuery,
  useGetMapWaypointsQuery,
  usePostLidMutation,
  usePostGoalMutation,
} from "services/robotApi";

// Utils
import { upperCaseFirstChar } from "utils/wordFormatter";

const MainPage = () => {
  const [waypoints, setWaypoints] = useState("");
  const [currentLocation, setCurrentLocation] = useState("Home");
  const [targetLocation, setTargetLocation] = useState("Home");
  const [lid, setLid] = useState("");
  const [deliveryStatus, setDeliveryStatus] = useState("Stand By");
  const [error, setError] = useState(null);
  const [reminder, setReminder] = useState(null);

  // API
  const { data: status, isFetching: isStatusFetching } = useGetStatusQuery();
  const { data: mapWaypoints, isFetching: isMapWaypointsFetching } =
    useGetMapWaypointsQuery();
  const [postLid, { isLoading: isLidPosting }] = usePostLidMutation();
  const [postGoal, { isLoading: isGoalPosting }] = usePostGoalMutation();

  const openLid = async () => {
    if (lid === "Open") {
      return;
    }

    setReminder("Lid are now opening...");

    postLid({ lid: "Open" })
      .then(() => {
        setLid("Open");
        setDeliveryStatus("Ready for fill");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const closeLid = () => {
    if (lid === "Close") {
      return;
    }

    setReminder("Lid are now closing...");

    postLid({ lid: "Close" })
      .then(() => {
        setLid("Close");
        setDeliveryStatus("Ready for delivery");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = () => {
    if (status?.online === false) {
      setError("Robot are currently offline.");
      return;
    } else if (status?.charging === true) {
      setError("Robot are currently charging.");
      return;
    } else if (status?.charge <= 2) {
      setError("Battery Level are low.");
      return;
    } else if (lid === "Open") {
      setError("Please close the lid before delivery.");
      return;
    } else if (targetLocation === currentLocation) {
      setError("Target destination cannot be the same with current location.");
      return;
    }

    postGoal({ waypoint: targetLocation })
      .then(() => {
        setCurrentLocation(targetLocation);
        setDeliveryStatus("Arrived");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Set State after API call
  useEffect(() => {
    setLid(upperCaseFirstChar(status?.lid));
    setWaypoints(mapWaypoints);
  }, [status, mapWaypoints]);

  // Other logic
  useEffect(() => {
    if (currentLocation === "Home" && lid === "Close") {
      setDeliveryStatus("Stand By");
    }

    // Open lid automatically when arrived target location
    if (
      targetLocation === currentLocation &&
      currentLocation !== "Home" &&
      deliveryStatus === "Arrived"
    ) {
      postLid({ lid: "Open" })
        .then(() => {
          setLid("Open");
          setDeliveryStatus("Ready to fill");
        })
        .catch((error) => {
          console.log(error);
        });
    }

    // Back to orginal location when delivery is done and the lid is closed
    if (
      targetLocation === currentLocation &&
      currentLocation !== "Home" &&
      deliveryStatus === "Ready for delivery" &&
      lid === "Close"
    ) {
      postGoal({ waypoint: "Home" })
        .then(() => {
          setCurrentLocation("Home");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [postLid, postGoal, currentLocation, targetLocation, lid, deliveryStatus]);

  return (
    <main>
      {!isStatusFetching && !isMapWaypointsFetching && (
        <>
          <div className="space-y-4">
            <div className="flex space-x-4">
              <div className="w-full space-y-2 rounded-lg bg-gray-50 p-4 dark:bg-gray-700 dark:text-white">
                <div>Battery Level:</div>
                <div>{status?.charge}</div>
              </div>
              <div className="w-full space-y-2 rounded-lg bg-gray-50 p-4 dark:bg-gray-700 dark:text-white">
                <div>Status:</div>
                <div>{status?.online ? "Online" : "Offline"}</div>
              </div>
              <div className="w-full space-y-2 rounded-lg bg-gray-50 p-4 dark:bg-gray-700 dark:text-white">
                <div>Charge:</div>
                <div>{status?.charging ? "Charging" : "Not charging"}</div>
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="w-full space-y-2 rounded-lg bg-gray-50 p-4 dark:bg-gray-700 dark:text-white">
                <div>Current Location:</div>
                <div>{currentLocation}</div>
              </div>
              <div className="w-full space-y-2 rounded-lg bg-gray-50 p-4 dark:bg-gray-700 dark:text-white">
                <div>Lid Status:</div>
                <div>{lid}</div>
              </div>
              <div className="w-full space-y-2 rounded-lg bg-gray-50 p-4 dark:bg-gray-700 dark:text-white">
                <div>Status:</div>
                <div>{deliveryStatus}</div>
              </div>
            </div>

            <Button
              text="Open Lid"
              onClick={openLid}
              disabled={lid === "Open"}
            />
            <Button
              text="Close Lid"
              onClick={closeLid}
              disabled={lid === "Close"}
            />

            <Dropdown
              targetLocation={targetLocation}
              setTargetLocation={setTargetLocation}
              waypoints={waypoints}
            />

            <Button text="Go" onClick={handleSubmit} />
          </div>
        </>
      )}

      {isGoalPosting && (
        <>
          <main className="absolute inset-0 flex flex-col items-center justify-center space-y-4 bg-white">
            <Spinner />
            <div>Please wait. Robot are under way...</div>
          </main>
        </>
      )}

      {(isStatusFetching || isMapWaypointsFetching || isLidPosting) && (
        <>
          <main
            className={`absolute inset-0 flex flex-col items-center justify-center space-y-4 bg-white ${
              isLidPosting && "bg-gray-100/50"
            }`}
          >
            <Spinner />
            {isLidPosting && <div>{reminder}</div>}
          </main>
        </>
      )}

      {error && <Modal error={error} setError={setError} />}
    </main>
  );
};

export default MainPage;
