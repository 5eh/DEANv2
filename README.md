## Idea: 

I would like to build a Smart Contract EIP standard for Commerce products to be sold and distributed through legally binding contracts. 

This would include ideally implementing zero-knowledge proof, unique identifiers for each contract, and a streamlined marketplace concept that allows for anyone to replicate the boilerplate to build the marketplace.

## Problem:

There is minimal existing infrastructure to encourage global trade of commerce in blockchains.

## Solution:

An EIP Smart Contract that aims to be legally binding to the seller and buyer, as well as implementing zero-knowledge proof to authenticate purchases from a given buyer.

## How can I build the marketplace effectively.

Potentially starting with the easiest and then expanding onto to it to make it more difficult may be the best 

1. Build design system - don't overoptimize
2. Build smart contract - don't overoptimize
3. Connect messenging system? 
4. Connect mongoDB - maybe?
5. Connect profile system

More notes:
1. Home page - just static, nothing too exciting
2. Sorting & Listing page, smart contracts need to maintain listing data
3. Smart contracts need to hold creator wallet address
4. Review to Hackathon Smart Contract page for design
5. Sorting can be optionally set up initially
6. Create page could have categories of types of listings just for user experience, these can then be mapped into Sorting functionality,
7. Form input then goes into a useState or cross chain variable, this information then goes into the explore section



:::warning
Information as follows:
* Seller creates information abut the product
* Buyer views information about the product

1. Required information to view the product: 
* Title
* Price
* Ships From
* Image (IPFS)
* Shipping type
* Description
* Creator Wallet

2. Inputs from the buyer:
* Name or Alias (ZK)
* Shipping location (ZK)
* Quantity 
* Shipping Method (Standard | Priority | Premium)

3. Optional inputs from the seller:
* Included features (Additional text boxes)
* Upcharges (Title & Value) (ZK?)
* Shipping methods (Standard | Priority | Premium)

4. Automatic information from the marketplace: 
* Timestamp of transaction (Optional)
* UUID (Optional)
* Category (Optional)
:::

```plantuml

actor Buyer
actor Seller
entity Marketplace_UI
entity Smart_Contract



Seller -> Marketplace_UI: Fills out requirements for listing
Marketplace_UI -> Smart_Contract: Converts input into Contract
Smart_Contract -> Marketplace_UI: Provides Timestamp & ID of initiation
Marketplace_UI -> Buyer: Displays listings
Buyer -> Marketplace_UI: Views and selects listing to purchase
Buyer -> Marketplace_UI: Fills in required + additional information
Marketplace_UI -> Smart_Contract: Handles purchase agreement
Smart_Contract -> Marketplace_UI: Handles ZK Proof, and adds booleans

```

Features:
1. Upgradable smart contract (Extendable features)
2. ZK proof
3. Legally binding (Maybe ZK proof?)
4. Validity Oracle

Benefits of this:
1. Anyone can utilize smart contract standard to create ecom platform
2. Anyone can develop and 


## Important considerations:
1. How can people validate the authenticity/validity of the products that are attached onto the contract?
2. How can people be legally responsible for the deliverance of the contract?
3. Is it viable to build a standalone blockchain for this that includes oracle validators?
4. How should information be updated and accessed for future references?


## Important principles
1. To make it ZK Proof efficient: Soundness, Zero-Knowledge
2. To make it an upgradable smart contract: Proxy, Implementation, ProxyAdmin
