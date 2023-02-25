import FlowLink from 0xf8d6e0586b0a20c7
import NonFungibleToken from 0xf8d6e0586b0a20c7

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
