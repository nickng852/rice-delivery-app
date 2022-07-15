const Card = ({ text, value }) => {
  return (
    <>
      <main className="w-full space-y-2 rounded-lg bg-white p-4 shadow-sm drop-shadow-sm dark:bg-tertiary dark:text-white">
        <div className="text-sm md:text-base md:font-medium">{text}</div>
        <div className="text-xs md:text-sm md:font-light">{value}</div>
      </main>
    </>
  );
};

export default Card;
