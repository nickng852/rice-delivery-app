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
  const [batteryLevel, setBatteryLevel] = useState("");
  const [waypoints, setWaypoints] = useState("");
  const [currentLocation, setCurrentLocation] = useState("Home");
  const [targetLocation, setTargetLocation] = useState("Home");
  const [lid, setLid] = useState("");
  const [deliveryStatus, setDeliveryStatus] = useState("Stand By");
  const [error, setError] = useState(null);

  const { data: status, isFetching: isStatusFetching } = useGetStatusQuery();
  const { data: mapWaypoints, isFetching: isMapWaypointsFetching } =
    useGetMapWaypointsQuery();
  const [postLid, { isLoading: isLidPosting }] = usePostLidMutation();
  const [postGoal, { isLoading: isGoalPosting }] = usePostGoalMutation();

  const openLid = async () => {
    if (lid === "Open") {
      return;
    }

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
        setDeliveryStatus("Arrived");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setBatteryLevel(status?.charge);
    setLid(upperCaseFirstChar(status?.lid));
    setWaypoints(mapWaypoints);
  }, [status, mapWaypoints]);

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
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div>Battery Level: {batteryLevel}</div>
              <div>Current Location: {currentLocation}</div>
              <div>Lid Status: {lid}</div>
              <div>Status: {deliveryStatus}</div>
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
          <main
            className={`absolute inset-0 flex justify-center bg-white items-center space-y-4 flex-col
            }`}
          >
            <Spinner />
            <div>Please wait. Robot are under way...</div>
          </main>
        </>
      )}

      {(isStatusFetching || isMapWaypointsFetching || isLidPosting) && (
        <>
          <main
            className={`absolute inset-0 flex justify-center bg-white items-center ${
              isLidPosting && "opacity-50"
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
