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
  return fcl.query({
    cadence:IS_INITIALIZED,
    args:(arg:any,t:any) => [arg(addr,t.Address)]
  });
}


export const INITIALIZE_ACCOUNT = `
import FlowLink from 0xFlowLink
import NonFungibleToken from 0xNonFungibleToken 

transaction() {
  prepare(account:AuthAccount){
    let collection <- FlowLink.createEmptyCollection()
    account.save(<-collection,to:FlowLink.CollectionStoragePath)
    account.link<&FlowLink.Collection{FlowLink.CollectionPublic,NonFungibleToken.Provider,NonFungibleToken.Receiver,NonFungibleToken.CollectionPublic}>(FlowLink.CollectionPublicPath,target:FlowLink.CollectionStoragePath)
  }
}
`
export async function initializeAccount() {
  return fcl.mutate({
    cadence: INITIALIZE_ACCOUNT,
    payer:fcl.authz, 
    proposer:fcl.authz,
    authorizations: [fcl.authz],
    limit:50 
  });
}

const GET_ALL_FLOWLINKS = `
import FlowLink from 0xFlowLink
import NonFungibleToken from 0xNonFungibleToken 

pub fun main(): [FlowLink.LinkInfo]{
  let allOwners = FlowLink.getAllOwner()
  let infos: [FlowLink.LinkInfo] = []

  for domainName in allOwners.keys {
      let collectionRef = getAccount(allOwners[domainName]!).getCapability(FlowLink.CollectionPublicPath).borrow<&FlowLink.Collection{FlowLink.CollectionPublic}>() ?? panic("Could not borrow capability from the public collection")
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
export async function getAllFlowLinks() {
  return fcl.query({
    cadence: GET_ALL_FLOWLINKS,
  });
}

const CHECK_IS_AVAILABLE = `
import FlowLInk from 0xFlowLink

pub fun main(name: String): Bool {
  return FlowLink.isAvailable(domainName: name)
}
`;

export async function checkIsAvailable(name:string) {
  return fcl.query({
    cadence: CHECK_IS_AVAILABLE,
    args: (arg:any, t:any) => [arg(name, t.String)],
  });
}

const MINT_FLOWLINK = `
import FlowLink from 0xFlowLink
import NonFungibleToken from 0xNonFungibleToken 

transaction (
  domainName:String,
  displayName:String,
  title:String,
  bio:String,
  avatar:String, 
  recipient:Address, 
) {
  prepare(signer:AuthAccount){

    if signer.borrow<&FlowLink.Collection>(from: FlowLink.CollectionStoragePath) != nil {
      // if they do we move on to execute state 
      return 
    }

    // else create an empty collection 
    let collection <- FlowLink.createEmptyCollection()
    signer.save(<-collection,to:FlowLink.CollectionStoragePath)

    // Create a public capability for the collection 
    signer.link<&FlowLink.Collection{FlowLink.CollectionPublic,NonFungibleToken.Provider,NonFungibleToken.Receiver,NonFungibleToken.CollectionPublic}>(FlowLink.CollectionPublicPath,target:FlowLink.CollectionStoragePath)
  }

  execute {
    let receiver = getAccount(FlowLink.owners[domainName]!).getCapability(FlowLink.CollectionPublicPath).borrow<&{NonFungibleToken.CollectionPublic}>() ?? panic("Could not get receiver reference to the NFT Collection")
    FlowLink.mintNFT(domainName:domainName,displayName:displayName,title:title,bio:bio,avatar:avatar,recipient:receiver)
  }
}
 
`
export async function registerDomain(domainName:string,displayName:string,title:string,bio:string,avatar:string,recipient:string) {
  return fcl.mutate({
    cadence: MINT_FLOWLINK,
    args: (arg:any, t:any) => [arg(domainName, t.String), arg(displayName, t.String),arg(title, t.String),arg(bio, t.String),arg(avatar, t.String),arg(recipient, t.Address)],
    payer: fcl.authz,
    proposer: fcl.authz,
    authorizations: [fcl.authz],
    limit: 1000,
  });
}