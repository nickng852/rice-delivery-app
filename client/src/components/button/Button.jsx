const Button = ({ text, onClick, disabled }) => {
  return (
    <button
      type="button"
      className={`text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 
        disabled:bg-gray-200 dark:disabled:bg-gray-200
          bg-blue-700
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
