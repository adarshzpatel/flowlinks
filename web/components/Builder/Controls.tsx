import React from 'react'

type Props = {
  displayName: string;
  setDisplayName: any;
  username: string;
  setUserName: any;
  cover: any;
  setCover: any;
  avatar: string;
  setAvatar: any;
  bio: string;
  setBio: any;
};
function Controls({displayName,
  setDisplayName,
  username,
  setUserName,
  cover,
  setCover,
  avatar,
  setAvatar,
  bio,
  setBio}:Props) {
   
  return (
<div className='p-4 flex flex-col gap-4'>
<div className='relative-flex'>
<div className=' text-flow-500'>Cover pic upload</div>
      <input
      type='file'
      className='border-dashed  border-indigo-600 ..." '
      onChange={(e: any) => setCover(e.target.files[0])}
    />
</div>
<div className=' text-flow-500'>Avatar pic upload</div>
<input
      type='file'
      className='border-dashed  border-indigo-600 ..." '
      onChange={(e: any) => setCover(e.target.files[0])}
    />
    <div className='flex flex-col gap-4'>
      
      </div>
      <label htmlFor=''> Display name</label>
      <input type="text" placeholder='enter name' value={displayName} onChange={e=> setDisplayName(e.target.value)} className='text-black'/>
      <label htmlFor=''>User name</label>
      <input type="text" placeholder='enter name' value={username} onChange={e=> setUserName(e.target.value)} className='text-black'/>
      <label htmlFor=''>Bio</label>
      <input type="text" placeholder='enter name' value={bio} onChange={e=> setBio(e.target.value)} className='text-black'/>
    
      </div>
  )
}

export default Controls;


