import React, { useEffect, useMemo } from "react";
import { useFieldArray, useForm, useWatch, useController, useFormContext } from "react-hook-form";
import { RiAddFill, RiCloseFill } from "react-icons/ri";
import TableProdVariant from "./TableProdVariant";
import InputVariant from "./InputVariant";


const UpdateSaleInfo = ({data}) => {
    const {
        formState: { errors },
        register,
        control,
        setValue,
        getValues,
        unregister,
        watch
      } = useFormContext()

    

      const {
        formState: { errors: errorsApply },
        register: registerApply,
        handleSubmit: handleSubmitApply,
      } = useForm({
        defaultValues: {
          price: 1000,
          quantity: 1,
        },
        mode: "onBlur",
      });
    
      const { fields, append, remove } = useFieldArray({
        control,
        name: "variants",
      });

      const variants = useWatch({
        control,
        name: "variants",
      });



      const handleSetProductItems = () => {
        if(variants?.length > 0) {
          const attributes = variants.reduce(
            (acc, { v: val }) => {
              return acc
                ?.map((el) => {
                  return val?.map((element) => {
                    return el.concat([element]);
                  });
                })
                .reduce((acc, val) => acc.concat(val), []);
            },
            [[]]
          );

      
          const flatAttributes = attributes?.map((val) => {
            return val.map((item) => item.text);
          });

          const newProductItems = flatAttributes.reduce(
            (acc, val, index) =>{
              const oldItem = getValues("productItems")?.[index]
              if(oldItem) {
                return  acc.concat({
                  ...oldItem,
                  option: val.join("-"),
                  unique: val.sort().join("").replaceAll(" ", ""),
                })
              }
              return acc.concat({
                option: val.join("-"),
                price: "",
                image: "",
                quantity: "",
                unique: val.sort().join("").replaceAll(" ", ""),
              })
            },
            []
          );
          setValue("productItems", newProductItems)
        }
      }
      

      const handleApplyAll = (data) => {
        getValues("productItems")?.forEach((_, i) => {
          setValue(`productItems[${i}].price`, data.price)
          setValue(`productItems[${i}].quantity`, data.quantity)
        })
      };
      
  

      useEffect(() => {
        handleSetProductItems()
      }, [variants])


  return (
    <div>
      <div className="bg-white p-10 rounded-xl px-80 py-20 shadow-md">
        <h1 className="text-lg font-extrabold">Sale Infomation</h1>
        <div className="mt-8 ">
          <div className="">
            <button
              onClick={() => {
                append({ k: "", v: [{ text: "" }] });
              }}
              className="flex items-center py-2 px-3 text-base font-bold bg-primary text-white rounded-lg"
            >
              <RiAddFill />
              Add Variant
            </button>
          </div>
          {fields.length === 0 ? (
            <div className="mt-10">
              <div className="flex flex-col !mb-5">
                <span className="text-sm font-medium mb-1">Price</span>
                <span className="text-sm  text-red-500 mb-2">
                  {errors?.price?.message}
                </span>
                <input
                  className={`outline-none  border !py-3 px-3 rounded-md text-sm ${
                    errors?.price?.message ? "border-red-500" : ""
                  }`}
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
                      value: 1000,
                      message:
                        "Product price at least equal or greater than 1.000",
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
                  {errors?.quantity?.message}
                </span>
                <input
                  className={`outline-none  border !py-3 px-3 rounded-md text-sm ${
                    errors?.quantity?.message ? "border-red-500" : ""
                  }`}
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
                      message:
                        "Product quantity must greater than or equal zero",
                    },
                    pattern: {
                      value: /^[0-9]*$/,
                      message: "Product quantity is should be mumber",
                    },
                  })}
                />
              </div>
            </div>
          ) : (
            <div className="mt-10">
              {fields.map((field, index) => (
                <div className="bg-gray-100 p-4 relative mb-4" key={field.id}>
                  <div className="flex flex-col gap-2 mb-6">
                    <span className="text-lg">
                      Group classification {index + 1}
                    </span>
                    <span className="text-sm  text-red-500 ">
                      {errors?.variants?.[index]?.k?.message}
                    </span>
                    <input
                      {...register(`variants[${index}].k`, {
                        required: {
                          value: true,
                          message: "This field is required",
                        },
                      })}
                      className={`outline-none  border !py-3 px-3 w-1/2 rounded-md text-sm ${
                        errors?.variants?.[index]?.k?.message
                          ? "border-red-500"
                          : ""
                      }`}
                      placeholder="color, size..."
                    />
                  </div>
                  <div className="">
                    <InputVariant
                      register={register}
                      control={control}
                      index={index}
                      errors={errors}
                      handleSetProductItems={handleSetProductItems}
                    />
                  </div>
                  <button
                    onClick={() => remove(index)}
                    className="absolute top-0 right-0 p-4 text-2xl"
                  >
                    <RiCloseFill />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        {fields.length > 0 && (
          <div className="mt-10">
            <div className="flex items-center gap-4 my-8">
              <div className="flex flex-col gap-2 relative">
                <span className="text-sm  text-red-500 absolute -top-1/2">
                  {errorsApply?.price?.message}
                </span>
                <input
                  className={`outline-none  border !py-3 px-3  rounded-md text-sm appearance-none ${
                    errorsApply?.price?.message ? "border-red-500" : ""
                  }`}
                  placeholder="Price"
                  {...registerApply(`price`, {
                    pattern: {
                      value: /^[0-9]*$/,
                      message: "This field should be mumber",
                    },
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                    min: {
                      value: 1000,
                      message: "This field must be greater than or equal 1.000",
                    },
                  })}
                />
              </div>
              <div className="flex flex-col gap-2 relative">
                <span className="text-sm  text-red-500 absolute -top-1/2">
                  {errorsApply?.quantity?.message}
                </span>
                <input
                  className={`outline-none  border !py-3 px-3  rounded-md text-sm appearance-none ${
                    errorsApply?.quantity?.message ? "border-red-500" : ""
                  }`}
                  placeholder="Quantity"
                  {...registerApply("quantity", {
                    min: {
                      value: 1,
                      message: "this field should be greater than 0",
                    },
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                    pattern: {
                      value: /^[0-9]*$/,
                      message: "Product price is should be mumber",
                    },
                  })}
                />
              </div>
              <button
                // disabled={true}
                onClick={handleSubmitApply(handleApplyAll)}
                className="  py-2 px-3 text-base  font-bold bg-primary text-white rounded-lg"
              >
                Apply All
              </button>
            </div>
            
            
            <TableProdVariant
              {...{
                setValue,
                getValues,
                register,
                errors,
                control,
                unregister,
                watch,
                data: getValues("productItems"),
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateSaleInfo;
