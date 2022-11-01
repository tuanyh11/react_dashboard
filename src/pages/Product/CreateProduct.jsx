import React, { useEffect, useState } from "react";
import { BasicInfo, ErrorMess, Header, SaleInfo } from "../../components";
import { FormProvider, useForm } from "react-hook-form";
import {
  createProcuct,
  getCategories,
  uploadMultipleImage,
  uploadSigleImage,
} from "../../config/api";
import { RiCoinsLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const defaultValues = {
  variants: [],
  productItems: [],
  quantity: null,
  price: null,
  name: "",
  unit: "",
  description: "",
  image: "",
  categories: [],
};

const ProductAdd = () => {
  const nav = useNavigate();

  const method = useForm({ defaultValues, mode: "onBlur" });

  const [categories, setCategories] = useState([]);

  const [errorServer, setErrorServer] = useState();

  const {getValues} = method;

  var getCate = async () => {
    try {
      const resCate = await getCategories();
      setCategories(resCate.data.data);
    } catch (error) {
      setErrorServer(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    let timeId;
    if (errorServer)
      setTimeout(() => {
        setErrorServer(null);
      }, 3000);
    return () => clearTimeout(timeId);
  }, [errorServer]);

  useEffect(() => {
    getCate()
    return () => {
      if(getValues("image")?.preview) URL.revokeObjectURL(getValues("image")?.preview)
      getValues("productItems")?.forEach((element) => {
        if (element?.image?.preview) {
          URL.revokeObjectURL(element?.image?.preview) 
        }
        return element.price;
      })
    }
  }, [])


  const { handleSubmit } = method;



  const handleSubmitForm = async (dataForm) => {
    let { productItems, image, price } = dataForm;

    let formDataListImg = new FormData();

    let formDataProdImg = new FormData();

    console.log(image)

    formDataProdImg.append("single_image", image);

    let itHasImage = false;
    let listPrice;
    let totalQuantity;
    let priceMax;
    let priceMin;


    const productItemsExisting = productItems.length > 0;
    if (productItemsExisting) {
      listPrice = productItems.map((element) => {
        if (element?.image?.preview) {
          formDataListImg.append("multiple_image", element?.image);
          itHasImage = true;
          // URL.revokeObjectURL(element?.image?.preview) 
        }
        return element.price;
      });

      totalQuantity = productItems.reduce(function (accumulator, currentValue) {
        return accumulator + Number(currentValue.quantity);
      }, 0);

      priceMax = Math.max(...listPrice);
      priceMin = Math.min(...listPrice);
    }

    try {
      const { data: resImg } = await uploadSigleImage(formDataProdImg);
      if (itHasImage) {
        const { data } = await uploadMultipleImage(formDataListImg);
        productItems = productItems.map((element) => {
          const matchImg = data?.data?.find(
            (image) => image?.originalname === element.image?.name
          );
          if (matchImg) return { ...element, image: matchImg.filename };
          return { ...element, image: null };
        });
        await createProcuct({
          ...dataForm,
          productItems,
          image: resImg?.data,
          priceMax,
          priceMin,
          price: priceMin,
          quantity: totalQuantity,
        });
        nav("/product");
        return;
      }

      if (productItemsExisting) {
        await createProcuct({
          ...dataForm,
          productItems,
          image: resImg?.data,
          priceMax,
          priceMin,
          price: priceMin,
          quantity: totalQuantity,
        });
        nav("/product");
        return;
      }

      await createProcuct({
        ...dataForm,
        image: resImg.data,
        priceMax: price,
        priceMin: price,
      });

      nav("/product");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 ">
        {errorServer && (
          <div className="fixed top-0 right-0">
            <ErrorMess text={errorServer} />
          </div>
        )}
        <div className="bg-white rounded-3xl md:p-10">
          <Header category="Page" title="Create Product" />
        </div>
        <FormProvider {...method}>
          <div className="grid lg:grid-cols-1 mt-10 gap-4">
            <div className="">
              <BasicInfo categories={categories}/>
            </div>
            <div className="">
              <SaleInfo />
            </div>
          </div>
        </FormProvider>
        <button
          onClick={handleSubmit(handleSubmitForm)}
          className="  py-2 px-3 text-base  font-bold bg-primary text-white rounded-lg mt-4"
        >
          create
        </button>
      </div>
    </>
  );
};

export default ProductAdd;
