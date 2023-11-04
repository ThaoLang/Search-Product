"use client"

import Image from 'next/image'
import styles from './page.module.css'
import SearchBar from '@/component/SearchBar'
import ProductList from '@/component/ProductList'
import { useEffect, useState } from 'react';
import axios from 'axios'
import { productItemProp } from '@/component/ProductItem'

export default function Home() {
  const API_KEY='hmbMi7acz1ugLaMEVFPJgsbKphCGcRR8E0u8hprINL8'
  const BASE_URL='https://api.unsplash.com/search/photos/?query='
  const [itemList, setItemList] = useState<productItemProp[]>([]);
  const [searchText,setSearchText] =useState("blue");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadingNotification ="Loading...";
  const [page, setPage] = useState(1);

  async function loadImage(text:string) {
    setItemList([]);
    setSearchText(text);
    try {
      setIsLoading(true); 
      const res = await axios.get(`${BASE_URL}${text}&client_id=${API_KEY}&per_page=10`);
      const productResult = await res.data.results;
      setItemList(productResult?.map((item: any) => ({ url: item.urls.small, description: item.description })))
    } catch (error) {
      console.error("Error loading data:", error);
    }
    finally {
    setIsLoading(false); 
  }
  } 

  
  
  
  
  useEffect(() =>{
    loadImage(searchText);
    // setSearchText("");
  },[])

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 5 &&
        !isLoading
      ) {
        if(!isLoadingMore){
          setIsLoadingMore(true);
        }
      }
    });
  }, []);


  useEffect(() =>{
    if(!isLoadingMore){
      return;
    }
    async function loadMoreImages() {
      try {        
        const res = await axios.get(`${BASE_URL}${searchText}&client_id=${API_KEY}&per_page=10&page=${page + 1}`);
        const newImages = res.data.results;
        setItemList((prevItems) => [...prevItems, ...newImages.map((item: any) => ({ url: item.urls.small, description: item.description }))]);
        setPage((prevPage) => prevPage + 1);
      } catch (error) {
        console.error("Error loading more data:", error);
      } finally {
        setIsLoadingMore(false);
      }
    }
    loadMoreImages()
  },[isLoadingMore]);
  
 
  return (
    <div className="relative">
    <div className="sticky top-0 bg-white z-10">
      <SearchBar key={'product-search'} text={searchText} onChangeText={setSearchText} onClick={loadImage} />
    </div>
    <div className="mt-2 ">
      <div className="relative flex-col">
      
         <ProductList products={itemList} />
         {(isLoading || isLoadingMore) && 
            <label className='text-xl text-center justify-content'>{loadingNotification}</label>
      }
      </div>
    </div>
  </div>
  )
}
