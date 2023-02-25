import FlowLink from 0xf8d6e0586b0a20c7
import NonFungibleToken from 0xf8d6e0586b0a20c7
import FungibleToken from 0xee82856bf20e2aa6

transaction(displayName:String,title:String,bio:String,avatar:String,cover:String,socialLinks:{String:String},otherLinks:[{String:String}],styles:{String:String}) {
    var nft: &FlowLink.NFT

    prepare(account: AuthAccount) {
      let collection = account.getCapability(FlowLink.CollectionPublicPath).borrow<&FlowLink.Collection{FlowLink.CollectionPrivate}>() ?? panic("Could not get receiver refernce to the NFT collection")
      self.nft = collection.borrowFlowLinkPrivate(id:0)
    }

    execute {
      self.nft.setDisplayName(displayName:displayName)
      self.nft.setTitle(title: title)
      self.nft.setAvatar(avatar: avatar)
      self.nft.setBio(bio: bio)
      self.nft.setCover(cover: cover)
      self.nft.setOtherLinks(otherLinks: otherLinks)
      self.nft.setSocialLinks(socialLinks: socialLinks)
      self.nft.setStyles(styles: styles)
    }
}
 