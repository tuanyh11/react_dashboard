import React, { useEffect } from "react";
import { RiDeleteBinLine, RiFileAddFill } from "react-icons/ri";
import { URL_APi } from "../../config/CONST";

const TableProdVariant = ({
  data,
  register,
  getValues,
  setValue,
  errors,
  watch,
  unregister,
}) => {
  watch("productItems");
  return (
    <div>
      <div className="overflow-x-auto relative">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Option
              </th>
              <th scope="col" className="py-3 px-6">
                Price
              </th>
              <th scope="col" className="py-3 px-6">
                image
              </th>
              <th scope="col" className="py-3 px-6">
                quantity
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, i) => {
              const errorPrice = errors?.productItems?.[i]?.price?.message;
              const errorQuantity =
                errors?.productItems?.[i]?.quantity?.message;
              const image = watch(`productItems.[${i}].image`);

              return (
                <tr
                  key={i}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="py-8 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.option}
                  </th>
                  <td className="py-8 px-6">
                    <div className="flex flex-col gap-2 relative">
                      <span className="text-sm  text-red-500 absolute -top-1/2">
                        {errorPrice}
                      </span>
                      <input
                        className={`outline-none  border !py-3 px-3  rounded-md text-sm appearance-none ${
                          errorPrice ? "border-red-500" : ""
                        }`}
                        placeholder="Price"
                        {...register(`productItems.[${i}.price]`, {
                          onChange: (e) => {
                            setValue(
                              `productItems.[${i}].price`,
                              e.target.value
                            );
                          },
                          required: {
                            value: true,
                            message: "This field is required",
                          },
                          pattern: {
                            value: /^[0-9]*$/,
                            message: "This field should be mumber",
                          },
                          min: {
                            value: 1000,
                            message:
                              "This field must be greater than or equal 1.000",
                          },
                        })}
                      />
                    </div>
                  </td>
                  <td className="py-8 px-6">
                    {image ? (
                      <div className="relative w-16 h-16 group ">
                        <img
                          src={image?.preview ? image.preview : URL_APi+image}
                          alt=""
                          className="border w-full h-full object-contain "
                        />
                        <div className="absolute bottom-0 py-1 hidden group-hover:flex bg-gray-200  justify-center text-lg  left-0 right-0">
                          <RiDeleteBinLine
                            onClick={() => {
                              unregister(`productItems.[${i}].image`, "");
                            }}
                            className="cursor-pointer hover:text-gray-900"
                          />
                        </div>
                      </div>
                    ) : (
                      <label
                        className="text-4xl  text-primary cursor-pointer"
                        htmlFor={`id-${i}`}
                      >
                        <RiFileAddFill />
                      </label>
                    )}
                    <input
                      type="file"
                      id={`id-${i}`}
                      {...register(`productItems.[${i}.image]`, {
                        onChange: (e) => {
                          if (e.target.files.length > 0) {
                            const preview = URL.createObjectURL(
                              e.target.files[0]
                            );
                            const file = e.target.files[0];
                            file.preview = preview;
                            setValue(`productItems.[${i}].image`, file);
                          }
                        },
                      })}
                      className="hidden"
                    />
                  </td>
                  <td className="py-8 px-6">
                    <div className="flex flex-col gap-2 relative ">
                      <span className="text-sm  text-red-500 absolute -top-1/2">
                        {errorQuantity}
                      </span>
                      <input
                        className={`outline-none  border !py-3 px-3  rounded-md text-sm appearance-none ${
                          errorQuantity ? "border-red-500" : ""
                        }`}
                        placeholder="quantity"
                        type={"number"}
                        {...register(`productItems.[${i}.quantity]`, {
                          onChange: (e) => {
                            setValue(
                              `productItems.[${i}].quantity`,
                              e.target.value
                            );
                          },
                          required: {
                            value: true,
                            message: "This field is required",
                          },
                          pattern: {
                            value: /^[0-9]*$/,
                            message: "This field should be mumber",
                          },
                          min: {
                            value: 1,
                            message: "This field must be greater than 0",
                          },
                        })}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableProdVariant;
