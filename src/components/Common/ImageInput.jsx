import React from "react";
import { URL_APi } from "../../config/CONST";

const ImageInput = ({register=() => {}, isUpdate = false, isFile, perViewFile, errors, name = "newImage", label}) => {
  return (
    <div>
      <input
        type="file"
        id="file"
        className="sr-only"
        {...register}
      />
      <label
        htmlFor="file"
        className="mt-10 relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
      >
        <div>
          <span className="mb-2 block text-xl font-semibold text-[#07074D]">
            {label}
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
        {errors}
      </span>
      <img
        className="max-w-80 max-h-80 object-contain mr-auto ml-auto mt-5"
        src={isFile ? URL.createObjectURL(perViewFile[0]) : URL_APi+perViewFile}
        alt=""
      />
    </div>
  );
};

export default ImageInput;
