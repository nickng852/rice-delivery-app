import Spin from "../animate/Spin";

const Card = ({ text, icon, value }) => {
  return (
    <>
      <main className="w-full space-y-2 rounded-lg bg-white p-4 shadow-sm drop-shadow-sm dark:bg-tertiary dark:text-white">
        <div className="text-sm md:text-base md:font-medium">{text}</div>
        <div className="flex items-center space-x-2">
          {icon && <div>{icon}</div>}
          <div className="text-xs md:text-sm md:font-light">{value}</div>
          {(value === "Online" || value === "Offline") && (
            <Spin value={value} />
          )}
        </div>
      </main>
    </>
  );
};

export default Card;
