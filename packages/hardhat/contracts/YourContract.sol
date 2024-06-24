// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.26;

contract TwoSidedMarketplace {
    // Product data
    struct Product {
        string title;
        string description;
        string[] photos;
        string category;
        string location;
        string shippingMethod;
        address ownerWallet;
    }

    // Mapping of product IDs to product data
    mapping(uint256 => Product) public products;

    // Marketplace state
    mapping(uint256 => bool) public isPaid;
    mapping(uint256 => bool) public isDelivered;

    // Legal terms
    string public purpose = "This smart contract establishes a legally binding two-sided marketplace for the sale of products. Please refer to the following contract. https://www.target.com/c/terms-conditions/-/N-4sr7l";
    string public termsAndAgreements = "By interacting with this smart contract, the parties agree to the terms set forth herein. Please refer to the following contract. https://www.target.com/c/terms-conditions/-/N-4sr7l";

    // Events
    event ProductListed(uint256 indexed productId, address indexed seller);
    event ProductPurchased(uint256 indexed productId, address indexed buyer);
    event ProductDelivered(uint256 indexed productId);

    // Functions
    function createProduct(
        uint256 _productId,
        string memory _title,
        string memory _description,
        string[] memory _photos,
        string memory _category,
        string memory _location,
        string memory _shippingMethod
    ) public {
        // Meeting of the mind
        require(bytes(_title).length > 0, "Product title is required");
        require(bytes(_description).length > 0, "Product description is required");
        require(_photos.length > 0, "At least one product photo is required");
        require(bytes(_category).length > 0, "Product category is required");
        require(bytes(_location).length > 0, "Product location is required");
        require(bytes(_shippingMethod).length > 0, "Shipping method is required");

        // Consideration
        require(msg.sender != address(0), "Seller address cannot be zero");

        // Offer
        products[_productId] = Product({
            title: _title,
            description: _description,
            photos: _photos,
            category: _category,
            location: _location,
            shippingMethod: _shippingMethod,
            ownerWallet: msg.sender
        });

        // Offer & Acceptance
        emit ProductListed(_productId, msg.sender);
    }

    function purchaseProduct(uint256 _productId) public payable {
        // Acceptance
        require(products[_productId].ownerWallet != msg.sender, "Buyer cannot be the seller");
        require(!isPaid[_productId], "Product has already been purchased");

        // Capacity
        require(msg.value > 0, "Payment is required to purchase the product");

        // Buyer signature
        isPaid[_productId] = true;

        // Seller signature
        payable(products[_productId].ownerWallet).transfer(msg.value);

        emit ProductPurchased(_productId, msg.sender);
    }

    function deliverProduct(uint256 _productId) public {
        // Seller signature
        require(msg.sender == products[_productId].ownerWallet, "Only the seller can deliver the product");
        require(isPaid[_productId], "Product must be paid for before delivery");

        // Acceptance
        isDelivered[_productId] = true;

        emit ProductDelivered(_productId);
    }

    function getLegalInformation() public view returns (string memory, string memory) {
        return (purpose, termsAndAgreements);
    }

    function callOwnerAddress(uint256 _productId) public view returns (address) {
        return products[_productId].ownerWallet;
    }
}
