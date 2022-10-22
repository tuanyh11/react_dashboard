import React, { createContext, useContext, useEffect, useState } from "react";

import {useForm} from 'react-hook-form'
import { createProcuct, uploadImageProduct, uploadImageProductItem, uploadMultipleImage, uploadSigleImage } from "../../config/api";

const ProductCtx = createContext();

const ProductCxt = ({ children }) => {
  const [productItems, setProductItems] = useState([]);
  const [variants, setVariants] = useState([]);
  const [showPreview, setShowPerview] = useState(false);
  const [showProduct, setshowProduct] = useState(false);

  const [product, setProduct] = useState()

  const [productInfo, setProductInfo] = useState({
    image: "",
    description: "",
    price: "",
    name: "",
    quantity: "",
    unit: "",
    applyPrice: "",
    procItems: null,
    variants: null, 
    categories: null
  });


  const formProduct = useForm({
    defaultValues: productInfo,
  });

  useEffect(() => {
    setshowProduct({
      ...productInfo,
    });
  }, [showPreview]);

  const handleCreateProduct = async (data, e) => {
    try {
      const {procItems, variants, ...product} = data

      const formDataProductItem = new FormData()

      const formDataProduct = new FormData()

      for (const iterator of procItems) {
        formDataProductItem.append('multiple_image', iterator?.image[0])
      }

      formDataProduct.append('single_image', product.image[0])
      let resImgProcItem
      if(procItems.length > 0) 
        resImgProcItem = await uploadMultipleImage(formDataProductItem)

      const resImgProcduct = await uploadSigleImage(formDataProduct)

      
      const resProcItem = procItems.map((item, i) => ({...item, image: resImgProcItem.data.data[i]}))
      
      
      product.image = resImgProcduct.data.data
      
      const resProduct = await createProcuct({productItems: resProcItem, variants, product })

      setProduct(resProduct.data.data)

      
      formProduct.reset()

      window.confirm("successfully crreated product")
      
    } catch (error) {
      window.confirm(error.response.message)
    }
  }

  useEffect(() => {
    product && formProduct.reset()
  }, [product])

  return (
    <ProductCtx.Provider
      value={{
        productItems,
        setProductItems,
        variants,
        setVariants,
        productInfo,
        setProductInfo,
        showPreview,
        setShowPerview,
        formProduct, 
        showProduct,
        handleCreateProduct
      }}
    >
      {children}
    </ProductCtx.Provider>
  );
};

export const useProductCxt = () => useContext(ProductCtx);

export default ProductCxt;
