// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./CommerceContract.sol";

contract CommerceFactory {
	address[] public commerceContracts;
	mapping(address => address) public contractToOwner;

	event CommerceContractDeployed(address contractAddress);

	function createCommerceContract(
		string memory _title,
		string memory _description,
		uint32 _price,
		uint32 _quantity,
		string memory _formSelectionType,
		string memory _image
	) public {
		CommerceContract newContract = new CommerceContract();
		newContract.initialize(
			msg.sender,
			_title,
			_description,
			_price,
			_quantity,
			_formSelectionType,
			_image
		);
		commerceContracts.push(address(newContract));
		contractToOwner[address(newContract)] = msg.sender;
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

	function getProductData(
		address contractAddress
	) public view returns (CommerceContract.ProductData memory) {
		CommerceContract contractInstance = CommerceContract(contractAddress);
		return contractInstance.getProductData();
	}
}
