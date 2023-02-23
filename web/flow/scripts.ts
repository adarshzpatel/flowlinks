import * as fcl from "@onflow/fcl"
import { toast } from "react-hot-toast";

export const IS_INITIALIZED = `
import FlowLink from 0xFlowLink
import NonFungibleToken from 0xNonFungibleToken 

pub fun main(account:Address):Bool {
  let capability = getAccount(account).getCapability<&FlowLink.Collection{NonFungibleToken.CollectionPublic,FlowLink.CollectionPublic}>(FlowLink.CollectionPublicPath)
  return capability.check()
}
`

export async function checkIsInitialized(addr:string) {
  return await fcl.query({
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
  return await fcl.mutate({
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

const MINT_FLOWLINK = `
import FlowLink from 0xFlowLink
import NonFungibleToken from 0xNonFungibleToken 

transaction (
  domainName:String,
  displayName:String,
  title:String,
  bio:String,
  avatar:String, 
  recipient:Address
) {
    let nftReceiver: &{NonFungibleToken.CollectionPublic}

    prepare(account: AuthAccount) {
      // if the account does not have a flowlink collection , make it
      if account.borrow<&FlowLink.Collection>(from: FlowLink.CollectionStoragePath) == nil {
        let collection <- FlowLink.createEmptyCollection()
        account.save(<- collection, to:FlowLink.CollectionStoragePath)
        account.link<&{NonFungibleToken.CollectionPublic}>(FlowLink.CollectionPublicPath,target:FlowLink.CollectionStoragePath)
      }
      self.nftReceiver = account.getCapability(FlowLink.CollectionPublicPath).borrow<&{NonFungibleToken.CollectionPublic}>() ?? panic("Could not get receiver reference to the NFT Collection")
    }
  
  execute {
    FlowLink.mintNFT(
      domainName:domainName,
      displayName:displayName,
      title:title,
      bio:bio,
      avatar:avatar, 
      recipient:self.nftReceiver
    )
  }
}
 
`
export async function mintFlowlink(domainName:string,displayName:string,title:string,bio:string,avatar:string,recipient:string) {
  const txId = await fcl.mutate({
    cadence: MINT_FLOWLINK,
    args: (arg:any, t:any) => [arg(domainName, t.String), arg(displayName, t.String),arg(title, t.String),arg(bio, t.String),arg(avatar, t.String),arg(recipient, t.Address)],
    payer:fcl.authz, 
    proposer:fcl.authz,
    authorizations: [fcl.authz],
    limit: 1000,
  })
  console.log({txId})
  const tx = await fcl.tx(txId).onceSealed()
  console.log(tx)
}