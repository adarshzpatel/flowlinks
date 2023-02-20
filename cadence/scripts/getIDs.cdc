import FlowLink from 0xf8d6e0586b0a20c7

pub fun main(acct:Address):[UInt64] {
  let publicRef = getAccount(acct).getCapability(/public/FlowLink).borrow<&FlowLink.Collection{FlowLink.CollectionPublic}>() ?? panic("This account does not have a collection there")

  return publicRef.getIDs()
}
 