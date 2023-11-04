"use client"

import Image from 'next/image'
import styles from './page.module.css'
import SearchBar from '@/component/SearchBar'
import ProductList from '@/component/ProductList'
import { useEffect, useState } from 'react';
import axios from 'axios'
import { productItemProp } from '@/component/ProductItem'
import 'dotenv/config'

export default function Home() {
  const API_KEY='J72Bm0svXRwDbJ3f6B0p2ZxLQ_qsxKVAOqR6RwBM7VQ'
  const BASE_URL='https://api.unsplash.com/search/photos/?query='
  const [itemList, setItemList] = useState<productItemProp[]>([]);
  const [searchText,setSearchText] =useState("");
 
  async function loadImage() {
    try {
      const res = await axios.get(`${BASE_URL}${searchText}&client_id=${API_KEY}&per_page=100`);
      //const res = await axios.get(`${process.env.BASE_URL}${searchText}&client_id=${process.env.API_KEY}&per_page=1000`);
      console.log(res);
      const productResult = await res.data.results;
      setItemList(productResult?.map((item: productItemProp) => ({ url: item.urls.small, description: item.description })))
    } catch (error) {
      console.error("Error loading data:", error);
    }
  } 
  

  
  useEffect(() =>{
    loadImage();
  },[])
 
  return (
    <div className="relative">
    <div className="sticky top-0 bg-white z-10">
      <SearchBar text={searchText} onChangeText={setSearchText} onClick={loadImage} />
    </div>
    <div className="mt-2 ">
      <div className="relative">
        <ProductList products={itemList} />
      </div>
    </div>
  </div>
  )
}
