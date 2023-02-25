import React, { useEffect, useState } from 'react'
import { getAllFlowLinks } from '../flow/scripts'

type Props = {}

const Explore = (props: Props) => {
  const [flowLinks,setFlowLinks] = useState()

  useEffect(() => {
    const getData = async () => {
      const res = await getAllFlowLinks()
      console.log(res)
      setFlowLinks(res)
    }
    getData()
  }, [])
  

  return (
    <div>explore</div>
  )
}

export default Explore