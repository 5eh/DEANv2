// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

contract CommerceContract {
	address private owner;
	address private deployer;

	ProductData private product;
	mapping(address => string) private deliveryAddresses;
	mapping(address => string) private customInstructions;

	event ProductListed(address owner, uint32 price, uint32 quantity);
	event ProductPurchased(address buyer, uint32 quantity);
	event DeliveryConfirmed(address owner);
	event DeliveryAddressUpdated(address user, string deliveryAddress);
	event CustomInstructionsUpdated(address user, string instructions);

	struct ProductData {
		string title;
		string description;
		uint32 price;
		uint32 quantity;
		string formSelectionType;
		string image;
		address payable creatorWallet;
		bool isDelivered;
	}

	// Add an initializer function
	function initialize(
		address _deployer,
		string memory _title,
		string memory _description,
		uint32 _price,
		uint32 _quantity,
		string memory _formSelectionType,
		string memory _image
	) external {
		require(deployer == address(0), "Already initialized");
		owner = msg.sender;
		deployer = _deployer;
		product = ProductData({
			title: _title,
			description: _description,
			price: _price,
			quantity: _quantity,
			formSelectionType: _formSelectionType,
			image: _image,
			creatorWallet: payable(msg.sender),
			isDelivered: false
		});
		emit ProductListed(msg.sender, _price, _quantity);
	}

	modifier onlyOwnerOrDeployer() {
		require(
			msg.sender == owner || msg.sender == deployer,
			"Not authorized"
		);
		_;
	}

	function purchaseProduct(uint32 _quantity) public payable {
		require(_quantity <= product.quantity, "Not enough items in stock");
		require(
			msg.value == product.price * _quantity,
			"Incorrect amount of Ether sent"
		);
		product.quantity -= _quantity;
		emit ProductPurchased(msg.sender, _quantity);
	}

	function confirmDelivery() public {
		require(
			msg.sender == product.creatorWallet,
			"Only the seller can confirm delivery"
		);
		require(!product.isDelivered, "Product already delivered");

		product.isDelivered = true;
		product.creatorWallet.transfer(address(this).balance);

		emit DeliveryConfirmed(msg.sender);
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

	function getCustomInstructions(
		address user
	) public view returns (string memory) {
		require(
			bytes(customInstructions[user]).length > 0,
			"No custom instructions set for this user. Are you sure they have purchased?"
		);
		return customInstructions[user];
	}

	function getProductData() public view returns (ProductData memory) {
		return product;
	}
}
