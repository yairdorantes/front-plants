// import plant1 from "https://www.ikea.com/mx/en/images/products/fejka-artificial-potted-plant-with-pot-in-outdoor-succulent__0614211_pe686835_s5.jpg?f=s";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ModalFileDate from "./ModalFileDate";
import axios from "axios";
import { vars } from "./Host";

const Plants = () => {
  const mainData = JSON.parse(localStorage.getItem("GreenHouse"));
  const navigate = useNavigate();

  const [plantsAPI, setPlantsAPI] = useState([]);
  const [plants, setPlants] = useState();
  const searchPlant = (e) => {
    const query = e.target.value.toLowerCase();
    const results = plantsAPI.filter((plant) => {
      return plant.name.toLowerCase().includes(query);
    });
    // console.log(e.target.value.length);
    if (results.length === 0) {
      setPlants(plantsAPI);
    } else {
      setPlants(results);
    }
  };
  const getData = () => {
    try {
      axios
        .get(`${vars.host}gs-plants/${mainData._id}`)
        .then((res) => {
          setPlantsAPI(res.data);
          setPlants(res.data);
          console.log(res.data);
          // console.log(plants && plants.length);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      // console.(error);
      // alert(error);
    }
  };

  useEffect(() => {
    getData();
    mainData === null && navigate("/validate");
  }, []);

  return (
    <>
      <div className="mb-5  text-center text-2xl text-white font-black">
        Plants Collection
      </div>
      <div className="flex gap-5 justify-center ">
        <form>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative  w-max">
            <div className="absolute  inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Mockups, Logos..."
              onChange={searchPlant}
              required
            />
          </div>
        </form>
        <label htmlFor="my-modal-7">
          <div className="btn btn-primary  mb-10">add Plants+</div>
        </label>
      </div>

      <div className="flex flex-wrap justify-center w-screen gap-10">
        {plants && plants.length > 0 && mainData ? (
          plants.map((plant, key) => {
            return (
              <Link key={key} to={`/plant/${plant._id}`}>
                <div>
                  <div className="avatar">
                    <div className="w-24  rounded-full ring ring-success ring-offset-base-100 ring-offset-2">
                      <img src={plant.photo} />
                    </div>
                  </div>
                  <div className="font-medium mt-3 text-center text-blue-600 dark:text-blue-500 hover:underline">
                    {plant.name}
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div>
            <div className="alert alert-info shadow-lg">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="stroke-current flex-shrink-0 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>Invernadero vacio 🪹</span>
              </div>
            </div>
          </div>
        )}
      </div>
      <ModalFileDate getData={getData} />
    </>
  );
};

export default Plants;
