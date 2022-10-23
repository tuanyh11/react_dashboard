import React, { useEffect, useState, useDeferredValue } from "react";
import { Header } from "../../components";
import { useController, useForm } from "react-hook-form";
import { URL_APi } from "../../config/CONST";
import {
  createUserRole,
  delUserRole,
  getUserRoles,
  updateUserRole,
} from "../../config/api";
import Table from "./Table";

const UserRole = () => {
  const { 
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      displayName: "",
      monthlySalary: '',
      active: true,
    },
  });

  const [isUpdate, setIsUpdate] = useState(false);
  const [roles, setRoles] = useState([]);

  const handleOnSubmit = async (data) => {
    try {
      if (!isUpdate) {
        await createUserRole({ ...data });
        window.confirm("create  Role successfully");
        reset();
        handleGetRoles();
        return;
      }

      if (isUpdate) {
        await updateUserRole(data._id, data);
        setIsUpdate(false);
        window.confirm("update combo successfully");
      }

      reset();
      handleGetRoles();
    } catch (error) {
      alert("Error " + error.response.data.message);
    }

    console.log(data);
  };

  var handleGetRoles = async () => {
    try {
      const res = await getUserRoles();
      setRoles(res.data.data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    handleGetRoles();
  }, []);

  const handleDel = async (id) => {
    if (window.confirm("do you want to delete this Role?")) {
      try {
        await delUserRole(id);
        alert("delete Role successfully");
        handleGetRoles();
      } catch (error) {
        alert(error);
      }
    }
  };

  const handleUpdate = (item) => {
    Object.entries(item).forEach(([key, value]) => setValue(key, value));
    setIsUpdate(true);
  };

  return (
    <div>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 rounded-3xl">
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
          <Header category="Page" title="User Role" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="">
              <form
                action=""
                onSubmit={handleSubmit((data) => handleOnSubmit(data))}
              >
                {
                  !isUpdate &&
                  <div className="flex flex-col !mb-5">
                    <span className="text-sm font-medium mb-1">Name</span>
                    <span className="text-sm  text-red-500 mb-2">
                      {errors?.name?.message}
                    </span>
                    <input
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer"
                      {...register("name", {
                        required: {
                          value: true,
                          message: "This field is required",
                        },
                        onChange: (e) => setValue("name", e.target.value.replace(' ', ''))
                      })}
                    />
                  </div>
                }

                <div className="flex flex-col !mb-5">
                  <span className="text-sm font-medium mb-1">Display Name</span>
                  <span className="text-sm  text-red-500 mb-2">
                    {errors?.displayName?.message}
                  </span>

                  <input
                    type={"text"}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer"
                    {...register("displayName", {
                      required: {
                        value: true,
                        message: "This field is required",
                      },
                    })}
                  />
                </div>

                <div className="flex flex-col !mb-5">
                  <span className="text-sm font-medium mb-1">
                    Monthly Salary
                  </span>
                  <span className="text-sm  text-red-500 mb-2">
                    {errors?.monthlySalary?.message}
                  </span>

                  <input
                    placeholder="%"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer"
                    {...register("monthlySalary", {
                      min: {
                        value: 0,
                        message: "this cannot be negative",
                      },
                      pattern: {
                        value: /^[0-9]*$/,
                        message: "This field should be a valid Numeric",
                      },
                    })}
                  />
                </div>

                <div className="flex items-center justify-between mt-5">
                  <button
                    type="submit"
                    className="block mt-2 px-3 py-2 bg-primary  rounded-md text-white"
                  >
                    {isUpdate ? "Updating" : "Creating"}
                  </button>

                  {isUpdate && (
                    <span
                      onClick={() => {
                        setIsUpdate(false);
                      }}
                      className="font-medium text-primary  cursor-pointer text-base hover:underline my-4"
                    >
                      {"To Creating"}
                    </span>
                  )}
                </div>
              </form>
            </div>

            <div>
              <Table {...{ roles, register, handleUpdate, handleDel }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRole;
