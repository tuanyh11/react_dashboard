import React, { useEffect, useState } from "react";
import { useController, useForm } from "react-hook-form";
import { Header, ImageInput, OptionCheckbox } from "../../components";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import {
  createUser,
  delUser,
  getUserRoles,
  getUsers,
  updateUser,
  uploadSigleImage,
} from "../../config/api";
import Contract from "./Contract";

const CreateUser = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    watch,
    getValues,
    control,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      roleId: 0,
      userName: "",
      avatar: "",
      address: {
        name: "",
        phone: "",
      },
      contract: {
        dateStart: "",
        dateEnd: "",
        content: "",
      },
    },
  });

  const [isUpdate, setIsUpdate] = useState(false);
  const [roles, setRoles] = useState([]);

  const { field } = useController({
    control,
    name: "avatar",
  });

  const { field: roleId } = useController({
    control,
    name: "roleId",
  });

  const isEmployee = roles.some(
    ({ _id, name }) =>
      _id === roleId.value &&
      name.toLowerCase() !== "admin" &&
      name.toLowerCase() !== "user"
  );
  console.log(watch("contract.content"));

  const handleOnSubmit = async (data) => {
    try {
 
      if (isFileList) {
        const formData = new FormData();
        formData.append("single_image", data.avatar[0]);
        const res = await uploadSigleImage(formData);
        data.avatar = res.data.data;
        await createUser({ ...data });
        window.confirm("create user successfully");
        reset();
      }
;
    } catch (error) {
      alert("Error " + error.response.data.message);
    }
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


  const handleUpdate = (item) => {
    Object.entries(item).forEach(([key, value]) => setValue(key, value));
    setIsUpdate(true);
  };

  const registerImage = register('avatar', {
    required: {
      value: !isUpdate,
      message: "Image is required",
    },
    pattern: {
      value: /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i,
    },
    // onChange: (e) => setImage(e.target.files[0]),
  })

  var isFileList = field.value instanceof FileList && field.value.length > 0;

  const registerRole = register('roleId', {
    required: {
      value: true,
      message: "Role is required",
    },
  })

  return (
    <div>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 rounded-3xl">
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
          <Header category="Page" title="Products" />

          <div className="grid grid-cols-1 lg:grid-cols-0 gap-8">
            <div className="">
              <form
                action=""
                onSubmit={handleSubmit((data) => handleOnSubmit(data))}
              >
                <div className="flex flex-col !mb-5">
                  <span className="text-sm font-medium mb-1">Email</span>
                  <span className="text-sm  text-red-500 mb-2">
                    {errors?.email?.message}
                  </span>
                  <input
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer"
                    {...register("email", {
                      required: {
                        value: true,
                        message: "This field is required",
                      },
                      pattern: {
                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                        message: "Invalid email address",
                      },
                    })}
                  />
                </div>

                <div className="flex flex-col !mb-5">
                  <span className="text-sm font-medium mb-1">Password</span>
                  <span className="text-sm  text-red-500 mb-2">
                    {errors?.password?.message}
                  </span>

                  <input
                    type={"text"}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer"
                    {...register("password", {
                      required: {
                        value: true,
                        message: "This field is required",
                      },
                      minLength: {
                        value: 5,
                        message: "This field should be at least 5 characters",
                      },
                    })}
                  />
                </div>

                <div className="flex flex-col !mb-5">
                  <span className="text-sm font-medium mb-1">
                    Password Confirm
                  </span>
                  <span className="text-sm  text-red-500 mb-2">
                    {errors?.passwordConfirm?.message}
                  </span>

                  <input
                    type={"text"}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer"
                    {...register("passwordConfirm", {
                      validate: (value) =>
                        value === watch("password") ||
                        "The passwords do not match",
                    })}
                  />
                </div>

                <div className="flex flex-col !mb-5">
                  <span className="text-sm font-medium mb-1">User name</span>
                  <span className="text-sm  text-red-500 mb-2">
                    {errors?.password?.message}
                  </span>

                  <input
                    type={"text"}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer"
                    {...register("userName", {
                      required: {
                        value: true,
                        message: "This field is required",
                      },
                      minLength: {
                        value: 5,
                        message: "This field should be at least 5 characters",
                      },
                    })}
                  />
                </div>

                <div className="mb-5">
                  <OptionCheckbox
                    data={roles}
                    label="Role"
                    register={registerRole}
                    name="roleId"
                    type="radio"
                  />
                </div>

                <div className="">
                  <ImageInput
                    register={registerImage}
                    name={"avatar"}
                    label="User Image"
                    errors={errors?.avatar?.message}
                    isFile={isFileList}
                    perViewFile={field.value}
                  />
                </div>

                {isEmployee && (
                  <div className="">
                    <div className="text-3xl font-extrabold tracking-tight text-slate-900 my-10">
                      Contract
                    </div>
                    <div className="flex items-center  gap-4 mb-10">
                      <span className="text-sm font-medium mb-1">End Date</span>
                      <div className="relative">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                          <svg
                            aria-hidden="true"
                            className="w-5 h-5 text-gray-500 dark:text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        <input
                          datepicker=""
                          datepicker-autohide=""
                          type="date"
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 datepicker-input"
                          placeholder="Select date"
                        />
                      </div>
                    </div>
                    <Contract setValue={setValue} name={"contract.content"} />
                  </div>
                )}

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
