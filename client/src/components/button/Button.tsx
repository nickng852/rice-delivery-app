import { FC } from "react";

interface Props {
  value?: string;
  text: string;
  icon?: JSX.Element;
  onClick: () => void;
  disabled?: boolean;
}

const Button: FC<Props> = ({ value, text, icon, onClick, disabled }) => {
  return (
    <button
      type="button"
      value={value}
      className={`ease flex w-full items-center justify-center space-x-2 rounded-lg bg-gray-700 py-3 px-4 text-sm text-white transition ease-out hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 disabled:bg-gray-200 dark:bg-secondary dark:hover:bg-secondary dark:focus:ring-0 dark:disabled:border-2 dark:disabled:border-secondary dark:disabled:bg-primary dark:disabled:text-gray-600 md:text-base
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <div>{icon}</div>}
      <div>{text}</div>
    </button>
  );
};

export default Button;
