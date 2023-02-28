import { config } from "@onflow/fcl";

config({
  // The name of our dApp to show when connecting to a wallet
  "app.detail.title": "FlowLinks",
  // An image to use as the icon for our dApp when connecting to a wallet
  // RPC URL for the Flow Testnet
  "accessNode.api": "https://rest-testnet.onflow.org",
  // A URL to discover the various wallets compatible with this network
  // FCL automatically adds support for all wallets which support Testnet
  "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn",
  // Alias for the Domains Contract
  // UPDATE THIS to be the address of YOUR contract account address
  "0xFlowLink": "0xa2d9147131cd0f21",
  // Testnet aliases for NonFungibleToken and FungibleToken contracts
  "0xNonFungibleToken": "0x631e88ae7f1d7c20",
  "0xFungibleToken": "0x9a0766d93b6608b7",
});