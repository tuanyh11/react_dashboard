import React, { useContext, useEffect, useState } from "react";
import { RiAddCircleFill, RiDeleteBin6Line } from "react-icons/ri";
import InputVariant from "./InputVariant";
import { useProductCxt } from "./ProductCxt";
import { useFieldArray, useForm } from "react-hook-form";

const initVariant = {
  k: "",
  v: [],
};

const ProductVariant = () => {
  const {
    setProductItems,
    showPreview,
    setShowPerview,
    formProduct,
    handleCreateProduct,
  } = useProductCxt();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    getValues,
    watch,
    setValue,
  } = formProduct;

  const [changeImage, setChangeImage] = useState(false);

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "variants",
    }
  );

  const {
    fields: fieldsProcItem,
    append: appendProcItem,
    remove: removeProcItem,

  } = useFieldArray({
    control,
    name: "procItems",
  });


  const autoCreateAtt = (data) => {
    const attributes = data?.variants?.reduce(
      (acc, { v: val }) => {
        return acc
          .map((el) => {
            return val.map((element) => {
              return el.concat([element]);
            });
          })
          .reduce((acc, val) => acc.concat(val), []);
      },
      [[]]
    );

    const flatAttributes = attributes.map((val) => {
      return val.map((item) => item.text);
    });

    const newProductItems = flatAttributes.reduce(
      (acc, val) =>
        acc.concat({
          option: val.join("-"),
          price: "",
          image: "",
          unique: val.sort().join("").replaceAll(" ", ""),
        }),
      []
    );

    newProductItems.forEach((element) => {
      appendProcItem({ ...element });
    });

    setProductItems(...newProductItems)
  };

  useEffect(() => {
    setValue("applyPrice", watch("price"));
  }, [fieldsProcItem]);


  console.log(fieldsProcItem)

  const handleApplyAll = () => {
    console.log(getValues("price"))
    fieldsProcItem.forEach((item, i) =>
      setValue(`procItems[${i}].price`, getValues("applyPrice"))
    );
  };

  const handleClearAll = (data) => {
    handleCreateProduct(data)
  } 

  return (
    <div className=" grid grid-cols-1 gap-4">
      <div className="bg-white p-10 rounded-xl shadow-md">
        <h1 className="text-lg font-extrabold">Variant</h1>
        <div className="mt-8">
          {fields.map((item, index) => (
            <div key={index}>
              <InputVariant
                {...{
                  control,
                  handleSubmit,
                  getValues,
                  fields,
                  append,
                  prepend,
                  remove,
                  swap,
                  move,
                  insert,
                  index,
                  item,
                  errors,
                  register,
                }}
              />
            </div>
          ))}
          <div className=" mt-4">
            <button
              onClick={() => append({ k: "", v: [] })}
              className="text-2xl"
            >
              <RiAddCircleFill />
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center mt-10">
          <button
            onClick={handleSubmit((data) => autoCreateAtt(data))}
            className="px-4 py-2 text-md text-white rounded-md bg-primary"
          >
            Auto Create Attribute
          </button>
          <button className="px-4 py-2 text-md text-white rounded-md bg-primary">
            Manual Create Attribute
          </button>
        </div>
      </div>

      {fieldsProcItem.length > 0 && (
        <div className="bg-white p-10 rounded-xl shadow-md relative ">
          <h1 className="text-lg font-extrabold">Product Items</h1>


          <div className="mt-10 flex gap-4 items-center">
            <span>Price</span>
            <div className=" flex items-center gap-4">
              <input
                {...register("applyPrice", {
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
                className="outline-none  border  !py-3 px-3 rounded-md text-sm"
              />
              <button
                onClick={() => handleApplyAll()}
                className="bg-primary px-4 py-3 rounded-lg text-white"
              >
                Apply All
              </button>
            </div>
          </div>
          <table className="w-full mt-10 shadow-md">
            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
              <tr>
                {Object.keys(fieldsProcItem[0]).map((name, i) =>
                  name === "id" ? null : (
                    <th
                      key={i}
                      className="text-left capitalize font-medium p-2 text-sm"
                    >
                      <div className="font-semibold text-left">{name}</div>
                    </th>
                  )
                )}
                <th className="text-left capitalize font-medium p-2 text-sm">
                  <div className="font-semibold text-left">Action</div>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-100">
              {fieldsProcItem.map((item, i) => (
                <tr className="" key={i}>
                  <td className="p-2">
                    <div className="font-medium text-gray-800">
                      {item.option}
                    </div>
                  </td>
                  <td className="p-2 w-40">
                    <div className="">
                      <input
                        type="number"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        {...register(`procItems[${i}].price`, {
                          required: {
                            value: true,
                            message: "Product price is required",
                          },
                          maxLength: {
                            value: 20,
                            message:
                              "Product price less than 20 characters long",
                          },
                          min: {
                            value: 0,
                            message:
                              "Product price must greater than or equal zero",
                          },
                          pattern: {
                            value: /^[0-9]*$/,
                            message: "Product price is should be mumber",
                          },
                        })}
                      />
                    </div>
                  </td>
                  <td className="p-2 flex items-center gap-2">

                  {/* alert */}
                  {(errors?.procItems?.[i]?.price || errors?.procItems?.[i]?.image)  &&
                    <div
                      className="absolute top-0 bg-red-100 rounded-lg py-5 px-6 text-sm text-red-700 mb-3 right-[0]"
                      role="alert"
                    >
                      Warning alert - {errors?.procItems?.[i]?.price?.message || errors?.procItems?.[i]?.image?.message} {`at row ${i + 1}`}
                    </div>
                  }

                    {watch("procItems")?.[i]?.image && (
                      <img
                        src={
                          watch("procItems")?.[i]?.image?.[0]
                            ? URL.createObjectURL(
                                watch("procItems")?.[i]?.image?.[0]
                              )
                            : ""
                        }
                        alt=""
                        className={`w-16 h-16 `}
                      />
                    )}
                    <div className="font-medium text-gray-800">
                      <label
                        htmlFor={`upload${i}`}
                        className=" flex flex-col items-center gap-2 cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="mr-auto h-10 w-10 fill-white stroke-indigo-500"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </label>
                      <input
                        id={`upload${i}`}
                        type="file"
                        className="hidden"
                        {...register(`procItems[${i}].image`, {
                          required: {
                            value: true,
                            message: "field Image is required",
                          },
                          onChange: (e) => setChangeImage(!changeImage),
                        })}
                      />
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="">{item.unique}</div>
                  </td>
                  <td className="text-center p-2">
                    <div
                      onClick={() => removeProcItem(i)}
                      className="cursor-pointer text-center text-xl w-full"
                    >
                      <RiDeleteBin6Line />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex gap-10">
        <button
          onClick={handleSubmit((data, e) => handleClearAll(data))}
          className="px-2 py-1 bg-primary text-white rounded-lg"
        >
          Create
        </button>
        <button
          onClick={() => setShowPerview(!showPreview)}
          className=" px-2 py-1 bg-primary text-white rounded-lg"
        >
          {showPreview ? "Off Perview" : "Perview"}
        </button>
      </div>
    </div>
  );
};

export default ProductVariant;
