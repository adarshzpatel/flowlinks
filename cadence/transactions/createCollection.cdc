import FlowLink from 0xf8d6e0586b0a20c7

transaction {
    prepare(acct:AuthAccount) {
        acct.save(<- FlowLink.createCollection(), to: /storage/FlowLink)
        // We're linking two resources in different storage domains 
        acct.link<&FlowLink.Collection{FlowLink.CollectionPublic}>(/public/FlowLink, target: /storage/FlowLink)
    }
    execute {
        log("Stored a collection for our NUTTY empty NFTs")
    }
}
 