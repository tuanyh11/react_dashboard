import React, { useContext, useEffect, useState } from "react";
import { getCategories } from "../../config/api";
import { useProductCxt } from "./ProductCxt";

const ProductInfo = () => {
  const { formProduct } = useProductCxt();
  const [categories, setCategories] = useState([]);
  const [toggleCate, setToggleCate] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    watch,
  } = formProduct;

  var handleGetCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetCategories();
  }, []);



  return (
    <div>
      <div className="bg-white p-10 rounded-xl shadow-md">
        <h1 className="text-lg font-extrabold">Basic information</h1>
        <div className="mt-8 ">
          <div className="flex flex-col !mb-5">
            <span className="text-sm font-medium mb-1">Name Product</span>
            <span className="text-sm  text-red-500 mb-2">
              {errors?.name?.message}
            </span>
            <input
              {...register("name", {
                required: {
                  value: true,
                  message: "Product name cannot be empty",
                },

                minLength: {
                  value: 2,
                  message: "Product name should be 10 characters long",
                },
              })}
              className="outline-none  border !py-3 px-3 rounded-md text-sm"
            />
          </div>

          <div className="flex flex-col !mb-5">
            <span className="text-sm font-medium mb-1">Price</span>
            <span className="text-sm  text-red-500 mb-2">
              {errors?.price?.message}
            </span>
            <input
              className="outline-none  border !py-3 px-3 rounded-md text-sm"
              {...register("price", {
                required: {
                  value: true,
                  message: "Product price is required",
                },
                maxLength: {
                  value: 20,
                  message: "Product price less than 20 characters long",
                },
                min: {
                  value: 0,
                  message: "Product price must greater than or equal zero",
                },
                pattern: {
                  value: /^[0-9]*$/,
                  message: "Product price is should be mumber",
                },
              })}
            />
          </div>

          <div className="flex flex-col !mb-5">
            <span className="text-sm font-medium mb-1">Quantity</span>
            <span className="text-sm  text-red-500 mb-2">
              {errors?.price?.message}
            </span>
            <input
              className="outline-none  border !py-3 px-3 rounded-md text-sm"
              {...register("quantity", {
                required: {
                  value: true,
                  message: "Product quantity is required",
                },
                maxLength: {
                  value: 20,
                  message: "Product quantity less than 20 characters long",
                },
                min: {
                  value: 0,
                  message: "Product quantity must greater than or equal zero",
                },
                pattern: {
                  value: /^[0-9]*$/,
                  message: "Product quantity is should be mumber",
                },
              })}
            />
          </div>

          <div className="mb-5">
            
            <button
              className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
              onClick={() => setToggleCate(pre => !pre)}
            >
              Categories{" "}
            </button>
              <div className="my-2">
                  <span className="text-sm  text-red-500 mb-2">
                  {errors?.categories?.message}
                </span>
              </div>
            <div className={`${toggleCate ? '' : 'hidden'} z-10 w-60 bg-white rounded shadow dark:bg-gray-700`}>
              <div className="p-3">
                <label htmlFor="input-group-search" className="sr-only">
                  Search
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="input-group-search"
                    className="bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search Category"
                  />
                </div>
              </div>
              <ul
                className="overflow-y-auto px-3 pb-3 h-48 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownSearchButton"
              >
                {categories.map((item) => 
                  <li key={item._id}>
                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                      <input
                        id={`${item._id}`}
                        type="checkbox"
                        value={item._id}
                        {...register('categories', 
                          {
                            required: {
                              value: true,
                              message: "Product Categories is required"
                            }
                          }
                        )}
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
                )}
              </ul>
            </div>
          </div>

          <div className="flex flex-col !mb-5">
            <span className="text-sm font-medium mb-1">Unit</span>
            <span className="text-sm  text-red-500 mb-2">
              {errors?.name?.message}
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
              className="outline-none  border !py-3 px-3 rounded-md text-sm"
            />
          </div>

          <div className="flex flex-col !mb-5">
            <span className="text-sm font-medium mb-1">Description</span>
            <textarea
              className="outline-none  border !py-3 px-3 rounded-md text-sm"
              rows={10}
              {...register("description", {
                maxLength: {
                  value: 200,
                  message: "product description less than 200 characters",
                },
              })}
            />
          </div>

          <div className="mb-8">
            <span className="text-sm font-medium mb-2">Image</span>
            <div className="text-sm  text-red-500 mb-2">
              {errors?.image?.message}
            </div>
            <input
              type="file"
              id="file"
              className="sr-only"
              {...register("image", {
                required: {
                  value: true,
                  message: "Image is required",
                },
                pattern: {
                  value: /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i,
                },
              })}
            />
            <label
              htmlFor="file"
              className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
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
              src={
                watch("image")?.[0]
                  ? URL.createObjectURL(getValues("image")[0])
                  : ""
              }
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
