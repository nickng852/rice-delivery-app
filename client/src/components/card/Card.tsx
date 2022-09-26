import { FC } from "react";

import Spin from "../animate/Spin";

// Translation
import { useTranslation } from "react-i18next";

interface Props {
  value: string;
  text: string;
  icon?: JSX.Element;
}

const Card: FC<Props> = ({ value, text, icon }) => {
  const { t } = useTranslation();

  return (
    <>
      <main className="w-full space-y-2 rounded-lg bg-white p-4 shadow-sm drop-shadow-sm dark:bg-tertiary dark:text-white">
        <div className="text-sm md:text-base md:font-medium">{t(text)}</div>
        <div className="flex items-center space-x-2">
          {icon && <div>{icon}</div>}
          {(value === t("online") || value === t("offline")) && (
            <Spin value={value} />
          )}
          <div className="text-xs md:text-sm md:font-light">{value}</div>
        </div>
      </main>
    </>
  );
};

export default Card;
