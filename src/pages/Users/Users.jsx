import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../../components";
import { delImage, delUser, getUserRole, getUsers } from "../../config/api";
import { URL_APi } from "../../config/CONST";

const Users = () => {
  const [users, setUsers] = useState([]);
  
  var handleGetUser = async () => {
    try {
      const res = await getUsers();
     
      setUsers(res.data.data);

    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    handleGetUser()
  }, [])

  console.log(URL_APi)
  
  const handleDel = async (user) => {
    if (window.confirm("do you want to delete this User?")) {
      try {
        await delImage(user?.avatar)
        await delUser(user._id);
        alert("delete Role successfully");
        handleGetUser();
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <div>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="Page" title="Users" />
        <div className="my-10">
          <Link
            to="/create-user"
            className="font-bold py-2 px-4 rounded bg-primary text-white"
          >
            Create User
          </Link>
        </div>
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Avatar
                </th>
                <th scope="col" className="py-3 px-6">
                  Email
                </th>
                <th scope="col" className="py-3 px-6">
                  User Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Position
                </th>
                <th scope="col" className="py-3 px-6">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((item) => (
                <tr
                  key={item._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="p-4 w-32">
                    <img src={URL_APi + item?.avatar} alt="Apple Watch" />
                  </td>
                  <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                    {item.email}
                  </td>
                  <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                    {item.userName}
                  </td>
                  <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                    {item?.userRole?.name}
                  </td>
                  <td className="py-4 px-6 flex flex-col ">
                    <button
                      onClick={() => handleDel(item)}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline my-4 text-left"
                    >
                      Remove
                    </button>
                    <Link
                      to={`/update-user/${item._id}`}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline my-4 text-left"
                    >
                      Update
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
