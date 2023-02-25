import FlowLink from 0xf8d6e0586b0a20c7
import NonFungibleToken from 0xf8d6e0586b0a20c7

pub fun main(account:Address):Bool {
 let cap = getAccount(account).getCapability<&FlowLink.Collection{NonFungibleToken.CollectionPublic}>(FlowLink.CollectionPublicPath).check()
  return cap
}
 