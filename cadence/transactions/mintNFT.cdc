import FlowLink from 0xf8d6e0586b0a20c7
import NonFungibleToken from 0xf8d6e0586b0a20c7

transaction (
  domainName:String,
  displayName:String,
  title:String,
  bio:String,
  avatar:String, 
  recipient:Address, 
) {
  prepare(signer:AuthAccount){

    // Check if the user sending the transaction has a collection 
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
    // borrow the recipient's public NFT collection reference 
    if(!FlowLink.isAvailable(domainName:domainName)){
      log("FlowLink already claimed")
      return 
    }
    let receiver = getAccount(FlowLink.owners[domainName]!).getCapability(FlowLink.CollectionPublicPath).borrow<&{NonFungibleToken.CollectionPublic}>() ?? panic("Could not get receiver reference to the NFT Collection")

    //Mint nft to the receivers nft collection 
    FlowLink.mintNFT(domainName:domainName,displayName:displayName,title:title,bio:bio,avatar:avatar,recipient:receiver)
    // FlowLink.mintNFT(domainName:"adarsh",displayName:"Adarsh Pate",title:"Ttiel",bio:"Bio",avatar:"Avatart",recipient:receiver)
    log("Minted an NFT and stored it into the collection")
  }
}
 