import NonFungibleToken from "./NonFungibleToken.cdc"
// import MetadataViews from "./MetadataViews.cdc"
// id
// domainName 
// displayName 
// title 
// bio 
// avatar
// TODO : Social links  , other links 

pub contract FlowLink:NonFungibleToken {
    pub let CollectionStoragePath: StoragePath
    pub let CollectionPublicPath:PublicPath


    pub var totalSupply:UInt64
    pub let forbiddenChars: String 
    pub let owners: {String:Address} 
    pub let domainNameToIDs: {String:UInt64}
    
    pub event ContractInitialized()
    pub event Withdraw(id: UInt64, from: Address?)
    pub event Deposit(id: UInt64, to: Address?)
    pub event FlowLinkMinted(id: UInt64, domainName: String, displayName: String, title: String,bio:String,avatar:String,receiver: Address)


    pub struct LinkInfo {
        pub let id:UInt64
        pub let domainName:String 
        pub let displayName:String 
        pub let title:String 
        pub let bio:String 
        pub let avatar:String 
        pub let owner:Address
        // TODO : Social Links , and other links 
        init(id:UInt64,domainName:String,displayName:String,title:String,bio:String,avatar:String,owner:Address){
            self.id = id
            self.domainName = domainName
            self.displayName = displayName
            self.title = title
            self.bio = bio
            self.avatar = avatar
            self.owner = owner
        }
    }

    pub resource interface FlowLinkPublic {
        pub let id:UInt64
        pub let domainName:String 
        pub let displayName:String 
        pub let title:String 
        pub let bio:String 
        pub let avatar:String 

        pub fun getLinkInfo():LinkInfo
    }

    pub resource NFT: NonFungibleToken.INFT,FlowLinkPublic {
        pub let id:UInt64
        pub let domainName:String 
        pub let displayName:String 
        pub let title:String 
        pub let bio:String 
        pub let avatar:String 

        init(id:UInt64,domainName:String,displayName:String,title:String,bio:String,avatar:String){
            self.id = id
            self.domainName = domainName 
            self.displayName = displayName 
            self.title = title 
            self.bio = bio
            self.avatar = avatar 
        }

        pub fun getLinkInfo():LinkInfo {
            let owner = FlowLink.owners[self.domainName]!
            return LinkInfo(
                id:self.id,
                domainName:self.domainName,
                displayName:self.displayName,
                title:self.title,
                bio:self.bio,
                avatar:self.avatar,
                owner:owner
            )
        }
    }

    pub resource interface CollectionPublic {
        pub fun borrowFlowLinkNFT(id: UInt64): &{FlowLink.FlowLinkPublic}
    }

    pub resource Collection: CollectionPublic,NonFungibleToken.Provider,NonFungibleToken.Receiver,NonFungibleToken.CollectionPublic {
        pub var ownedNFTs: @{UInt64: NonFungibleToken.NFT}
        // access(self) var address: Address?

        init(){
            self.ownedNFTs <- {}
        }

        // NonFungibleToken.Provider 
        pub fun withdraw(withdrawID:UInt64): @NonFungibleToken.NFT {
            let token <- self.ownedNFTs.remove(key:withdrawID) ?? panic("NFT not found in collection")
            return <- token
        }
        
        // NonFungibleToken.Receiver
        pub fun deposit(token:@NonFungibleToken.NFT){
            let token <- token as! @FlowLink.NFT 
            let id = token.id 
            let domainName = token.domainName 
            
            FlowLink.updateOwner(domainName:domainName,address:self.owner!.address)
            FlowLink.updateDomainNameToIDs(domainName:domainName,id:id)
            let oldToken <- self.ownedNFTs[id] <- token 

            emit Deposit(id:id,to:self.owner?.address)
            
            destroy oldToken 
        }

        pub fun getIDs(): [UInt64] {
            return self.ownedNFTs.keys
        }

        pub fun borrowNFT(id:UInt64): &NonFungibleToken.NFT {
            return (&self.ownedNFTs[id] as &NonFungibleToken.NFT?)!
        }
        

        pub fun borrowFlowLinkNFT(id:UInt64): &{FlowLink.FlowLinkPublic} {
            pre {
                self.ownedNFTs[id] != nil : "FlowLink does not exist" 
            }

            let token = (&self.ownedNFTs[id] as auth &NonFungibleToken.NFT?)!
            return token as! &FlowLink.NFT
        }

        destroy() {
            destroy  self.ownedNFTs
        }
    }

    pub fun getDomainNameOwner(domainName:String):Address?{
        return self.owners[domainName]
    }
    pub fun getDomainNameId(domainName:String):UInt64?{
        return self.domainNameToIDs[domainName]
    }

    pub fun isAvailable(domainName:String):Bool {
        if(self.owners[domainName] == nil){
            return true
        } 
        return false
    }

    pub fun createEmptyCollection():@NonFungibleToken.Collection {
        let collection <- create Collection()
        return <- collection
    }

    pub fun getAllOwner(): {String:Address} {
        return self.owners 
    }

    pub fun getAllMintedLinks(): {String:UInt64}{
        return self.domainNameToIDs
    }

    access(account) fun updateOwner(domainName:String,address:Address){
        self.owners[domainName] = address
    }

    access(account) fun updateDomainNameToIDs(domainName:String,id:UInt64){   
        self.domainNameToIDs[domainName] = id
    }


        // mints a new NFt with a new Id and deposit it in the recipients collection using their collection reference 
    pub fun mintNFT(domainName:String,displayName:String,title:String,bio:String,avatar:String,recipient:&{NonFungibleToken.CollectionPublic}) {
        // create a new nft 
        let forbiddenCharsUTF8 = self.forbiddenChars.utf8
        let domainNameUTF8 = domainName.utf8

        for char in forbiddenCharsUTF8 {
            if domainNameUTF8.contains(char) {
                panic("Illegal domain name")
            }
        }

        var newNFT <- create NFT(
            id:FlowLink.totalSupply,
            domainName:domainName,
            displayName:displayName,
            title:title,
            bio:bio,
            avatar:avatar
        )

        // deposit it in the recipient's account using their colelction reference 
        recipient.deposit(token: <- newNFT)
        FlowLink.totalSupply = FlowLink.totalSupply + 1
    }   

    init(){
        self.owners = {}
        self.domainNameToIDs = {}
    
        self.forbiddenChars = "!@#$%^&*()<>? ./"
        self.totalSupply = 0
        
        self.CollectionPublicPath = /public/FlowLinkCollection
        self.CollectionStoragePath = /storage/FlowLinkCollection


        emit ContractInitialized()
    }
 
}
 