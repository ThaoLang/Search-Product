import React from 'react'

interface SearchBarProps{
  text:string;
  onChangeText: (text:string) => void;
  onClick:()=>void;
}
export default function SearchBar(props:SearchBarProps) {

  return (
    <div className=''>
      <div className='flex items-center justify-items-center space-x-4 p-4 place-content-center'>
        <input type="text" value={props.text} onChange={(e)=>props.onChangeText(e.target.value)} placeholder="Type here to search..." className="input input-bordered w-full max-w-xs" />
        <button className="btn btn-info" onClick={()=>props.onClick()}>Search</button>
      </div>
    </div>
  )
}
