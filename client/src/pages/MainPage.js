import { useState, useEffect } from "react";

import Spinner from "components/loader/Spinner";
import Button from "components/button/Button";

import { useGetStatusQuery, usePostLidMutation } from "services/robotApi";

import { upperCaseFirstChar } from "utils/wordFormatter";

const MainPage = () => {
  const [lid, setLid] = useState("");

  const { data: status, isFetching: isStatusFetching } = useGetStatusQuery();

  const [lidToggle, { isLoading: isLidToggling }] = usePostLidMutation();

  const openLid = () => {
    lidToggle({ lid: "Open" })
      .then(() => {
        setLid("Open");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const closeLid = () => {
    lidToggle({ lid: "Close" })
      .then(() => {
        setLid("Close");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setLid(status?.lid);
  }, [status]);

  return (
    <main>
      {!isStatusFetching && (
        <>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div>Lid Status: {upperCaseFirstChar(lid)}</div>
            </div>
            <Button text="Open Lid" onClick={openLid} />
            <Button text="Close Lid" onClick={closeLid} />
          </div>
        </>
      )}

      {(isStatusFetching || isLidToggling) && (
        <>
          <main
            className={`absolute inset-0 flex justify-center items-center ${
              isLidToggling && "bg-gray-50 opacity-20"
            }`}
          >
            <Spinner />
          </main>
        </>
      )}
    </main>
  );
};

export default MainPage;
