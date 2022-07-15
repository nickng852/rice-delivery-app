// Translation
import { useTranslation } from "react-i18next";

const Spin = ({ value }) => {
  const { t } = useTranslation();

  return (
    <>
      <span className="item-center relative flex h-2 w-2 2xl:h-3 2xl:w-3">
        <span
          className={`absolute inline-flex h-full w-full animate-ping rounded-full ${
            value === t("online") ? "bg-green-500" : "bg-red-500"
          } opacity-75`}
        ></span>
        <span
          className={`relative inline-flex h-2 w-2 rounded-full 2xl:h-3 2xl:w-3 ${
            value === t("online") ? "bg-green-500" : "bg-red-500"
          }`}
        ></span>
      </span>
    </>
  );
};

export default Spin;
