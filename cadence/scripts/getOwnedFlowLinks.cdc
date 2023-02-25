import FlowLink from 0xf8d6e0586b0a20c7
import NonFungibleToken from 0xf8d6e0586b0a20c7


pub fun main():[FlowLink.LinkInfo] {
    let collectionRef = getAccount(0xf8d6e0586b0a20c7).getCapability(FlowLink.CollectionPublicPath).borrow<&FlowLink.Collection{FlowLink.CollectionPublic,NonFungibleToken.CollectionPublic}>() ?? panic("Could not borrow capability from the public collection")
    let infos: [FlowLink.LinkInfo] = []
    for id in collectionRef.getIDs() {
      let nft = collectionRef.borrowFlowLinkNFT(id: id)
      infos.append(nft.getLinkInfo())
    }
    return infos
  }

