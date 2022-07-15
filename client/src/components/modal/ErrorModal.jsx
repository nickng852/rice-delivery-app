import { useState, useEffect } from "react";

const Modal = ({ error, setError, text }) => {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (error) {
      setModalOpen(true);
    }
  }, [error]);

  console.log(error);

  const modalToggle = () => {
    setModalOpen(!modalOpen);
    setError(null);
  };

  return (
    <>
      {modalOpen && (
        <div
          id="popup-modal"
          tabIndex="-1"
          className="absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
        >
          <div className="relative h-auto w-full max-w-md p-4">
            <div className="relative rounded-lg bg-white shadow dark:bg-secondary">
              <button
                type="button"
                className="absolute top-3 right-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 transition-all hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-tertiary dark:hover:text-white md:text-base"
                data-modal-toggle="popup-modal"
                onClick={modalToggle}
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              <div className="p-6 text-center">
                <svg
                  className="mx-auto mb-4 h-14 w-14 text-gray-600 dark:text-gray-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <h3 className="mb-5  text-sm font-normal text-gray-500 dark:text-gray-400 md:text-base">
                  {error}
                </h3>
                <button
                  data-modal-toggle="popup-modal"
                  type="button"
                  className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500  transition-all hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-500 dark:bg-secondary dark:text-gray-300 dark:hover:bg-tertiary dark:hover:text-white dark:focus:ring-gray-600 md:text-base"
                  onClick={modalToggle}
                >
                  {text}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
