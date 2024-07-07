/**
 * This file is autogenerated by Scaffold-ETH.
 * You should not edit it manually or your changes might be overwritten.
 */
import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

const deployedContracts = {
  336: {
    CommerceFactory: {
      address: "0xe4c1fEC9e27c6d4EA0CC33D3a8C3a8E8770E1BA6",
      abi: [
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "contractAddress",
              type: "address",
            },
          ],
          name: "CommerceContractDeployed",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "commerceContracts",
          outputs: [
            {
              internalType: "contract CommerceContract",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_title",
              type: "string",
            },
            {
              internalType: "string",
              name: "_description",
              type: "string",
            },
            {
              internalType: "string",
              name: "_photoURL",
              type: "string",
            },
            {
              internalType: "string",
              name: "_originsLocation",
              type: "string",
            },
            {
              internalType: "string",
              name: "_shippingMethod",
              type: "string",
            },
            {
              internalType: "string",
              name: "_upcharges",
              type: "string",
            },
            {
              internalType: "string",
              name: "_sellerName",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "_quantity",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "_validityTime",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "_productPrice",
              type: "uint256",
            },
          ],
          name: "createCommerceContract",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "index",
              type: "uint256",
            },
          ],
          name: "getCommerceContractAddress",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getCommerceContracts",
          outputs: [
            {
              internalType: "contract CommerceContract[]",
              name: "",
              type: "address[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      inheritedFunctions: {},
    },
  },
  31337: {
    CommerceFactory: {
      address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      abi: [
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "contractAddress",
              type: "address",
            },
          ],
          name: "CommerceContractDeployed",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "commerceContracts",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "contractToOwner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_title",
              type: "string",
            },
            {
              internalType: "string",
              name: "_description",
              type: "string",
            },
            {
              internalType: "uint32",
              name: "_price",
              type: "uint32",
            },
            {
              internalType: "uint32",
              name: "_quantity",
              type: "uint32",
            },
            {
              internalType: "string",
              name: "_formSelectionType",
              type: "string",
            },
            {
              internalType: "string",
              name: "_image",
              type: "string",
            },
          ],
          name: "createCommerceContract",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "index",
              type: "uint256",
            },
          ],
          name: "getCommerceContractAddress",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getCommerceContracts",
          outputs: [
            {
              internalType: "address[]",
              name: "",
              type: "address[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "contractAddress",
              type: "address",
            },
          ],
          name: "getProductData",
          outputs: [
            {
              components: [
                {
                  internalType: "string",
                  name: "title",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "description",
                  type: "string",
                },
                {
                  internalType: "uint32",
                  name: "price",
                  type: "uint32",
                },
                {
                  internalType: "uint32",
                  name: "quantity",
                  type: "uint32",
                },
                {
                  internalType: "string",
                  name: "formSelectionType",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "image",
                  type: "string",
                },
                {
                  internalType: "address payable",
                  name: "creatorWallet",
                  type: "address",
                },
                {
                  internalType: "bool",
                  name: "isDelivered",
                  type: "bool",
                },
              ],
              internalType: "struct CommerceContract.ProductData",
              name: "",
              type: "tuple",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      inheritedFunctions: {},
    },
  },
} as const;

export default deployedContracts satisfies GenericContractsDeclaration;
