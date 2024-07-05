// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Commerce.sol";

contract CommerceFactory {
	struct ContractInfo {
		address contractAddress;
		string title;
		string description;
		uint timestamp;
	}

	ContractInfo[] public deployedContracts;

	event ContractDeployed(
		address contractAddress,
		string title,
		string description,
		uint timestamp
	);

	function createCommerceContract(
		string memory _title,
		string memory _description,
		string memory _photoURL,
		string memory _originsLocation,
		string memory _shippingMethod,
		string memory _upcharges,
		string memory _sellerName,
		uint _quantity,
		uint _validityTime,
		uint _productPrice
	) public {
		CommerceContract newContract = new CommerceContract(
			_title,
			_description,
			_photoURL,
			_originsLocation,
			_shippingMethod,
			_upcharges,
			_sellerName,
			_quantity,
			_validityTime,
			_productPrice,
			block.timestamp
		);
		deployedContracts.push(
			ContractInfo({
				contractAddress: address(newContract),
				title: _title,
				description: _description,
				timestamp: block.timestamp
			})
		);
		emit ContractDeployed(
			address(newContract),
			_title,
			_description,
			block.timestamp
		);
	}

	function getDeployedContracts()
		public
		view
		returns (ContractInfo[] memory)
	{
		return deployedContracts;
	}
}
