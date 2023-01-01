import React, { useState } from "react";
import { vars } from "./Host";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const initilForm = {
  name: "",
  green_house: "",
  password: "",
  email: "",
};
const GsForm = () => {
  const [tab, setTab] = useState(1);
  const [form, setForm] = useState(initilForm);
  const [res, setRes] = useState("res");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // alert(form);
    if (tab === 1) {
      axios
        .post(`${vars.host}validate-gs`, form)
        .then((response) => {
          if (response.data.approved) {
            localStorage.setItem(
              "GreenHouse",
              JSON.stringify(response.data.gs)
            );
            navigate("/plants");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .post(`${vars.host}create-gs`, form)
        .then((res) => {
          localStorage.setItem("GreenHouse", JSON.stringify(res.data.GS));
          navigate("/plants");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      {res}
      <div className="card mx-auto mt-10 w-96 badge-ghost text-primary-content">
        <div className="card-body">
          <div className="tabs tabs-boxed">
            <a
              className={tab === 0 ? "tab tab-active" : "tab"}
              onClick={() => setTab(0)}
            >
              Create
            </a>
            <a
              className={tab === 1 ? "tab tab-active" : "tab"}
              onClick={() => setTab(1)}
            >
              Enter
            </a>
          </div>
          <form>
            {tab === 1 ? (
              <div className="mb-6">
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  House green's id
                </label>
                <input
                  type="text"
                  id="name"
                  value={form.green_house}
                  onChange={handleChange}
                  name="green_house"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder="name@flowbite.com"
                  required
                />
              </div>
            ) : (
              <div className="mb-6">
                <label
                  //   for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  House green's name
                </label>
                <input
                  type="text"
                  id="name"
                  value={form.name}
                  onChange={handleChange}
                  name="name"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder="name@flowbite.com"
                  required
                />
              </div>
            )}
            {tab === 0 && (
              <div className="mb-6">
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={form.email}
                  onChange={handleChange}
                  name="email"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder="name@flowbite.com"
                  required
                />
              </div>
            )}

            <div className="mb-6">
              <label
                for="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                onChange={handleChange}
                value={form.password}
                name="password"
                id="password"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
              />
            </div>

            <button
              //   type="submit"
              onClick={handleSubmit}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {tab === 0 ? "Create" : "Enter"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default GsForm;
