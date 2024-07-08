// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./CommerceContract.sol";

contract CommerceFactory {
	address[] public commerceContracts;

	event CommerceContractDeployed(address contractAddress);

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
		commerceContracts.push(address(newContract));
		emit CommerceContractDeployed(address(newContract));
	}

	function getCommerceContracts() public view returns (address[] memory) {
		return commerceContracts;
	}

	function getCommerceContractAddress(
		uint256 index
	) public view returns (address) {
		require(index < commerceContracts.length, "Index out of bounds");
		return commerceContracts[index];
	}
}
