import { useState, useEffect } from "react";

import useQuery from "hooks/useQuery";
import { upperCaseFirstChar } from "utils/wordFormatter";

import Spinner from "components/loader/Spinner";

const MainPage = () => {
  const [lid, setLid] = useState("");

  const { data: status, isFetching: isStatusFetching } = useQuery({
    method: "get",
    endpoint: "/status",
  });

  useEffect(() => {
    setLid(status?.lid);
  }, [status]);

  return (
    <main>
      {!isStatusFetching && status && lid && (
        <>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div>Lid Status: {upperCaseFirstChar(lid)}</div>
          </div>
        </>
      )}

      {isStatusFetching && (
        <>
          <main className="absolute inset-0 flex justify-center items-center">
            <Spinner />
          </main>
        </>
      )}
    </main>
  );
};

export default MainPage;
