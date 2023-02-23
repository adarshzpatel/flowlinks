import React from 'react'
type Props = {
  name:string 
  username:string 
  bio:string 

}

const Card = ({name,username,bio}: Props) => {
  return (
    <div className='border border-flex-800 p-9 square-lg'>
      <div>{name}</div>
      <div>@{username}</div>
      <div>{bio}</div>
     </div>
      
  )
}



export default Card
