import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import axios from "axios";
import { vars } from "./Host";
import Loader from "./Loader";
const ModalFileDate = ({ isTracking = false, plant, getData }) => {
  const owner = JSON.parse(localStorage.getItem("GreenHouse"));
  const [humanFormat, setHumanFormat] = useState();
  const [selected, setSelected] = useState();
  const [message, setMessage] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handlePhotoData = () => {
    if (isTracking) {
      if (humanFormat != undefined && image != "") {
        setLoader(true);
        axios
          .post(`${vars.host}add-trackings/${plant}`, {
            track: { photo: image, date: humanFormat },
          })
          .then((res) => {
            console.log(res);
            setLoader(false);
            handleToggle();
            getData();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      if (humanFormat != undefined && image != "" && name != "") {
        // console.log(humanFormat);
        // console.log(image);
        setLoader(true);
        axios
          .post(`${vars.host}create-plant`, {
            photo: image,
            name,
            born: humanFormat,
            owner,
          })
          .then((res) => {
            console.log(res);
            getData();
            handleToggle();
            setLoader(false);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        setMessage(true);
        setTimeout(() => {
          setMessage(false);
        }, 4000);
      }
    }
  };
  const handleFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      // console.log(reader.result, "here result");
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const handleName = (e) => {
    setName(e.target.value);
  };

  useEffect(() => {
    try {
      setHumanFormat(format(selected, "PP"));
    } catch (error) {
      //lmao who cares
    }
  }, [selected]);

  return (
    <div>
      {/* Put this part before </body> tag */}

      <input
        type="checkbox"
        id="my-modal-7"
        className="modal-toggle"
        checked={isOpen}
        onChange={handleToggle}
      />

      <label
        id="modal-track"
        htmlFor="my-modal-7"
        className="modal cursor-pointer "
      >
        <label
          className="modal-box relative flex flex-col items-center "
          htmlFor=""
        >
          <label
            htmlFor="my-modal-7"
            className="btn btn-sm btn-circle absolute right-2 top-2 "
          >
            ✕
          </label>

          <h3 className="text-lg font-bold">Add to the tracking</h3>

          {!isTracking && (
            <input
              type="text"
              placeholder="Name:"
              onChange={handleName}
              className="input input-bordered w-full max-w-xs"
            />
          )}
          <input
            type="file"
            className="file-input w-full max-w-xs mt-4"
            onChange={handleFile}
          />
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={setSelected}
            // footer={footer}
          />
          <div className="font-bold -mt-2">{humanFormat}</div>

          {!loader ? (
            <button
              onClick={handlePhotoData}
              className="btn btn-primary mt-5 w-full"
            >
              Enviar
            </button>
          ) : (
            <Loader />
          )}

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
    </div>
  );
};

export default ModalFileDate;
