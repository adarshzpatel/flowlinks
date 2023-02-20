import FlowLink from 0xf8d6e0586b0a20c7

transaction {
  prepare(acct:AuthAccount){
    let collectionReference = acct.borrow<&FlowLink.Collection>(from: /storage/FlowLink) ?? panic("Collection not found")
    collectionReference.deposit(token: <- FlowLink.mintNFT())
  }

  execute{
    log("Minted an NFt and stored it into the collection ")
  }
}
