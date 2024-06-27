# DEAN v2.0

My current submission for the HENRY | Movement Labs Hackathon. Alongside being developed for ARTHUR LABS.

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
1. Seller creates information abut the product
2. Buyer views information about the product
3. Required information to view the product: 
* Title
* Price
* Ships From
* Image
* Shipping type
* Description
* Creator Wallet
4. Inputs from the buyer:
* Shipping method
* Quantity 
* Delivery Method
5. Optional inputs from the seller:
* Included features (Additional text boxes)
* Upcharges (Title & Value)
* Shipping methods (Standard | Priority | Premium)
6. Automatic information from the marketplace: 
* Timestamp of transaction
* UUID
* Category
:::

```plantuml

actor Buyer
actor Seller
entity Smart_Contract
entity Marketplace


Buyer -> Seller:  


```
