import * as fcl from "@onflow/fcl"

export const IS_INITIALIZED = `
import FlowLink from 0xFlowLink
import NonFungibleToken from 0xNonFungibleToken 

pub fun main(account:Address):Bool {
  let capability = getAccount(account).getCapability<&FlowLink.Collection{NonFungibleToken.CollectionPublic,FlowLink.CollectionPublic}>(FlowLink.CollectionPublicPath)
  return capability.check()
}
`

export async function checkIsInitialized(addr:string) {
  const res = await fcl.query({
    cadence:IS_INITIALIZED,
    args:(arg:any,t:any) => [arg(addr,t.Address)]
  })

  console.log("isInitiazed",res)
  return res
}



const GET_ALL_FLOWLINKS = `
import FlowLink from 0xFlowLink
import NonFungibleToken from 0xNonFungibleToken 

pub fun main(): [FlowLink.LinkInfo]{
  let allOwners = FlowLink.getAllOwner()
  let infos: [FlowLink.LinkInfo] = []

  for domainName in allOwners.keys {
      let collectionRef = getAccount(allOwners[domainName]!).getCapability(FlowLink.CollectionPublicPath).borrow<&FlowLink.Collection{FlowLink.CollectionPublic}>()!
      let id = FlowLink.domainNameToIDs[domainName] ?? panic("Id not found")
      if id != nil {
        let domain = collectionRef.borrowFlowLinkNFT(id: id)
        let linkInfo = domain.getLinkInfo()
        infos.append(linkInfo)
      }
  }
  
  return infos
}
`

const GET_ALL_OWNERS= `
import FlowLink from 0xFlowLink
import NonFungibleToken from 0xNonFungibleToken 

pub fun main(): {String:Address} {
  return FlowLink.getAllOwner()
}
`
export async function getAllOwners() {
  return await fcl.query({
    cadence:GET_ALL_OWNERS,
  });
}

const CHECK_IS_AVAILABLE = `
import FlowLInk from 0xFlowLink

pub fun main(name: String): Bool {
  return FlowLink.isAvailable(domainName: name)
}
`;

export async function checkIsAvailable(name:string) {
  return await fcl.query({
    cadence: CHECK_IS_AVAILABLE,
    args: (arg:any, t:any) => [arg(name, t.String)],
  });
}


