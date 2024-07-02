
![DEANv2](https://hackmd.io/_uploads/HywElN-P0.png)



## Introduction
In this article, I’ll propose a potentially viable, but undeveloped concept for building a decentralized commerce smart contract, which enables privacy, authenticity, and distribution of physical deliverable commerce. Although I mention Digital Marketplace Factory, this article will focus on the commerce smart contract.

I’m initially developing this for the Movement Labs Hackathon (Link), as well as architecting a Digital Marketplace Factory under the DEAN(v2) system in ARTHUR LABS. Future development will allow for cross-chain contracts to be interacted between Cardano <> Polkadot through the uniFires ecosystem. This smart contract standard will also be proposed in the EIP Ethereum process.

## Achievements
This smart contract aims to achieve:
1. Become an EIP Standard token for decentralized commerce to be viable.
2. Encrypt buyer information in the delivery contract using ZK-Proofs.
3. Ensure legal compliance in the US, UK, and EU initially.
4. Validate and verify the authenticity of the commerce being distributed in the contract.
5. Become upgradable for multiple buyers to purchase the commerce.
6. Provide expandable functionality for the seller, such as modifying the total quantity of the commerce, unique styling of the commerce, purchasing upcharges or extendable products, and choosing the shipping method.
7. Utilize IPFS distribution for image handling.
8. Potentially enable 3rd parties to validate the authenticity of the product.
9. Act as a receipt for the delivery of commerce.

The digital marketplace factory aims to achieve:
1. Access to the smart contract in a production-ready Github repository.
2. Enable any non-technical entrepreneur to utilize the repository to build a customizable marketplace.
3. Utilization of the boilerplate for customized design systems and unique marketplace creations.
4. Utilization of public blockchain infrastructure without excessive knowledge requirements.
5. Reduce the time it takes for entrepreneurs to build companies in the Movement Labs ecosystem from 6-18 months to 1 week.


## Problem

There are various problems for both components.
The smart contract enables a global standard for commerce to be accessible in blockchains. Currently, there is a lack of honest infrastructure that allows for this to be ready for the consumer level. No existing EIP proposals nor replicable code stacks are easily available to people wanting to sell commerce into crypto.

The Digital Marketplace Factory provides a means to build two-sided marketplace businesses easily. There is a heavy technical hurdle in understanding and building the required infrastructure. The additional maintenance is a leading cost for marketplace businesses, and independent entrepreneurs often lack the time to grow their business. The Digital Marketplace Factory allows businesses to be quickly ideated, focusing on marketing while the Github repository handles the infrastructure quality control, ensuring the marketplace has decentralized functionalities.


## Opportunity

Both components independently face significant growth opportunities that generate business potential in various blockchains. The scalability and knowledge from building both successfully allow for much more growth in crypto as a whole.

For the commerce smart contract, it can pave the way for building service smart contracts and delivery smart contracts, collectively capturing a market cap of $27 trillion.

For the Digital Marketplace Factory, numerous use cases can be explored, with the potential for high-quality marketplaces to be built efficiently.


## Smart Contract Structure
### Seller Information
The seller in a given marketplace provides the essential product information in the initial contract:
* Product title
* Product description
* Product photo URL
* Product origins location
* Product shipping method options
* Product upcharges
* Seller legal name or business
* Product quantity
* Product time validity

Once this information is provided, the user signs their portion of the legally binding agreement, which is stored on the smart contract in its entirety. There is consideration for connecting a centralized database into the Digital Marketplace Factory to handle more private and generalized information about users, such as viewing a profile.

The seller can optionally opt into verifying the authenticity of the product through a Chainlink oracle. This step involves a bounty commission given to actors rewarded for verifying the product in person. This step requires further development to address issues such as detecting bad actors and scaling the contract into rural areas.

After the agreement is signed and the listing information is curated, the contract deploys in a factory-like approach, ready to be filled out by potential buyers. The contract becomes upgradable, allowing modifications by a buyer.

### Buyer Information

The buyer accesses the smart contracts through the marketplace or any scanner net. The buyer provides essential personal information, which is ZK encrypted onto the blockchain:
* Buyer Name or business
* Location to deliver
* Method of shipping
* Quantity purchased


### Optional information includes:
* Custom instructions
* Any upcharges purchased

This information goes through a standalone contract, which then notifies the seller in the Digital Marketplace Factory. The payable amount is calculated based on the total value of the contract, combining upcharges, delivery costs, and the product costs. This minimum required payment can optionally include a tip from the buyer. A lot of this information is only viewable to the seller and the buyer, acting as the receipt.

The buyer then agrees to the binding agreements of the contract, making it binding to both parties, with a cancellable function if both agree. The original contract has a boolean function that the seller selects when the product has been delivered. Communication between the buyer and seller is facilitated through the marketplace, ensuring a seamless exchange of physical commerce in the digital world.

## Concerns

Technical infrastructure concerns include ensuring sellers can request information from buyers once it is on-chain while providing assurance that funds are not permanently locked. Solutions could include building an insurance business model or dispute resolution mechanisms like Kleros around the contracts.


## Conclusion
This concept presents an interesting challenge and opportunity for building decentralized commerce solutions. With further development, a functional production contract can be distributed across various blockchains to enable consumer use.

Hope this was helpful.


Watson Lewis-Rodriguez
https://arthurlabs.net/
https://linkedin.com/in/watsonlr


