import React from 'react'

type Props = {
  name:string 
  username:string 
  bio:string 

}

const Card = ({name,username,bio}: Props) => {
  return (
    <div className='border border-flow-500 p-8 rounded-lg'>
      <div>{name}</div>
      <div>@{username}</div>
      <div>{bio}</div>
    
  
    </div>
   
  )
}

export default Card
