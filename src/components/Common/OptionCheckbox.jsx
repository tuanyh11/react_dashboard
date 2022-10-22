import React, { useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";

const OptionCheckbox = ({label, error, data = [], register, name, type}) => {
    const [toggle, setToggle] = useState(false)

  return (
    <div>
      <button
        className="flex gap-40 items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800  focus:outline-none  dark:bg-blue-600 dark:hover:bg-blue-700 "
        type="button"
        onClick={() => setToggle((pre) => !pre)}
      >
        {label}
        <RiArrowDownSLine/>
      </button>
      <div className="my-2">
        <span className="text-sm  text-red-500 mb-2">
          {error}
        </span>
      </div>
      <div
        className={`${
            toggle ? "" : "hidden"
        } z-10 w-60 bg-white rounded shadow dark:bg-gray-700`}
      >
        <ul
          className="overflow-y-auto px-3 pb-3 h-48 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownSearchButton"
        >
          {data.map((item) => (
            <li key={item._id}>
              <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                <input
                  id={`${item._id}`}
                  type={type}
                  value={item._id}
                  {...register}
                  className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor={`${item._id}`}
                  className="ml-2 w-full text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                >
                  {item.name}
                </label>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OptionCheckbox;
