import React, { useEffect, useState } from 'react'
import ProductItem, { productItemProp } from './ProductItem';
import axios from 'axios';

interface ProductListProps{
    products: productItemProp[];
}
export default function ProductList(props:ProductListProps) {
  

  

  return (
    <div key={'product-list'} className='grid grid-cols-3 gap-4 px-4'>
        {props.products?.map((product,idx) =><ProductItem key={'product-item-s'+idx} id={product.id} url={product.url} description={product.description}/>)}
    </div>
  )
}
