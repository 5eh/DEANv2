// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

contract CommerceContract {
	address private owner;
	address private deployer;
	string[] public listingsArray;

	mapping(string => ProductData) public products;
	mapping(string => address) private productBuyers;
	mapping(address => string) private deliveryAddresses; // Storing unhashed delivery addresses
	mapping(address => string) private customInstructions;

	event ProductListed(
		string listingID,
		address owner,
		uint price,
		uint32 quantity
	);
	event ProductPurchased(string listingID, address buyer, uint32 quantity);
	event DeliveryConfirmed(string listingID, address owner);
	event DeliveryAddressUpdated(address user, string deliveryAddress);
	event CustomInstructionsUpdated(address user, string instructions);
	event ProductDataFetched(string listingID, ProductData product);

	// Change of Contract

	struct ProductData {
		string title;
		string description;
		string photo;
		string location;
		string shippingMethod;
		string upcharges;
		string category;
		uint price;
		uint32 timeValidity;
		uint32 quantity;
		address payable creatorWallet;
		bool isDelivered;
	}

	constructor() {
		owner = msg.sender;
		deployer = msg.sender;
	}

	modifier onlyOwnerOrDeployer() {
		require(
			msg.sender == owner || msg.sender == deployer,
			"Not authorized"
		);
		_;
	}

	function createProduct(
		string memory _title,
		string memory _description,
		string memory _photo,
		string memory _location,
		string memory _shippingMethod,
		string memory _upcharges,
		string memory _category,
		uint _price,
		uint32 _timeValidity,
		uint32 _quantity,
		string memory _listingID
	) public {
		require(
			products[_listingID].creatorWallet == address(0),
			"Listing ID already exists"
		);

		products[_listingID] = ProductData({
			title: _title,
			description: _description,
			photo: _photo,
			location: _location,
			shippingMethod: _shippingMethod,
			upcharges: _upcharges,
			category: _category,
			price: _price,
			timeValidity: _timeValidity,
			quantity: _quantity,
			creatorWallet: payable(msg.sender),
			isDelivered: false
		});
		listingsArray.push(_listingID);
		emit ProductListed(_listingID, msg.sender, _price, _quantity);
		emit ProductDataFetched(_listingID, products[_listingID]);
	}

	function purchaseProduct(
		string memory _listingID,
		uint32 _quantity
	) public payable {
		ProductData storage product = products[_listingID];
		require(_quantity <= product.quantity, "Not enough items in stock");
		require(
			msg.value == product.price * _quantity,
			"Incorrect amount of Ether sent"
		);
		product.quantity -= _quantity;
		productBuyers[_listingID] = msg.sender;
		emit ProductPurchased(_listingID, msg.sender, _quantity);
	}

	function confirmDelivery(string memory _listingID) public {
		require(
			msg.sender == products[_listingID].creatorWallet,
			"Only the seller can confirm delivery"
		);
		require(!products[_listingID].isDelivered, "Product already delivered");

		products[_listingID].isDelivered = true;
		products[_listingID].creatorWallet.transfer(address(this).balance);

		emit DeliveryConfirmed(_listingID, msg.sender);
	}

	function setDeliveryAddress(string memory _deliveryAddress) public {
		deliveryAddresses[msg.sender] = _deliveryAddress;
		emit DeliveryAddressUpdated(msg.sender, _deliveryAddress);
	}

	function getDeliveryAddress(
		address user
	) public view returns (string memory) {
		require(
			bytes(deliveryAddresses[user]).length > 0,
			"No delivery address set by this user. Are you sure they have purchased?"
		);
		return deliveryAddresses[user];
	}

	function setCustomInstructions(string memory _instructions) public {
		customInstructions[msg.sender] = _instructions;
		emit CustomInstructionsUpdated(msg.sender, _instructions);
	}

	function getAllListings() public view returns (string[] memory) {
		return listingsArray;
	}

	function getCustomInstructions(
		address user
	) public view returns (string memory) {
		require(
			bytes(customInstructions[user]).length > 0,
			"No custom instructions set for this user. Are you sure they have purchased?"
		);
		return customInstructions[user];
	}

	function getProductData(
		string memory listingID
	) public view returns (ProductData memory) {
		require(
			products[listingID].creatorWallet != address(0),
			"Product does not exist"
		);
		return products[listingID];
	}

	function getAllProductData()
		public
		view
		returns (string[] memory, ProductData[] memory)
	{
		uint256 length = listingsArray.length;
		ProductData[] memory allProducts = new ProductData[](length);

		for (uint256 i = 0; i < length; i++) {
			allProducts[i] = products[listingsArray[i]];
		}

		return (listingsArray, allProducts);
	}
}
