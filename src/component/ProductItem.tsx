import React from 'react'

export interface productItemProp{
    url:string;
    description:string;
}

export default function ProductItem(props:productItemProp) {
  return (
    <div className="text-center p-4 border rounded-xl justify-content items-center">
        <div className="avatar">
  <div className="w-96 rounded-xl">
    <img src={props.url} />
  </div>
</div>
        <p>{props.description}</p>
    </div>
  )
}
