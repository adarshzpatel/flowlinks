import React, { useState } from 'react'
import Container from '../layouts/Container'
import Controls from '../components/Builder/Controls'
import Preview from '../components/Builder/Preview'


const Builder = () => {
  const [name,setName] = useState<string>("")
  const [username,setUsername] = useState<string>("")
  const [bio,setBio] = useState<string>("")

  return (
    <Container>
  <div className='text-white grid grid-cols-2 h-screen'>
    <div >
      <Controls name={name} setName={setName}/>
    </div>
    <div className='bg-gray-800'>
      <Preview name={name}/>
    </div>
  </div>
    </Container>
  )
}

export default Builder