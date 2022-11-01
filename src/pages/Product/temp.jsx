import React, { useEffect, useState } from "react";
import { Header } from "../../components";
import { useController, useForm } from "react-hook-form";
import {
  delImage,
  getCategories,
  getProduct,
  updateProduct,
  uploadMultipleImage,
  uploadSigleImage,
} from "../../config/api";
import { useLocation, useParams } from "react-router-dom";
import { URL_APi } from "../../config/CONST";
import { RiDeleteBin6Line } from "react-icons/ri";
import UpdateVariant from "./UpdateVariant";

const UpdateProduct = () => {
  const formProduct = useForm({
    defaultValues: {
      productItems: undefined,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
    setValue,
    
    control,
  } = formProduct;

  const { field: imageField } = useController({
    control,
    name: "image",
  });

  const [categories, setCategories] = useState([]);

  const [product, setProduct] = useState({});

  const [toggleCate, setToggleCate] = useState(false);

  const id = useParams()?.id;

  const nav = useLocation();

  var handleGetData = async () => {
    try {
      const resCate = await getCategories();
      const resProc = await getProduct(id);
      setCategories(resCate.data.data);
      setProduct(resProc.data.data)
    } catch (error) {
      alert("errors " + error?.response?.data?.message);
    }
  };

  const { variants, categories: category } = product;

  const handleUpdateProduct = async (data) => {
    const { productItems, procItems, variants, ...dataProduct } = data;

    let newProcItem = productItems;

    try {
      if (procItems?.length > 0) {
        const procItemFormDatImage = new FormData();
        for (const item of data.procItems) {
          procItemFormDatImage.append("multiple_image", item?.image[0]);
        }

        const resProductItems = await uploadMultipleImage(procItemFormDatImage);

        for (const item of productItems) {
          await delImage(item.image);
          // console.log(productItems)
        }

        newProcItem = productItems.map((item, i) => ({
          ...item,
          image: resProductItems.data.data[i],
        }));
      }

      if (
        dataProduct.image instanceof FileList &&
        Array.from(dataProduct?.image).length > 0
      ) {
        const productFormDatImage = new FormData();
        productFormDatImage.append("single_image", dataProduct.image[0]);
        await delImage(product.image);
        const resProductImage = await uploadSigleImage(productFormDatImage);

        dataProduct.image = resProductImage.data.data;
      }

      const res = await updateProduct(product._id, {
        product: dataProduct,
        variants,
        newProcItem,
      });

      alert(res.data.message);
      nav("/product");
    } catch (error) {
      alert("Error " + error?.response?.data?.message);
    }
  };

  useEffect(() => {
    handleGetData();
  }, []);

  useEffect(() => {
    if (Object.keys(product).length > 0)
      Object.entries(product).forEach(([key, value]) => setValue(key, value));
  }, [product]);

  return (
    <div className="m-2 md:m-10 mt-24 p-2">
      <div className="bg-white rounded-3xl md:p-10">
        <Header category="Page" title="Update Product" />
      </div>
      {/* <FormProvider {...method}>
        <div className="grid lg:grid-cols-1 mt-10 gap-4">
          <div className="">
            <BasicInfo />
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
      </button> */}
    </div>
  );
};

export default UpdateProduct;
