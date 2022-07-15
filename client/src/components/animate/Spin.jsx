const Spin = ({ value }) => {
  return (
    <>
      <span className="item-center relative flex h-3 w-3">
        <span
          className={`absolute inline-flex h-full w-full animate-ping rounded-full ${
            value === "Online" ? "bg-green-500" : "bg-red-500"
          } opacity-75`}
        ></span>
        <span
          className={`relative inline-flex h-3 w-3 rounded-full ${
            value === "Online" ? "bg-green-500" : "bg-red-500"
          }`}
        ></span>
      </span>
    </>
  );
};

export default Spin;
