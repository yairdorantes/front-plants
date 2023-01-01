import { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { format } from "date-fns";
import born from "../media/born.png";
import "react-day-picker/dist/style.css";
import SpeedDial from "./SpeedDial";
import axios from "axios";
import { vars } from "./Host";
import { useParams } from "react-router-dom";
import ModalFileDate from "./ModalFileDate";
const PlantView = () => {
  const params = useParams();
  const [plant, setPlant] = useState();
  const [track, setTrack] = useState(false);
  const [message, setMessage] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const [info, setInfo] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const handleTrack = () => {
    track ? setTrack(false) : setTrack(true);
  };
  const updateInfo = (e) => {
    setInfo(e.target.value);
  };
  const sendInfo = (e) => {
    if (info != "") {
      axios.post(`${vars.host}add-info/${plant._id}`, { info });
      handleToggle();
      getData();
    }
  };
  const hideTrack = () => {
    setTrack(false);
  };
  const handleShowInfo = () => {
    showInfo ? setShowInfo(false) : setShowInfo(true);
  };
  const getData = () => {
    axios
      .get(`${vars.host}plant/${params.id}`)
      .then((res) => {
        console.log(res.data);
        setPlant(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);
  // useEffect(() => {
  //   getData();
  // }, [sendInfo]);

  return (
    <>
      {plant && (
        <div className="container mx-auto flex flex-col gap-5  items-center mt-10">
          <div className="text-4xl font-black text-green-300">{plant.name}</div>
          <SpeedDial />
          <img className="mask mask-squircle " src={plant.photo} />
          <div className="flex items-cente gap-3">
            <img className="w-7" src={born} alt="" />
            <div className="font-bold">{plant.born}</div>
          </div>
          {/* tracking phots */}
          <div
            className={`collapse ${
              showInfo ? "collapse-open" : "collapse-close"
            } collapse-arrow border border-base-300 bg-base-100 rounded-box`}
          >
            <div
              onClick={handleShowInfo}
              className="collapse-title text-xl font-medium "
            >
              Data
            </div>

            <div className="collapse-content">
              <div>Here you can add extra data about your plant</div>
              <ul className="list-disc text-xl">
                {plant.data.map((item, key) => {
                  return <li key={key}>{item}</li>;
                })}
              </ul>
            </div>
            {/* <div>jaaj</div> */}
          </div>

          <OutsideClickHandler onOutsideClick={hideTrack}>
            <div
              // tabIndex={0}
              className={`collapse ${
                track ? "collapse-open" : "collapse-close"
              } collapse-arrow border border-base-300 bg-base-100 rounded-box`}
            >
              <div
                onClick={handleTrack}
                className="collapse-title text-xl font-medium "
              >
                Tracking 📸
              </div>

              <div className="collapse-content">
                <div>
                  <ul className="steps steps-vertical gap-3">
                    {plant.tracking.map((item, key) => {
                      return (
                        <li data-content="●" className="step step-primary ">
                          <div className="flex justify-center items-center gap-5">
                            <img
                              className="rounded-full mb-3 w-[180px] h-[180px] object-cover"
                              src={item.photo}
                              alt=""
                            />
                            <div>{item.date}</div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </OutsideClickHandler>
          <ModalFileDate
            isTracking={true}
            plant={plant._id}
            getData={getData}
          />

          {/* modal add data */}
          {/* <input type="checkbox" id="my-modal-5" className="modal-toggle" /> */}
          <input
            type="checkbox"
            id="my-modal-5"
            className="modal-toggle"
            checked={isOpen}
            onChange={handleToggle}
          />
          <label
            id="modal-track"
            htmlFor="my-modal-5"
            className="modal cursor-pointer "
          >
            <label
              className="modal-box relative flex flex-col items-center "
              htmlFor=""
            >
              <label
                htmlFor="my-modal-5"
                className="btn btn-sm btn-circle absolute right-2 top-2 "
              >
                ✕
              </label>

              <h3 className="text-lg font-bold">Add to the tracking</h3>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered  w-full max-w-xs"
                onChange={updateInfo}
                autoFocus
              />
              <button
                onClick={sendInfo}
                className="btn btn-secondary mt-5 w-full"
              >
                Enviar
              </button>
              {message && (
                <div className="alert alert-error shadow-lg mt-5 absolute -top-5">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="stroke-current flex-shrink-0 h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Fill correctly all the fields</span>
                  </div>
                </div>
              )}
            </label>
          </label>
          {/* ends modal add data */}
        </div>
      )}
    </>
  );
};

export default PlantView;
