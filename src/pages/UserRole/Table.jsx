import React from "react";

const Table = ({ roles = [], handleUpdate, handleDel }) => {

  console.log(roles)
  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              Name
            </th>
            <th scope="col" className="py-3 px-6">
              Display Name
            </th>
            <th scope="col" className="py-3 px-6">
              Monthly Saraly
            </th>
            <th scope="col" className="py-3 px-6">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {roles.map((item) => (
            <tr
              key={item._id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                {item.name}
              </td>
              <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                {item.displayName}
              </td>
              <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                {item?.monthlySalary}
              </td>
              <td className="py-4 px-6 flex flex-col ">
                <button
                  onClick={() => handleDel(item._id)}
                  className="font-medium text-red-600 dark:text-red-500 hover:underline my-4 text-left"
                >
                  Remove
                </button>
                <button
                  onClick={() => handleUpdate(item)}
                  className="font-medium text-red-600 dark:text-red-500 hover:underline my-4 text-left"
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
