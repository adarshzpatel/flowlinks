import React, { useState } from 'react'

type Props = {
  name:string ,
  setName:any 
}


/*
TODO : 

- display name
- username 
- bio 

*/
function Controls({name,setName}:Props) {

  return (
    <div className='p-10 flex flex-col gap-4'>
      <label htmlFor="">Name</label>
      <input type="text" placeholder='Enter Name' value={name} onChange={e=>setName(e.target.value)} className='text-black'/>
      {/* <label htmlFor="">username</label>
      <input type="text" placeholder='Enter Username' value={username} onChange={e=>setUsername(e.target.value)} className='text-black'/>
      <label htmlFor="">bio</label>
      <input type="text" placeholder='Enter Bio' value={bio} onChange={e=>setBio(e.target.value)} className='text-black'/> */}
    </div>
  )
}

export default Controls