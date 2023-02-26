import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Card from '../components/Builder/Card'
import { checkIsAvailable, getFlowLinkByDomainName } from '../flow/scripts'
import { useControls } from '../store/useControls'

type Props = {}

const FlowLinkShowcasePage = (props: Props) => {
  const router = useRouter()
  const slug = router?.query?.domainName as string  
  const domainName = slug?.substring(1)
  const [data,setData] = useState<any>();
  const [exists,setExists] = useState<boolean>(false)

  //State for card inputs
  const {setDisplayName,setUserName,setTitle} = useControls();

  // If domainName is not prefixed with @ , then add it
  useEffect(()=>{
    if(slug){
      if(!slug?.startsWith("@")){
        router.push("@"+slug)
      }
    }
  },[slug])

  // Fetch FlowLinkData
  useEffect(()=>{
    const getData = async () => {
      try{
        //Check if domain Name is available to take or not
        const isAvailable = await checkIsAvailable(domainName)
        setExists(!isAvailable)
        // if taken , it means nft exists and we can get the data
        if(!isAvailable){
         const res =await getFlowLinkByDomainName(domainName)
          console.log(res)
          setData(res)
          setDisplayName(res.displayName)
          setUserName(res.domainName)
          setTitle(res.title)
        }
        } catch(err){
        console.log(err)
      }
    }
    if(domainName){
      getData()
    }
  },[domainName])

  
  return (
    <div >{exists ? <Card /> : "This domain has not been claimed yet , you can be the first one to claim it"}</div>
  )

}

export default FlowLinkShowcasePage