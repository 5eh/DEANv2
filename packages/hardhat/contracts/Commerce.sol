// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CommerceContract {
	struct Product {
		string title;
		string description;
		string photoURL;
		string originsLocation;
		string shippingMethod;
		string upcharges;
		string sellerName;
		uint quantity;
		uint validityTime;
		bool isAuthentic;
	}

	struct Order {
		address buyer;
		string buyerName;
		string deliveryLocation;
		string shippingMethod;
		uint quantity;
		string customInstructions;
		string purchasedUpcharges;
		uint totalPrice;
		bool isCompleted;
		string receiptImageURL;
	}

	Product public product;
	address public seller;
	mapping(address => Order) public orders;
	address[] public buyers;
	uint public totalOrders;
	uint public productPrice;
	uint public contractTimestamp;

	event ProductListed(address seller, Product product);
	event OrderPlaced(address buyer, Order order);
	event OrderCompleted(address buyer, Order order);

	modifier onlySeller() {
		require(msg.sender == seller, "Only seller can perform this action");
		_;
	}

	modifier validOrder() {
		require(orders[msg.sender].buyer == address(0), "Order already placed");
		_;
	}

	constructor(
		string memory _title,
		string memory _description,
		string memory _photoURL,
		string memory _originsLocation,
		string memory _shippingMethod,
		string memory _upcharges,
		string memory _sellerName,
		uint _quantity,
		uint _validityTime,
		uint _productPrice,
		uint _contractTimestamp
	) {
		seller = msg.sender;
		product = Product({
			title: _title,
			description: _description,
			photoURL: _photoURL,
			originsLocation: _originsLocation,
			shippingMethod: _shippingMethod,
			upcharges: _upcharges,
			sellerName: _sellerName,
			quantity: _quantity,
			validityTime: _validityTime,
			isAuthentic: false
		});
		productPrice = _productPrice;
		contractTimestamp = _contractTimestamp;
		emit ProductListed(seller, product);
	}

	function placeOrder(
		string memory _buyerName,
		string memory _deliveryLocation,
		string memory _shippingMethod,
		uint _quantity,
		string memory _customInstructions,
		string memory _purchasedUpcharges
	) public payable validOrder {
		require(
			_quantity > 0 && _quantity <= product.quantity,
			"Invalid quantity"
		);
		uint totalPrice = calculateTotalPrice(_quantity, _purchasedUpcharges);
		require(msg.value >= totalPrice, "Insufficient payment");

		orders[msg.sender] = Order({
			buyer: msg.sender,
			buyerName: _buyerName,
			deliveryLocation: _deliveryLocation,
			shippingMethod: _shippingMethod,
			quantity: _quantity,
			customInstructions: _customInstructions,
			purchasedUpcharges: _purchasedUpcharges,
			totalPrice: totalPrice,
			isCompleted: false,
			receiptImageURL: ""
		});

		buyers.push(msg.sender);
		totalOrders += 1;
		product.quantity -= _quantity;

		emit OrderPlaced(msg.sender, orders[msg.sender]);
	}

	function completeOrder(
		address _buyer,
		string memory _receiptImageURL
	) public onlySeller {
		require(orders[_buyer].buyer != address(0), "Order does not exist");
		orders[_buyer].isCompleted = true;
		orders[_buyer].receiptImageURL = _receiptImageURL;

		emit OrderCompleted(_buyer, orders[_buyer]);
	}

	function calculateTotalPrice(
		uint _quantity,
		string memory _purchasedUpcharges
	) internal view returns (uint) {
		uint totalPrice = _quantity * productPrice;
		// Add upcharge price logic here (e.g., each upcharge costs 0.01 ETH)
		if (bytes(_purchasedUpcharges).length > 0) {
			totalPrice += 0.01 ether;
		}
		return totalPrice;
	}

	function getOrder(address _buyer) public view returns (Order memory) {
		return orders[_buyer];
	}

	function withdraw() public onlySeller {
		require(totalOrders > 0, "No orders placed");
		bool allOrdersCompleted = true;

		for (uint i = 0; i < buyers.length; i++) {
			if (!orders[buyers[i]].isCompleted) {
				allOrdersCompleted = false;
				break;
			}
		}

		require(
			allOrdersCompleted,
			"All orders must be completed before withdrawal"
		);
		payable(seller).transfer(address(this).balance);
	}

	function getContractInfo()
		public
		view
		returns (Product memory, address, uint)
	{
		return (product, seller, contractTimestamp);
	}
}
