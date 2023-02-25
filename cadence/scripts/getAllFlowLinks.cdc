import FlowLink from 0xf8d6e0586b0a20c7
import NonFungibleToken from 0xf8d6e0586b0a20c7



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
 