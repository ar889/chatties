import React from 'react'
import { useSelector } from 'react-redux';
import {format} from 'timeago.js'

const Message = ({data,pic,own}) => {
  const user = useSelector((state) => state.user.data);
  console.log(data)

  return (
    <div className={`flex ${own && 'justify-end'}`}>
<div className={`flex items-center w-[72%] m-3 p-2 rounded-lg ${own?'bg-blue-200':' bg-slate-200'}`}>
    <img className='w-8 h-8 mr-3 rounded-full object-cover' src={`${process.env.REACT_APP_API}/${own?user.token.profilePic:pic}`} alt="" />
    <div className='flex flex-col'>
        <p className={`text-xs xs:text-sm  `}>{data.message}</p>
        <div className='text-[10px] xs:text-xs text-slate-700'>{format(data.date)}</div>
    </div>
</div>

    </div>
  )
}

export default Message