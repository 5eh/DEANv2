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
		uint32 price,
		uint32 quantity
	);
	event ProductPurchased(string listingID, address buyer, uint32 quantity);
	event DeliveryConfirmed(string listingID, address owner);
	event DeliveryAddressUpdated(address user, string deliveryAddress);
	event CustomInstructionsUpdated(address user, string instructions);

	struct ProductData {
		string title;
		string description;
		string photo;
		string location;
		string shippingMethod;
		string upcharges;
		string category;
		uint32 price;
		uint32 timeValidity;
		uint32 quantity;
		address payable creatorWallet;
		bool isDelivered;
	}

	string private listingTitle;

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

	/**
	 * @notice Create a new product listing.
	 * @param _title Listing title.
	 * @param _description Product description.
	 * @param _photo Product photo URL.
	 * @param _location Product location.
	 * @param _shippingMethod Shipping method.
	 * @param _upcharges Additional upcharges.
	 * @param _category Product category.
	 * @param _price Price.
	 * @param _timeValidity Time validity.
	 * @param _quantity Initial quantity.
	 * @param _listingID Listing ID.
	 */
	function createProduct(
		string memory _title,
		string memory _description,
		string memory _photo,
		string memory _location,
		string memory _shippingMethod,
		string memory _upcharges,
		string memory _category,
		uint32 _price,
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
	}

	/**
	 * @notice Allows a user to purchase a product.
	 * @param _listingID Listing ID.
	 * @param _quantity Purchase quantity.
	 */
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

	/**
	 * @notice Allows a user to set own delivery address against their ETH address.
	 * @param _deliveryAddress New delivery address.
	 */
	function setDeliveryAddress(string memory _deliveryAddress) public {
		deliveryAddresses[msg.sender] = _deliveryAddress;
		emit DeliveryAddressUpdated(msg.sender, _deliveryAddress);
	}

	/**
	 * @notice Retrieves delivery address of a user.
	 * @param user User's ETH address.
	 * @return Physical delivery address of the user.
	 */
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

	function getListingTitle() public view returns (string memory) {
		return listingTitle;
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
}
