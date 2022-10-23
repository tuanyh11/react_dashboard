import React from 'react'
import { Header, ProductInfo, ProductVariant, ProductCxt, CardListProduct } from '../../components'
import { useProductCxt } from '../../components/Product/ProductCxt'



const ProductAdd = () => {

  return (
    <ProductCxt >
      <div className="m-2 md:m-10 mt-24 p-2 ">
        <div className="bg-white rounded-3xl md:p-10"><Header category="Page" title="Create Product" /></div>
        <div className="grid lg:grid-cols-0 mt-10 gap-4">

          <div className="grid lg:grid-cols-1 gap-6">
            <ProductInfo/>
            <ProductVariant/>

          </div>
          <div className="">
            <CardListProduct/>
          </div>


        </div>
      </div>
    </ProductCxt>
  )
}

export default ProductAdd