export default CommerceContractABI = [
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
      {
        internalType: "uint256",
        name: "_contractTimestamp",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        components: [
          {
            internalType: "address",
            name: "buyer",
            type: "address",
          },
          {
            internalType: "string",
            name: "buyerName",
            type: "string",
          },
          {
            internalType: "string",
            name: "deliveryLocation",
            type: "string",
          },
          {
            internalType: "string",
            name: "shippingMethod",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "quantity",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "customInstructions",
            type: "string",
          },
          {
            internalType: "string",
            name: "purchasedUpcharges",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "totalPrice",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isCompleted",
            type: "bool",
          },
          {
            internalType: "string",
            name: "receiptImageURL",
            type: "string",
          },
        ],
        indexed: false,
        internalType: "struct CommerceContract.Order",
        name: "order",
        type: "tuple",
      },
    ],
    name: "OrderCompleted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        components: [
          {
            internalType: "address",
            name: "buyer",
            type: "address",
          },
          {
            internalType: "string",
            name: "buyerName",
            type: "string",
          },
          {
            internalType: "string",
            name: "deliveryLocation",
            type: "string",
          },
          {
            internalType: "string",
            name: "shippingMethod",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "quantity",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "customInstructions",
            type: "string",
          },
          {
            internalType: "string",
            name: "purchasedUpcharges",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "totalPrice",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isCompleted",
            type: "bool",
          },
          {
            internalType: "string",
            name: "receiptImageURL",
            type: "string",
          },
        ],
        indexed: false,
        internalType: "struct CommerceContract.Order",
        name: "order",
        type: "tuple",
      },
    ],
    name: "OrderPlaced",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "seller",
        type: "address",
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
            name: "photoURL",
            type: "string",
          },
          {
            internalType: "string",
            name: "originsLocation",
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
            name: "sellerName",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "quantity",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "validityTime",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isAuthentic",
            type: "bool",
          },
        ],
        indexed: false,
        internalType: "struct CommerceContract.Product",
        name: "product",
        type: "tuple",
      },
    ],
    name: "ProductListed",
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
    name: "buyers",
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
        name: "_buyer",
        type: "address",
      },
      {
        internalType: "string",
        name: "_receiptImageURL",
        type: "string",
      },
    ],
    name: "completeOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "contractTimestamp",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getContractInfo",
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
            name: "photoURL",
            type: "string",
          },
          {
            internalType: "string",
            name: "originsLocation",
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
            name: "sellerName",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "quantity",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "validityTime",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isAuthentic",
            type: "bool",
          },
        ],
        internalType: "struct CommerceContract.Product",
        name: "",
        type: "tuple",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_buyer",
        type: "address",
      },
    ],
    name: "getOrder",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "buyer",
            type: "address",
          },
          {
            internalType: "string",
            name: "buyerName",
            type: "string",
          },
          {
            internalType: "string",
            name: "deliveryLocation",
            type: "string",
          },
          {
            internalType: "string",
            name: "shippingMethod",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "quantity",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "customInstructions",
            type: "string",
          },
          {
            internalType: "string",
            name: "purchasedUpcharges",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "totalPrice",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isCompleted",
            type: "bool",
          },
          {
            internalType: "string",
            name: "receiptImageURL",
            type: "string",
          },
        ],
        internalType: "struct CommerceContract.Order",
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
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "orders",
    outputs: [
      {
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        internalType: "string",
        name: "buyerName",
        type: "string",
      },
      {
        internalType: "string",
        name: "deliveryLocation",
        type: "string",
      },
      {
        internalType: "string",
        name: "shippingMethod",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "quantity",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "customInstructions",
        type: "string",
      },
      {
        internalType: "string",
        name: "purchasedUpcharges",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "totalPrice",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isCompleted",
        type: "bool",
      },
      {
        internalType: "string",
        name: "receiptImageURL",
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
        name: "_buyerName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_deliveryLocation",
        type: "string",
      },
      {
        internalType: "string",
        name: "_shippingMethod",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_quantity",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_customInstructions",
        type: "string",
      },
      {
        internalType: "string",
        name: "_purchasedUpcharges",
        type: "string",
      },
    ],
    name: "placeOrder",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "product",
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
        name: "photoURL",
        type: "string",
      },
      {
        internalType: "string",
        name: "originsLocation",
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
        name: "sellerName",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "quantity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "validityTime",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isAuthentic",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "productPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "seller",
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
    name: "totalOrders",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
