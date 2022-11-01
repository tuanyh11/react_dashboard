import React from "react";
import { RiDeleteBinLine, RiAddFill } from "react-icons/ri";
import { useFieldArray } from "react-hook-form";

const InputVariant = ({ register, control, index, errors, handleSetProductItems }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `variants[${index}].v`,
  });
  return (
    <div className=" ">
      <span>Product classification </span>
      <div className="grid grid-cols-6 place-items-center">
        {fields.map((field, i) => {
          const errorMess = errors?.variants?.[index]?.v?.[i]?.text?.message;
          return (
            <div className="flex flex-col  gap-2 mb-6 mt-6 relative " key={field.id}>
              <span className="text-sm  text-red-500 absolute -top-1/2">{errorMess}</span>
              <div className="flex items-center">
                <input
                  {...register(`variants[${index}].v[${i}].text`, {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                    onChange: () => handleSetProductItems()
                  })}
                  className={`outline-none  border !py-3 px-3 w-1/2 rounded-md text-sm ${
                    errorMess ? "border-red-500" : ""
                  }`}
                  placeholder="red, sm..."
                />
                <button
                  onClick={() => append({ text: "" })}
                  className="text-2xl p-1 rounded-full text-gray-400 hover:text-gray-600 hover:scale-110 transition"
                >
                  <RiAddFill />
                </button>
                <button
                  onClick={() => fields.length > 1 && remove(field.id)}
                  className={`text-2xl p-1 rounded-full  text-gray-400 hover:text-gray-600 hover:scale-110 transition ${
                    fields.length === 1 ? "!cursor-not-allowed" : ""
                  }`}
                >
                  <RiDeleteBinLine />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InputVariant;
