import React, { useEffect, useState, useDeferredValue } from "react";
import { Header } from "../../components";
import { useController, useForm } from "react-hook-form";
import { URL_APi } from "../../config/CONST";
import {
  createCombo,
  delCombo,
  delImage,
  getCombos,
  getProducts,
  updateCombo,
  uploadSigleImage,
} from "../../config/api";
import Table from "./Table";

const Combo = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    getValues,
    control,
  } = useForm({
    defaultValues: {
      name: "",
      image: "",
      newImage: "",
      products: [],
      price: 0,
      saleInfo: {
        isSale: false,
        salePercent: 0,
      },
      saleAmount: 0,
    },
  });

  const { field: fieldProc } = useController({
    control: control,
    name: "products",
  });

  const { field: fieldAmount } = useController({
    control: control,
    name: "saleAmount",
  });

  const { field } = useController({
    control: control,
    name: "newImage",
  });

  const [combos, setComos] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [openTable, setOpenTable] = useState(false);
  const [products, setProducts] = useState([]);

  const handleOnSubmit = async (data) => {
    try {
      let imageData;
      imageData = new FormData();
      if (isFile && !isUpdate) {
        imageData.append("single_image", data.newImage[0]);
        const { data: resImagData } = await uploadSigleImage(imageData);
        await createCombo({
          image: resImagData.data,
          name: data.name,
          products: data.products,
          price: data.price,
          saleInfo: data.saleInfo
        });
        window.confirm("create combo successfully");
        reset();
        handleGetCombos()
        return;
      }

      if (isUpdate && isFile) {
        imageData.append("single_image", data.newImage[0]);
        const { data: resImagData } = await uploadSigleImage(imageData);
        await delImage(data.image);
        await updateCombo(data._id,{
          image: resImagData.data,
          name: data.name,
          products: data.products,
          price: data.price,
          saleInfo: data.saleInfo
        });
        setIsUpdate(false);
        window.confirm("update combo successfully");
      } else {
        await updateCombo(data._id,{
          name: data.name,
          products: data.products,
          price: data.price,
          saleInfo: data.saleInfo
        });
        setIsUpdate(false);
        window.confirm("update combo successfully");
      }

      reset();
      handleGetCombos();
    } catch (error) {
      alert("Error " + error.response.data.message);
    }

    console.log(data);
  };

  var handleGetCombos = async () => {
    try {
      const res = await getCombos();
      setComos(res.data.data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    handleGetCombos();
  }, []);

  const handleGetProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data.data);
    } catch (error) {
      alert("Error " + error.response.data.message);
    }
  };

  useEffect(() => {
    handleGetProducts();
  }, []);

  const handleDel = async (id) => {
    if (window.confirm("do you want to delete this category?")) {
      try {
        await delCombo(id);
        alert("delete category successfully");
        handleGetCombos();
      } catch (error) {
        alert(error);
      }
    }
  };

  const handleUpdate = (item) => {
    Object.entries(item).forEach(([key, value]) => setValue(key, value))
    setIsUpdate(true)
  };

  const amount = useDeferredValue(fieldAmount.value) 

  var isFile = field.value instanceof FileList && field.value.length > 0 
  

  return (
    <div>
      {openTable && (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-full z-[99999999999]">
          <div className="absolute top-0 left-0 bottom-0 bg-black opacity-80 right-0 z-[99999999999]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Table {...{ products, setOpenTable, register }} />
            </div>
          </div>
        </div>
      )}
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 rounded-3xl">
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
          <Header category="Page" title="Combo" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="">
              <form
                action=""
                onSubmit={handleSubmit((data) => handleOnSubmit(data))}
              >
                <div className="flex flex-col !mb-5">
                  <span className="text-sm font-medium mb-1">Name</span>
                  <span className="text-sm  text-red-500 mb-2">
                    {errors?.name?.message}
                  </span>
                  <input
                    className="outline-none  border !py-3 px-3 rounded-md text-sm"
                    {...register("name", {
                      required: {
                        value: true,
                        message: "This field is required",
                      },
                    })}
                  />
                </div>

                <div className="flex flex-col !mb-5">
                  <span className="text-sm font-medium mb-1">Price</span>
                  <span className="text-sm  text-red-500 mb-2">
                    {errors?.price?.message}
                  </span>

                  <input
                    type={"number"}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer"
                    {...register("price", {
                      required: {
                        value: true,
                        message: "This field is required",
                      },
                      valueAsNumber: {
                        value: true,
                        message: "This field should be number",
                      },
                      min: {
                        value: 1000,
                        message: "This field should be at least 1000",
                      },
                      pattern: {
                        value: /^[0-9]*$/,
                        message: "This field should be a valid Numeric",
                      },
                    })}
                  />
                </div>

                <div className="relative z-0 mb-6 w-full group">
                  <label className="peer-focus:font-medium text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Description
                  </label>
                  <textarea
                    rows="4"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer"
                  ></textarea>
                </div>

                <div className="flex flex-col !mb-5  jus">
                  <span className="text-sm font-medium mb-1">On Sale</span>
                  <span className="text-sm  text-red-500 mb-2">
                    {errors?.saleInfo?.isSale?.message}
                  </span>

                  <div className="flex items-center pl-3">
                    <label
                      htmlFor="horizontal-list-radio-license"
                      className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      true
                    </label>

                    <input
                      {...register("saleInfo.isSale")}
                      type="radio"
                      value={true}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                  </div>
                  <div className="flex items-center pl-3">
                    <label
                      htmlFor="horizontal-list-radio-id"
                      className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      false
                    </label>
                    <input
                      type="radio"
                      value={false}
                      {...register("saleInfo.isSale")}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                  </div>
                </div>

                <div className="flex flex-col !mb-5">
                  <span className="text-sm font-medium mb-1">Sale Percent</span>
                  <span className="text-sm  text-red-500 mb-2">
                    {errors?.saleInfo?.salePercent?.message}
                  </span>

                  <input
                    placeholder="%"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer"
                    {...register("saleInfo.salePercent", {
                      onChange: (e) => {
                        if (/^[0-9]*$/.test(e.target.value)) {
                          const saleAmount =
                            (Number(e.target.value) / 100) *
                            Number(getValues("price"));
                          setValue(
                            "saleAmount",
                            Math.round(Number(getValues("price")) - saleAmount)
                          );
                        }
                      },
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
                <div className="flex text-sm flex-col !mb-5">
                  <span className="text-sm  text-red-500 mb-2">
                    { errors?.saleAmount?.message}
                  </span>
                  <div className="">
                    Final Price:
                  
                    <span
                      {...register('saleAmount', {
                        required: {
                          value: amount < 1000,
                          message: "Amount must be a positive number and must larger than 1000"
                        }
                      })}
                      className="ml-2 text-yellow-400 text-2xl"
                    >
                      {amount}
                    </span>
                  </div>
                </div>

                <div className="">
                  <input
                    type="file"
                    id="file"
                    className="sr-only"
                    {...register("newImage", {
                      required: {
                        value: !isUpdate,
                        message: "Image is required",
                      },
                      pattern: {
                        value: /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i,
                      },
                      // onChange: (e) => setImage(e.target.files[0]),
                    })}
                  />
                  <label
                    htmlFor="file"
                    className="mt-10 relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
                  >
                    <div>
                      <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                        Image Combo
                      </span>
                      <span className="mb-2 block text-base font-medium text-[#6B7280]">
                        Or
                      </span>
                      <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                        Browse
                      </span>
                    </div>
                  </label>
                  <span className="text-sm  text-red-500 mb-2">
                    {errors?.image?.message}
                  </span>
                  <img
                    className="max-w-80 max-h-80 object-contain mr-auto ml-auto mt-5"
                    src={
                      isFile
                        ? URL.createObjectURL(field.value[0])
                        : ""
                    }
                    alt=""
                  />
                </div>

                <div className="mt-10">
                  <span className="text-sm font-medium">
                    Finnal step chosse your Product for combo
                  </span>
                  <div className="flex items-center justify-between mt-5">
                    {Object.keys(errors).length === 0 &&
                      fieldProc.value.length > 0 && (
                        <button
                          type="submit"
                          className="block mt-2 px-3 py-2 bg-primary  rounded-md text-white"
                        >
                          {isUpdate ? "Updating" : "Creating"}
                        </button>
                      )}

                    {isUpdate ? (
                      <span
                        onClick={() => {
                          setIsUpdate(false);
                        }}
                        className="font-medium text-primary  cursor-pointer text-base hover:underline my-4"
                      >
                        {"To Creating"}
                      </span>
                    ):
                    <button
                      onClick={() => setOpenTable(true)}
                      className="block mt-2 px-3 py-2 bg-primary  rounded-md text-white"
                    >
                      Chossing Product
                    </button>
                    }
                  </div>
                </div>
              </form>
            </div>

            <div className="">
              <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="py-3 px-6">
                        <span className="sr-only">Image</span>
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Name
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Price
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Sale
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {combos.map((item) => (
                      <tr
                        key={item._id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <td className="p-4 w-32">
                          <img src={URL_APi + item?.image} alt="Apple Watch" />
                        </td>
                        <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                          {item.name}
                        </td>
                        <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                          {item.price}
                        </td>
                        <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">{item?.saleInfo?.salePercent}%</td>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Combo;
