import * as fcl from "@onflow/fcl"
import { FlowLinkType } from "./types";
import { checkIsInitialized } from "./scripts";

export const INITIALIZE_ACCOUNT = `
import FlowLink from 0xFlowLink
import NonFungibleToken from 0xNonFungibleToken

transaction() {
    prepare(account: AuthAccount) {
      let cap = account.getCapability<&FlowLink.Collection{NonFungibleToken.CollectionPublic,FlowLink.CollectionPublic}>(FlowLink.CollectionPublicPath).check()
      if cap {
        return 
      }
      account.save<@NonFungibleToken.Collection>(<- FlowLink.createEmptyCollection(),to: FlowLink.CollectionStoragePath)
      account.link<&FlowLink.Collection{NonFungibleToken.CollectionPublic, NonFungibleToken.Receiver, FlowLink.CollectionPublic}>(FlowLink.CollectionPublicPath, target: FlowLink.CollectionStoragePath)
      account.link<&FlowLink.Collection>(/private/FlowLinkCollection, target: FlowLink.CollectionStoragePath)
    }

    execute {}
}
 
}
`
export async function initializeAccount() {
  const txId = await fcl.mutate({
    cadence: INITIALIZE_ACCOUNT,
    payer:fcl.authz, 
    proposer:fcl.authz,
    authorizations: [fcl.authz],
    limit:50 
  });
  const tx = await fcl.tx(txId).onceSealed()
  console.log(tx)
}

const MINT_NFT = `
import FlowLink from 0xFlowLink
import NonFungibleToken from 0xNonFungibleToken
import FungibleToken from 0xFungibleToken

transaction(domainName:String,){
  let nftReceiver: &{NonFungibleToken.CollectionPublic}
  let vault: @FungibleToken.Vault
  
  prepare(account:AuthAccount){
    self.nftReceiver = account.getCapability(FlowLink.CollectionPublicPath).borrow<&{NonFungibleToken.CollectionPublic}>() ?? panic("Could not get receiver refernce to the NFT collection")
    let vaultRef = account.borrow<&FungibleToken.Vault>(from: /storage/flowTokenVault) ?? panic("Could not borrow Flow token vault reference")
    self.vault <- vaultRef.withdraw(amount:1.000)
  }
  
  execute {
    FlowLink.mintFlowLink(domainName:"rash",displayName:"x",title:"x",bio:"x",avatar:"x",cover:"x",socialLinks:{},otherLinks:[],styles:{},recipient:self.nftReceiver,feeTokens:<- self.vault) 
  }
}
 
}`



export const mintNFT = async  (receiver:string) => {
  const isInit = await checkIsInitialized(receiver)
  if(isInit) {
    const initTx = await initializeAccount()
  }
  const data:FlowLinkType = {
    domainName:"flowlink",
    displayName:"Flowlinks",
    title:"Company",
    bio:"Showcase all your links at one place",
    avatar:"//",
    cover:"//",
    socialLinks:{
      github:"https://github.com/adarshzpatel/flowlinks",
    },
    otherLinks:[{title:"Website",href:"https://flowlinks.vercel.app"}],
    styles:{
      avatar:"rounded",
      background:"#000",
      card:"rounded",
      theme:"default"
    }
  }
  const _socialLinks = Object.keys(data.socialLinks).map((item:string)=>({key:item,value:data.socialLinks[item]}))
  const _styles = Object.keys(data.styles).map((item:string)=>({key:item,value:data.styles[item]}))
  const _otherLinks = data.otherLinks.map((link)=> Object.keys(link).map((item:string)=>({key:item,value:link[item]})))
  console.log({_socialLinks,_styles,_otherLinks})
  try{
    const txId = await fcl.mutate({
      cadence: MINT_NFT,
      args: (arg:any,t:any) => {
        
        const args = [
        arg(data.domainName,t.String),
        arg(data.displayName,t.String),
        arg(data.title,t.String),
        arg(data.bio,t.String),
        arg(data.avatar,t.String),  
        arg(data.cover,t.String),
        arg(_socialLinks,t.Dictionary({key:t.String,value:t.String})),
        arg(_otherLinks,t.Array(t.Dictionary({key:t.String,value:t.String}))),
        arg(_styles,t.Dictionary({key:t.String,value:t.String}))
      ]
      console.log("args",args)
      return args
    },
      payer:fcl.authz, 
      proposer:fcl.authz,
      authorizations: [fcl.authz],
      limit:50 
    });
    console.log(txId)
    const tx = await fcl.tx(txId).onceSealed()
    return tx
  } catch (err){
    console.error(err)
  }
}