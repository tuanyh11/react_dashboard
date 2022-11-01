import React, { useEffect, useState } from 'react'
import { BasicInfo, Header, SaleInfo, UpdateSaleInfo } from '../../components'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { createProcuct, getCategories, getProduct, updateProduct, uploadMultipleImage, uploadSigleImage } from '../../config/api'
import { useNavigate, useParams } from 'react-router-dom'

const defaultValues =  {
  variants: [],
  productItems: [],
  quantity: null,
  price: null,
  name: "",
  unit: "",
  description: "",
  image: "",
  categories: []
}


const UpadteProduct = () => {

  const id = useParams()?.id;

  const nav = useNavigate()

  const method = useForm({defaultValues, mode: "onBlur"});

  const [categories, setCategories] = useState([]);

  const [product, setProduct] = useState({});

  const [toggleCate, setToggleCate] = useState(false);

  const {handleSubmit} = method

  const handleSubmitForm = async (dataForm) => {
     let {productItems, image, price} = dataForm
     let formDataListImg = new FormData()

     let formDataProdImg = new FormData()

     image?.preview  && formDataProdImg.append("single_image", image)
     let itHasImage = false
     let listPrice
     let totalQuantity
     let priceMax
     let priceMin
     
     const productItemsExisting = productItems.length > 0
    if(productItemsExisting) {
      listPrice = productItems.map(element => {
        if(element?.image.preview ) {
          formDataListImg.append("multiple_image", element?.image)
          console.log(element)
          itHasImage = true
        }
        return element.price
     });

     totalQuantity = productItems.reduce(function(accumulator, currentValue) {
      return accumulator + Number(currentValue.quantity);
    }, 0)
     
     priceMax = Math.max(...listPrice)
     priceMin = Math.min(...listPrice)
    }

    try {

      let resImg
      if(image?.preview) {
        resImg =  await uploadSigleImage(formDataProdImg)
      }

      if(itHasImage) {
        
        const {data} = await uploadMultipleImage(formDataListImg)
        productItems = productItems.map(element => {
          const matchImg = data?.data?.find(image => image?.originalname === element.image?.name)
          if(matchImg) return {...element, image: matchImg.filename}
          return element
        })
        await updateProduct(id,  {...dataForm, productItems, image: resImg?.data.data,  priceMax, priceMin, price: priceMin, quantity: totalQuantity})
        nav("/product")
        return
      }

      if(productItemsExisting) {
        await updateProduct(id, {...dataForm, productItems, image: resImg?.data.data,  priceMax, priceMin, price: priceMin, quantity: totalQuantity})
        nav("/product")
        return 
      }

      await updateProduct(id, {...dataForm, image: resImg?.data.data,  priceMax: price, priceMin: price})

      nav("/product")
      
    } catch (error) {
      console.log(error)
    }
  }

  const {setValue, getValues} = method

  var handleGetData = async () => {
    try {
      const resCate = await getCategories();
      const resProc = await getProduct(id);
      setCategories(resCate.data.data);
      setProduct({...resProc.data.data})
    } catch (error) {
      alert("errors " + error?.response?.data?.message);
    }
  };

  useEffect(() => {
    handleGetData();
    return () => {
      if(getValues("image")?.preview) URL.revokeObjectURL(getValues("image")?.preview)
      getValues("productItems")?.forEach((element) => {
        if (element?.image?.preview) {
          URL.revokeObjectURL(element?.image?.preview) 
        }
        return element.price;
      })
    }
  }, []);

  useEffect(() => {
    if(Object.keys(product).length > 0) {
      Object.entries(product).forEach(([k, v]) => {
        setValue(k, v)
      })
    }
  }, [product])


  

  return (
    < >
      <div className="m-2 md:m-10 mt-24 p-2 ">
        <div className="bg-white rounded-3xl md:p-10"><Header category="Page" title="Create Product" /></div>
        <FormProvider {...method}>
          <div className="grid lg:grid-cols-1 mt-10 gap-4">
            <div className="">
              <BasicInfo categories={categories}/>
            </div>
            <div className="">
              <UpdateSaleInfo data={product} {...method}/>
            </div>
          </div>
          
        </FormProvider>
        <button
          type='button'
          onClick={handleSubmit(handleSubmitForm)}
          className="  py-2 px-3 text-base  font-bold bg-primary text-white rounded-lg mt-4"
          >
          Update
        </button>
      </div>
    </>
  )
}

export default UpadteProduct