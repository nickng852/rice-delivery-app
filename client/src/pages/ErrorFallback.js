import { Link } from "react-router-dom";

const ErrorFallback = ({ resetErrorBoundary }) => {
  const handleClick = () => {
    resetErrorBoundary();
    window.location.reload();
  };

  return (
    <>
      <div className="absolute inset-0 flex flex-col items-center justify-center dark:bg-secondary">
        <div className="flex flex-col items-center justify-center p-6 lg:flex-row lg:space-x-6">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-24 w-24 text-gray-800 dark:text-gray-400 lg:h-44 lg:w-44"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col space-y-1">
              <span className="text-center text-xl text-gray-800 dark:text-gray-400 lg:text-left lg:text-3xl">
                Oops!
              </span>

              <span className="text-center text-base font-thin text-gray-800 dark:text-gray-400 lg:text-left lg:text-xl">
                Something went wrong. Please refresh the page.
              </span>
            </div>

            <div className="text-center lg:text-left">
              <Link to="/">
                <button
                  className="rounded-lg border-2 border-gray-800 px-4 py-2 text-sm transition ease-in hover:bg-gray-800 hover:text-gray-200 dark:border-gray-400 dark:text-gray-400 dark:hover:bg-gray-400 dark:hover:text-gray-800 lg:text-base"
                  onClick={handleClick}
                >
                  Refresh
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorFallback;
