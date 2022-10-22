import React, { useEffect, useState } from "react";
import { Header, UserProfile } from "../components";
import { useForm } from "react-hook-form";
import {
  createCategory,
  delCategories,
  delImage,
  getCategories,
  updateCategory,
  uploadSigleImage,
} from "../config/api";
import { URL_APi } from "../config/CONST";

const Category = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm();

  const [image, setImage] = useState();
  const [categories, setCategories] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [category, setCategory] = useState({ name: "", categories: "" });

  const handleOnSubmit = async (data) => {
    try {
      let imageData;
      imageData = new FormData();
      if (data.image[0] && !isUpdate) {
        imageData.append("single_image", data.image[0]);
        const { data: resImagData } = await uploadSigleImage(imageData);
        await createCategory({
          image: resImagData.data,
          name: data.category, 
        });
        window.confirm("create category successfully");
        reset()
        setImage("");
        handleGetCategories()
        return
      }

      if (isUpdate && data.image[0]) {
        imageData.append("single_image", data.image[0]);
        const { data: resImagData } = await uploadSigleImage( imageData);
        await delImage(data.oldImage)
        await updateCategory(data.id, {
          image: resImagData.data,
          name: data.category,
        });
        
        setIsUpdate(false)
        
        window.confirm("update category successfully");
      } else {
        await updateCategory(data.id, {
          name: data.category,
        });
        setIsUpdate(false)
        window.confirm("update category successfully");
      }

      setImage("");
      reset();
      handleGetCategories();
    } catch (error) {
      alert("Error " + error.response.data.message);
    }
  };



  var handleGetCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data.data);
    } catch (error) {
      alert(error)
    }
  };

  useEffect(() => {
    handleGetCategories();
  }, []);


  const handleDel = async (id) => {
    if (window.confirm("do you want to delete this category?")) {
      try {
        await delCategories(id);
        alert("delete category successfully");
        handleGetCategories();
      } catch (error) {
        alert(error);
      }
    }
  };

  const handleUpdate = (item) => {
    setValue("category", item.name);
    setValue("id", item._id);
    setValue("oldImage", item.image);
    setIsUpdate(true);
  };


  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="App" title="Category" />
      <div className="grid grid-cols-2 gap-5">
        {/* form */}

        <form
          className=""
          onSubmit={handleSubmit((data, e) => handleOnSubmit(data))}
        >
          <div className="flex flex-col !mb-5">
            <span className="text-sm font-medium mb-1">Category</span>
            <span className="text-sm  text-red-500 mb-2">
              {errors?.category?.message}
            </span>
            <input
              {...register("category", {
                required: {
                  value: true,
                  message: "Category name cannot be empty",
                },
              })}
              className="outline-none  border !py-3 px-3 rounded-md text-sm"
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
                  value: !isUpdate,
                  message: "Image is required",
                },
                pattern: {
                  value: /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i,
                },
                onChange: (e) => setImage(e.target.files[0]),
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
              src={image ? URL.createObjectURL(image) : ""}
              alt=""
            />
          </div>
          <div className="flex items-center gap-10">
            <button
              type="submit"
              className={`px-2 py-1 bg-primary  text-white rounded-lg`}
            >
              {isUpdate ? " Update" : "Creating"}
            </button>

           {isUpdate && <span
              onClick={() => {
                reset();
                setIsUpdate(false)  
              }}
              className="font-medium text-primary  cursor-pointer text-base hover:underline my-4"
            >
              { "To Creating"}
            </span>
            }
          </div>
        </form>

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
                    CreatedAt
                  </th>
                  <th scope="col" className="py-3 px-6">
                    UpadatedAt
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories.map((item) => (
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
                      {item.createdAt}
                    </td>
                    <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white"></td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => handleDel(item._id)}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline my-4"
                      >
                        Remove
                      </button>
                      <button
                        onClick={() => handleUpdate(item)}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline my-4"
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
  );
};

export default Category;
