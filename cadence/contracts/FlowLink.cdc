import NonFungibleToken from 0xf8d6e0586b0a20c7
import FungibleToken from 0xf8d6e0586b0a20c7
import MetadataViews from 0xf8d6e0586b0a20c7
// id
// domainName 
// displayName 
// title 
// bio 
// avatar
// TODO : Social links  , other links 


// [] Add Metadata 

pub contract FlowLink:NonFungibleToken {
    pub let CollectionStoragePath: StoragePath
    pub let CollectionPublicPath:PublicPath
    pub let AdminStoragePath:StoragePath

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
        pub let cover:String 
        pub let socialLinks: {String:String}
        pub let otherLinks: [{String:String}]
        pub let styles : {String:String}
        // TODO : Social Links , and other links 
        init(id:UInt64,domainName:String,displayName:String,title:String,bio:String,avatar:String,owner:Address,cover:String,socialLinks:{String:String},otherLinks:[{String:String}],styles:{String:String}){
            self.id = id
            self.domainName = domainName
            self.displayName = displayName
            self.title = title
            self.bio = bio
            self.avatar = avatar
            self.owner = owner
            self.cover = cover 
            self.socialLinks = socialLinks
            self.otherLinks = otherLinks
            self.styles = styles
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

    pub resource NFT: NonFungibleToken.INFT,FlowLinkPublic,MetadataViews.Resolver {
        pub let id:UInt64
        pub let domainName:String 
        pub let displayName:String 
        pub let title:String 
        pub let bio:String 
        pub let avatar:String
        pub let cover:String 
        pub let socialLinks: {String:String}
        pub let otherLinks: [{String:String}]
        pub let styles : {String:String}

        init(id:UInt64,domainName:String,displayName:String,title:String,bio:String,avatar:String,cover:String,socialLinks:{String:String},otherLinks:[{String:String}],styles:{String:String}){
            self.id = id
            self.domainName = domainName 
            self.displayName = displayName 
            self.title = title 
            self.bio = bio
            self.avatar = avatar 
            self.cover = cover 
            self.socialLinks = socialLinks
            self.otherLinks = otherLinks
            self.styles = styles
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
                owner:owner,
                cover:self.cover,
                socialLinks:self.socialLinks,
                otherLinks:self.otherLinks,
                styles:self.styles
            )
        }

        pub fun getViews(): [Type] {
            return [
                Type<MetadataViews.Display>(),
                Type<MetadataViews.ExternalURL>()
            ]
        }

        pub fun resolveView(_ view: Type): AnyStruct? {
            switch view {
                case Type<MetadataViews.Display>():
                    return MetadataViews.Display(
                        name:"FlowLink /".concat(self.domainName),
                        description:self.bio,
                        thumbnail:MetadataViews.HTTPFile(url:self.avatar)
                )

                case Type<MetadataViews.ExternalURL>():
                    return MetadataViews.ExternalURL("https://flowlinks.vercel.app/".concat(self.domainName))
                
            }
            return nil
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

    pub resource interface AdminPublic {
        pub var price:UFix64
        pub fun mintNFT(domainName:String,displayName:String,title:String,bio:String,avatar:String,cover:String,socialLinks:{String:String},otherLinks:[{String:String}],styles:{String:String},recipient:&{NonFungibleToken.CollectionPublic},feeTokens:@FungibleToken.Vault) 
        pub fun getPrice():UFix64
        pub fun getVaultBalance():UFix64
    }

    pub resource interface AdminPrivate {
       pub fun withdrawVault(receiver:Capability<&{FungibleToken.Receiver}>,amount:UFix64)
       pub fun setPrice(val:UFix64)
    }

    pub resource Admin: AdminPublic,AdminPrivate {
        pub var price: UFix64

        // reference to the vault used for depositing Flow tokens we receive
        access(self) var rentVault: @FungibleToken.Vault 

        // A capability for the FlowLinks.Collection resource owned by the account 
        // only the account has access to it 
        init(vault: @FungibleToken.Vault,collection:Capability<&FlowLink.Collection>) {
            // This represents 1 year in seconds 
            self.price = 1.0
            self.rentVault <- vault 
        }

        destroy() {
            destroy  self.rentVault
        }   
        
        // mints a new NFt with a new Id and deposit it in the recipients collection using their collection reference 
        pub fun mintNFT(domainName:String,displayName:String,title:String,bio:String,avatar:String,cover:String,socialLinks:{String:String},otherLinks:[{String:String}],styles:{String:String},recipient:&{NonFungibleToken.CollectionPublic},feeTokens:@FungibleToken.Vault) {
            // Ensure the domain name is not longer than the max length allowed
            if FlowLink.isAvailable(domainName:domainName) == false {
                panic("FlowLink is already claimed !")
            }

            let forbiddenCharsUTF8 = FlowLink.forbiddenChars.utf8
            let domainNameUTF8 = domainName.utf8

            for char in forbiddenCharsUTF8 {
                if domainNameUTF8.contains(char) {
                    panic("Illegal domain name")
                }
            }
            if feeTokens.balance < self.price {
                panic("Insufficient FLOW tokens sent")
            }

            self.rentVault.deposit(from: <- feeTokens)

            var newNFT <- create NFT(
                id:FlowLink.totalSupply,
                domainName:domainName,
                displayName:displayName,
                title:title,
                bio:bio,
                avatar:avatar,
                cover:cover,
                socialLinks:socialLinks,
                otherLinks:otherLinks,
                styles:styles
            )

            // deposit it in the recipient's account using their colelction reference 
            recipient.deposit(token: <- newNFT)
            FlowLink.totalSupply = FlowLink.totalSupply + 1
        }   

        // Return the price 
        pub fun getPrice(): UFix64 {
            return self.price
        }

        pub fun getVaultBalance():UFix64 {
            return self.rentVault.balance
        }

        pub fun withdrawVault(receiver:Capability<&{FungibleToken.Receiver}>,amount:UFix64){
            let vault = receiver.borrow()!
            vault.deposit(from: <- self.rentVault.withdraw(amount: amount))
        }

        pub fun setPrice(val:UFix64){
            self.price = val
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



    init(){
        self.owners = {}
        self.domainNameToIDs = {}
    
        self.forbiddenChars = "!@#$%^&*()<>? ./"
        self.totalSupply = 0
        
        self.CollectionPublicPath = /public/FlowLinkCollection
        self.CollectionStoragePath = /storage/FlowLinkCollection
        self.AdminStoragePath = /storage/FlowLinkAdmin


        self.account.link<&{FlowLink.CollectionPublic}>(FlowLink.CollectionPublicPath,target:FlowLink.CollectionStoragePath)

        self.account.save<@NonFungibleToken.Collection>(<- FlowLink.createEmptyCollection(),to:FlowLink.CollectionStoragePath)

        emit ContractInitialized()
    }
    
}
 