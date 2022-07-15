import { useState, useEffect } from "react";

// Components
import Spinner from "components/loader/Spinner";
import Card from "components/card/Card";
import Button from "components/button/Button";
import Dropdown from "components/dropdown/Dropdown";
import Modal from "components/modal/ErrorModal";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faBoxOpen,
  faBox,
  faRobot,
} from "@fortawesome/free-solid-svg-icons";

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
  const [targetLocation, setTargetLocation] = useState("Choose a destination");
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

    setReminder("Lid is now opening...");

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

    setReminder("Lid is now closing...");

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
      setError("Robot is currently offline.");
      return;
    } else if (status?.charging === true) {
      setError("Robot is currently charging.");
      return;
    } else if (status?.charge <= 2) {
      setError("Battery Level are low.");
      return;
    } else if (lid === "Open") {
      setError("Please close the lid before delivery.");
      return;
    } else if (targetLocation === "Choose a destination") {
      setError("Please select destination before delivery.");
      return;
    } else if (targetLocation === currentLocation) {
      setError("Target destination cannot be the same with current location.");
      return;
    }

    let reminderText = "Please wait... Robot is now going to " + targetLocation;

    setReminder(reminderText);

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
      setReminder("Lid are now opening...");

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
      let reminderText = "Please wait... Robot is now going to Home";

      setReminder(reminderText);

      postGoal({ waypoint: "Home" })
        .then(() => {
          setCurrentLocation("Home");
          setTargetLocation("Choose a destination");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [postLid, postGoal, currentLocation, targetLocation, lid, deliveryStatus]);

  return (
    <main className="flex flex-col justify-center portrait:h-full lg:landscape:h-full">
      {!isStatusFetching && !isMapWaypointsFetching && (
        <>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              <Card
                text="Status"
                value={status?.online ? "Online" : "Offline"}
              />
              <Card
                text="Charge"
                value={status?.charging ? "Charging" : "Not charging"}
              />
              <Card text="Battery Level" value={status?.charge + "%"} />
              <Card
                text="Current Location"
                icon={<FontAwesomeIcon icon={faLocationDot} />}
                value={currentLocation}
              />
              <Card text="Lid Status" value={lid} />
              <Card text="Delivery Status" value={deliveryStatus} />
            </div>
            <div className="space-y-4 md:flex md:space-x-4 md:space-y-0">
              <Button
                text="Open Lid"
                icon={<FontAwesomeIcon icon={faBoxOpen} />}
                onClick={openLid}
                disabled={lid === "Open"}
              />
              <Button
                text="Close Lid"
                icon={<FontAwesomeIcon icon={faBox} />}
                onClick={closeLid}
                disabled={lid === "Close"}
              />
            </div>
            <Dropdown
              targetLocation={targetLocation}
              setTargetLocation={setTargetLocation}
              waypoints={waypoints}
            />
            <Button
              text="Go"
              icon={<FontAwesomeIcon icon={faRobot} />}
              onClick={handleSubmit}
            />
          </div>
        </>
      )}

      {isGoalPosting && (
        <>
          <main className="absolute inset-0 flex flex-col items-center justify-center space-y-4 bg-white dark:bg-primary">
            <Spinner />
            <div className="text-sm dark:text-white md:text-base">
              {reminder}
            </div>
          </main>
        </>
      )}

      {(isStatusFetching || isMapWaypointsFetching || isLidPosting) && (
        <>
          <main className="absolute inset-0 flex flex-col items-center justify-center space-y-4 bg-white dark:bg-primary">
            <Spinner />
            {isLidPosting && (
              <div className="text-sm dark:text-white md:text-base">
                {reminder}
              </div>
            )}
          </main>
        </>
      )}

      {error && <Modal error={error} setError={setError} />}
    </main>
  );
};

export default MainPage;
