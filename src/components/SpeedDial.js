import { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import camera from "../media/camera.png";
import info from "../media/info.png";
const SpeedDial = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    show ? setShow(false) : setShow(true);
    console.log("xd");
  };

  const hide = () => {
    setShow(false);
  };

  return (
    <div>
      <OutsideClickHandler onOutsideClick={hide}>
        <div
          data-dial-init
          className="fixed  z-30 right-6 bottom-6 group "
          onClick={handleShow}
        >
          <div
            id="speed-dial-menu-default"
            className={`flex ${
              show ? "" : "hidden"
            } flex-col items-center mb-4 space-y-2`}
          >
            <label htmlFor="my-modal-5">
              <div
                type="button"
                data-tooltip-target="tooltip-share"
                data-tooltip-placement="left"
                className="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
              >
                <img src={info} className="w-1/2" alt="" />
              </div>
            </label>
            <label htmlFor="my-modal-4">
              <div
                type="button"
                data-tooltip-target="tooltip-share"
                data-tooltip-placement="left"
                className="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
              >
                <label htmlFor="my-modal-7">
                  <img src={camera} className="w-1/2 mx-auto" alt="" />
                </label>
              </div>
            </label>
          </div>
          <button
            type="button"
            data-dial-toggle="speed-dial-menu-default"
            aria-controls="speed-dial-menu-default"
            aria-expanded="false"
            className="flex justify-center items-center w-14 h-14 text-white bg-blue-700 rounded-full hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
          >
            <svg
              aria-hidden="true"
              className={`w-8 h-8 transition-transform ${
                show ? "rotate-45" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
            {/* <label htmlFor="my-modal-5" className="btn btn-primary">
              add info
            </label> */}
          </button>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default SpeedDial;
