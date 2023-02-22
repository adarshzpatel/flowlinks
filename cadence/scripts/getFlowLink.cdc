import FlowLink from 0xf8d6e0586b0a20c7
import NonFungibleToken from 0xf8d6e0586b0a20c7


pub fun main(domainName:String): FlowLink.LinkInfo? {
    let account = FlowLink.owners[domainName]!
    let id = FlowLink.domainNameToIDs[domainName]!
    let collectionRef = getAccount(account).getCapability(FlowLink.CollectionPublicPath).borrow<&FlowLink.Collection{FlowLink.CollectionPublic}>() ?? panic("Could not borrow capability from the public collection")
    if id != nil {
      let nft = collectionRef.borrowFlowLinkNFT(id: id)
      let linkInfo = nft.getLinkInfo()
      return linkInfo
    }
    return nil
  }
  
 