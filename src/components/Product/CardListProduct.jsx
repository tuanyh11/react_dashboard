import React from "react";
import { useProductCxt } from "./ProductCxt";

const CardListProduct = () => {

  const { variants,  productItems ,productInfo , showPreview,  showProduct} = useProductCxt();

  const {description, image, price, name} = showProduct



  return (
    <div className="rounded-xl overflow-hidden">
      {showPreview && 
        <div className="min-w-screen min-h-screen bg-primary flex items-center p-5 lg:p-10 overflow-hidden relative">
          <div className="w-full max-w-6xl rounded bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
            <div className="grid grid-cols-1 items-center -mx-10">
              <div className="w-full  px-10 mb-10 md:mb-0">
                <div className="relative">
                  {image && 
                  <img
                    src={URL.createObjectURL(image)}
                    className="ml-auto object-cover mr-auto w-[300px] h-[300px] relative z-10"
                    alt=""
                  />}
                </div>
              </div>
              <div className="w-full  px-10">
                <div className="mb-10">
                  <h1 className="font-bold uppercase text-2xl mb-5">
                    {name}
                  </h1>
                  <p className="text-sm" dangerouslySetInnerHTML={{__html: description}}/>
                </div>
                <div className="flex justify-center items-center">
                  {price && 
                  
                    <div className="flex items-center  align-bottom mr-5">
                      <h2 className=" leading-none align-baseline text-5xl">$</h2>
                      <span className="font-bold text-5xl leading-none align-baseline">
                        {price}
                      </span>
                    </div>
                  }
                  <div className="inline-block align-bottom">
                    <button className="bg-yellow-300 opacity-75 hover:opacity-100 text-yellow-900 hover:text-gray-900 rounded-full px-10 py-2 font-semibold">
                      <i className="mdi mdi-cart -ml-2 mr-2"></i> BUY NOW
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default CardListProduct;
