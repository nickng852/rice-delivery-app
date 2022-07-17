import { useState, useEffect } from "react";

// Translation
import { useTranslation } from "react-i18next";

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
  // Translation
  const { t, i18n } = useTranslation();

  const [waypoints, setWaypoints] = useState("");
  const [currentLocation, setCurrentLocation] = useState("Home");
  const [targetLocation, setTargetLocation] = useState(t("chooseDestination"));
  const [lid, setLid] = useState("");
  const [deliveryStatus, setDeliveryStatus] = useState(t("standBy"));
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

    setReminder(t("lidOpening"));

    postLid({ lid: "Open" })
      .then(() => {
        setLid("Open");
        setDeliveryStatus(t("readyToFill"));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const closeLid = () => {
    if (lid === "Close") {
      return;
    }

    setReminder(t("lidClosing"));

    postLid({ lid: "Close" })
      .then(() => {
        setLid("Close");
        setDeliveryStatus(t("readyForDelivery"));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = () => {
    if (status?.online === false) {
      setError(t("robotOffline"));
      return;
    } else if (status?.charging === true) {
      setError(t("robotCharging"));
      return;
    } else if (status?.charge <= 10) {
      setError(t("robotBatteryLow"));
      return;
    } else if (lid === t("lidOpen")) {
      setError(t("robotNotClose"));
      return;
    } else if (targetLocation === t("chooseDestination")) {
      setError(t("noDestination"));
      return;
    } else if (targetLocation === currentLocation) {
      setError(t("destinationConflict"));
      return;
    }

    let reminderText = t("transitionText") + targetLocation;

    setReminder(reminderText);

    postGoal({ waypoint: targetLocation })
      .then(() => {
        setCurrentLocation(targetLocation);
        setDeliveryStatus(t("arrived"));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Set State after API call
  useEffect(() => {
    if (upperCaseFirstChar(status?.lid) === "Open") {
      setLid("Open");
    } else if (upperCaseFirstChar(status?.lid) === "Close") {
      setLid("Close");
    }

    setWaypoints(mapWaypoints);
  }, [t, status, mapWaypoints]);

  // Other logic
  useEffect(() => {
    if (currentLocation === "Home" && lid === "Close") {
      setDeliveryStatus(t("standBy"));
    }

    // Open lid automatically when arrived target location
    if (
      targetLocation === currentLocation &&
      currentLocation !== "Home" &&
      deliveryStatus === t("arrived")
    ) {
      setReminder(t("lidOpening"));

      postLid({ lid: "Open" })
        .then(() => {
          setLid("Open");
          setDeliveryStatus(t("readyToFill"));
        })
        .catch((error) => {
          console.log(error);
        });
    }

    // Back to orginal location when delivery is done and the lid is closed
    if (
      targetLocation === currentLocation &&
      currentLocation !== "Home" &&
      deliveryStatus === t("readyForDelivery") &&
      lid === "Close"
    ) {
      setReminder(t("transitionHomeText"));

      postGoal({ waypoint: "Home" })
        .then(() => {
          setCurrentLocation("Home");
          setTargetLocation(t("chooseDestination"));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [
    t,
    postLid,
    postGoal,
    currentLocation,
    targetLocation,
    lid,
    deliveryStatus,
  ]);

  console.log(lid);

  return (
    <main className="flex flex-col justify-center portrait:h-full lg:landscape:h-full">
      {!isStatusFetching && !isMapWaypointsFetching && (
        <>
          <div className="space-y-4">
            <div className="flex space-x-4">
              <button
                value="en"
                text={"English"}
                className="cursor-pointer"
                onClick={(e) => {
                  i18n.changeLanguage(e.target.value);
                }}
              >
                English
              </button>
              <button
                value="tc"
                text={"繁體中文"}
                className="cursor-pointer"
                onClick={(e) => {
                  i18n.changeLanguage(e.target.value);
                }}
              >
                繁體中文
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              <Card
                text={t("status")}
                value={status?.online ? t("online") : t("offline")}
              />
              <Card
                text={t("charge")}
                value={status?.charging ? t("charging") : t("notCharging")}
              />
              <Card text={t("batteryLevel")} value={status?.charge + "%"} />
              <Card
                text={t("currentLocation")}
                icon={<FontAwesomeIcon icon={faLocationDot} />}
                value={currentLocation}
              />
              <Card
                text={t("lidStatus")}
                value={lid === "Open" ? t("lidOpen") : t("lidClose")}
              />
              <Card text={t("deliveryStatus")} value={deliveryStatus} />
            </div>
            <div className="space-y-4 md:flex md:space-x-4 md:space-y-0">
              <Button
                text={t("openLid")}
                icon={<FontAwesomeIcon icon={faBoxOpen} />}
                onClick={openLid}
                disabled={lid === "Open"}
              />
              <Button
                text={t("closeLid")}
                icon={<FontAwesomeIcon icon={faBox} />}
                onClick={closeLid}
                disabled={lid === "Close"}
              />
            </div>
            <Dropdown
              labelText={t("chooseDestination")}
              value={targetLocation}
              defaultOption={t("chooseDestination")}
              options={waypoints}
              handleChange={(e) => {
                setTargetLocation(e.target.value);
              }}
            />
            <Button
              text={t("go")}
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

      {error && <Modal error={error} setError={setError} text={t("confirm")} />}
    </main>
  );
};

export default MainPage;
