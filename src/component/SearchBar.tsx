import React, { useState } from 'react'

interface SearchBarProps{
  text:string;
  onChangeText: (text:string) => void;
  onClick:(text:string)=>void;
}
export default function SearchBar(props:SearchBarProps) {
  const [searchText,setSearchText] =useState("");

  const handleClick = () =>{
    console.log(searchText);
    props.onClick(searchText)
    // setSearchText("")
  }
  return (
    <div className=''>
      <div className='flex items-center justify-items-center space-x-4 p-4 place-content-center'>
        <input type="text" value={searchText} onChange={(e)=>setSearchText(e.target.value)} placeholder="Type here to search..." className="input input-bordered w-full max-w-xs" />
        <button className="btn btn-info" onClick={()=>handleClick()}>Search</button>
      </div>
    </div>
  )
}
