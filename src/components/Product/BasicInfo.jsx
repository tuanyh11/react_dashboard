import React, { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import {RiArrowDownSLine} from "react-icons/ri"
import { URL_APi } from "../../config/CONST";
import { useBase64 } from "../../hooks";

const BasicInfo = ({categories = []}) => {
  const { formState: {errors}, register, setValue, watch } = useFormContext()

  const [toggleCate, setToggleCate] = useState(false)


  const nameError = errors?.name?.message
  const unitError = errors?.unit?.message
  const desError = errors?.description?.message
  const imgError = errors?.image?.message


  return (
    <div>
      <div className="bg-white p-10 rounded-xl px-80 py-20 shadow-md">
        <h1 className="text-lg font-extrabold">Basic information</h1>
        <div className="mt-8 ">
          <div className="flex flex-col !mb-5">
            <span className="text-sm font-medium mb-1">Name Product</span>
            <span className="text-sm  text-red-500 mb-2">
              {nameError}
            </span>
            <input
              {...register("name", {
                required: {
                  value: true,
                  message: "Product name cannot be empty",
                },

                minLength: {
                  value: 2,
                  message: "Product name must be at least 2 characters",
                },
              })}
              className={`outline-none  border !py-3 px-3 rounded-md text-sm ${nameError ? 'border-red-500': ''}`}
            />
          </div>



          <div className="mb-5">
            <button
              className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
              onClick={() => setToggleCate((pre) => !pre)}
            >
              Categories{" "}
              <RiArrowDownSLine/>
            </button>
            <div className="my-2">
              <span className="text-sm  text-red-500 mb-2">
                {errors?.categories?.message}
              </span>
            </div>
            <div
              className={`${
                toggleCate ? "" : "hidden"
              } z-10 w-60 bg-white rounded shadow dark:bg-gray-700`}
            >
              <ul
                className="overflow-y-auto px-3 pb-3 h-48 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownSearchButton"
              >
                {categories.map((item, i) => (
                  <li key={item._id}>
                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                      <input
                        id={`${item._id}`}
                        type="checkbox"
                        value={item._id}
                        {...register(`categories`)}
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

          <div className="flex flex-col !mb-5">
            <span className="text-sm font-medium mb-1">Unit</span>
            <span className="text-sm  text-red-500 mb-2">
              {errors?.unit?.message}
            </span>
            <input
              {...register("unit", {
                required: {
                  value: true,
                  message: "Product Unit cannot be empty",
                },

                minLength: {
                  value: 2,
                  message: "Product Unit should be 10 characters long",
                },
              })}
              className={`outline-none  border !py-3 px-3 rounded-md text-sm ${unitError ? 'border-red-500': ''}`}
            />
          </div>

          <div className="flex flex-col !mb-5">
            <span className="text-sm font-medium mb-1">Description</span>
            <span className="text-sm  text-red-500 mb-2">
              {desError}
            </span>
            <textarea
              className={`outline-none  border !py-3 px-3 rounded-md text-sm ${desError ? 'border-red-500': ''}`}
              rows={10}
              {...register("description", {
                maxLength: {
                  value: 200,
                  message: "product description less than 200 characters",
                },
                minLength: {
                  value: 50,
                  message: "product description must be at least 50 characters",
                },
                required: {
                  value: true,
                  message: "Product description cannot be empty",
                },
              })}
            />
          </div>

          <div className="mb-8">
            <span className="text-sm font-medium mb-2">Image</span>
            <div className="text-sm  text-red-500 mb-2">
              {imgError}
            </div>
            <input
              type="file"
              id="file"
              className="sr-only"
              {...register("imageFake", {
                pattern: {
                  value: /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i,
                },
                onChange: (e) => {
                   if(e.target.files.length > 0) {
                    const url = URL.createObjectURL(e.target.files[0])
                    const file = e.target.files[0]
                    file.preview = url
                    setValue("image", file)
                   }
                },
                required: {
                  value: watch('image') ? false : true,
                  message: "Product image cannot be empty",
                },
              })}
            />
            <label
              htmlFor="file"
              className={`relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed  p-12 text-center ${imgError ? 'border-red-500' : 'border-[#e0e0e0]'}`}
            >
              <div>
                <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                  Drop files here
                </span>
                <span className="mb-2 block text-base font-medium text-[#6B7280]">
                  Or
                </span>
                <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                  Browse
                </span>
              </div>
            </label>
            <img
              className="max-w-80 max-h-80 object-contain mr-auto ml-auto mt-5"
              src={watch("image")?.preview ? watch("image")?.preview : URL_APi+watch("image")}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
