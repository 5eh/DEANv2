/**
 * This file is autogenerated by Scaffold-ETH.
 * You should not edit it manually or your changes might be overwritten.
 */
import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

const deployedContracts = {
  30730: {
    CommerceContract: {
      address: "0x56698868abEA01CEa5AFf39c2BFDdFAB90f8F9D9",
      abi: [
        {
          inputs: [],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "user",
              type: "address",
            },
            {
              indexed: false,
              internalType: "string",
              name: "instructions",
              type: "string",
            },
          ],
          name: "CustomInstructionsUpdated",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "user",
              type: "address",
            },
            {
              indexed: false,
              internalType: "string",
              name: "deliveryAddress",
              type: "string",
            },
          ],
          name: "DeliveryAddressUpdated",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "string",
              name: "listingID",
              type: "string",
            },
            {
              indexed: false,
              internalType: "address",
              name: "owner",
              type: "address",
            },
          ],
          name: "DeliveryConfirmed",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "string",
              name: "listingID",
              type: "string",
            },
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
                  internalType: "string",
                  name: "photo",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "location",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "shippingMethod",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "upcharges",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "category",
                  type: "string",
                },
                {
                  internalType: "uint32",
                  name: "price",
                  type: "uint32",
                },
                {
                  internalType: "uint32",
                  name: "timeValidity",
                  type: "uint32",
                },
                {
                  internalType: "uint32",
                  name: "quantity",
                  type: "uint32",
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
              indexed: false,
              internalType: "struct CommerceContract.ProductData",
              name: "product",
              type: "tuple",
            },
          ],
          name: "ProductDataFetched",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "string",
              name: "listingID",
              type: "string",
            },
            {
              indexed: false,
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint32",
              name: "price",
              type: "uint32",
            },
            {
              indexed: false,
              internalType: "uint32",
              name: "quantity",
              type: "uint32",
            },
          ],
          name: "ProductListed",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "string",
              name: "listingID",
              type: "string",
            },
            {
              indexed: false,
              internalType: "address",
              name: "buyer",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint32",
              name: "quantity",
              type: "uint32",
            },
          ],
          name: "ProductPurchased",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_listingID",
              type: "string",
            },
          ],
          name: "confirmDelivery",
          outputs: [],
          stateMutability: "nonpayable",
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
              name: "_photo",
              type: "string",
            },
            {
              internalType: "string",
              name: "_location",
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
              name: "_category",
              type: "string",
            },
            {
              internalType: "uint32",
              name: "_price",
              type: "uint32",
            },
            {
              internalType: "uint32",
              name: "_timeValidity",
              type: "uint32",
            },
            {
              internalType: "uint32",
              name: "_quantity",
              type: "uint32",
            },
            {
              internalType: "string",
              name: "_listingID",
              type: "string",
            },
          ],
          name: "createProduct",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "getAllListings",
          outputs: [
            {
              internalType: "string[]",
              name: "",
              type: "string[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getAllProductData",
          outputs: [
            {
              internalType: "string[]",
              name: "",
              type: "string[]",
            },
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
                  internalType: "string",
                  name: "photo",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "location",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "shippingMethod",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "upcharges",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "category",
                  type: "string",
                },
                {
                  internalType: "uint32",
                  name: "price",
                  type: "uint32",
                },
                {
                  internalType: "uint32",
                  name: "timeValidity",
                  type: "uint32",
                },
                {
                  internalType: "uint32",
                  name: "quantity",
                  type: "uint32",
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
              internalType: "struct CommerceContract.ProductData[]",
              name: "",
              type: "tuple[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "user",
              type: "address",
            },
          ],
          name: "getCustomInstructions",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "user",
              type: "address",
            },
          ],
          name: "getDeliveryAddress",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "listingID",
              type: "string",
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
                  internalType: "string",
                  name: "photo",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "location",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "shippingMethod",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "upcharges",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "category",
                  type: "string",
                },
                {
                  internalType: "uint32",
                  name: "price",
                  type: "uint32",
                },
                {
                  internalType: "uint32",
                  name: "timeValidity",
                  type: "uint32",
                },
                {
                  internalType: "uint32",
                  name: "quantity",
                  type: "uint32",
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
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "listingsArray",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          name: "products",
          outputs: [
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
              internalType: "string",
              name: "photo",
              type: "string",
            },
            {
              internalType: "string",
              name: "location",
              type: "string",
            },
            {
              internalType: "string",
              name: "shippingMethod",
              type: "string",
            },
            {
              internalType: "string",
              name: "upcharges",
              type: "string",
            },
            {
              internalType: "string",
              name: "category",
              type: "string",
            },
            {
              internalType: "uint32",
              name: "price",
              type: "uint32",
            },
            {
              internalType: "uint32",
              name: "timeValidity",
              type: "uint32",
            },
            {
              internalType: "uint32",
              name: "quantity",
              type: "uint32",
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
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_listingID",
              type: "string",
            },
            {
              internalType: "uint32",
              name: "_quantity",
              type: "uint32",
            },
          ],
          name: "purchaseProduct",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_instructions",
              type: "string",
            },
          ],
          name: "setCustomInstructions",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_deliveryAddress",
              type: "string",
            },
          ],
          name: "setDeliveryAddress",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      inheritedFunctions: {},
    },
  },
} as const;

export default deployedContracts satisfies GenericContractsDeclaration;
