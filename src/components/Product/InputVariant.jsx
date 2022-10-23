import React from "react";
import { useFieldArray } from "react-hook-form";
import { RiAddCircleLine, RiDeleteBin6Line } from "react-icons/ri";

const InputVariant = ({
  control,
  register,
  remove,
  index,
  isChildren,
  label,
  errors,
}) => {
  const {
    fields: fieldsChil,
    remove: removeChil,
    append,
  } = useFieldArray({
    control,
    name: `variants[${index}].v`,
  });

  const { k, v } = errors?.variants?.[index] ? errors.variants[index] : { k: "", v: "" };

  return (
    <div>
      <div className={`flex flex-col   !mb-5}`}>
        {label && <span className="text-sm font-medium mb-1">{label}</span>}
        <span className="text-sm  text-red-500 mb-2">{k?.message}</span>
        <div className="relative">
          <input
            className="outline-none  border w-full  !py-3 px-3 rounded-md text-sm"
            placeholder="color, size..."
            {...register(`variants[${index}].k`, {
              required: {
                value: true,
                message: "This field is required",
              },
            })}
          />
          <div
            onClick={() => remove(index)}
            className="absolute top-1/2 right-2 cursor-pointer -translate-y-1/2"
          >
            <RiDeleteBin6Line />
          </div>
        </div>
      </div>
      {fieldsChil?.map((item, i) => (
        <div key={i} className=" flex justify-center my-6">
          <div className="w-3/4 ">
            <div className="text-sm  text-red-500 mb-2">
                {v?.[i]?.text?.message}
            </div>
            <div className="relative ">
              <input
                placeholder="red, blue, green, sm, s, lg..."
                className="outline-none  border w-full  !py-3 px-3 rounded-md text-sm"
                {...register(`variants[${index}].v[${i}].text`, {
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                })}
              />
              <div
                onClick={() => removeChil(i)}
                className="absolute top-1/2 right-2 cursor-pointer -translate-y-1/2"
              >
                <RiDeleteBin6Line />
              </div>
            </div>
          </div>
        </div>
      ))}

      {!isChildren && (
        <div
          onClick={() => append({ text: "" })}
          className="flex justify-center my-6"
        >
          <button className="text-2xl">
            <RiAddCircleLine />
          </button>
        </div>
      )}
    </div>
  );
};

export default InputVariant;
