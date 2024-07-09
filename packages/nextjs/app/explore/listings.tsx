"use client";

import Link from "next/link";
import { useState } from "react";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

export default function Listings() {
  const [listing, listingData] = useState("listing-1720429255238-397564");

  const { data: allListings } = useScaffoldReadContract({
    contractName: "CommerceContract",
    functionName: "getAllListings",
  });

  const { data: result } = useScaffoldReadContract({
    contractName: "CommerceContract",
    functionName: "getProductData",
    args: [listing],
  });

  const array = allListings?.map(listing => {
    const getListing = useScaffoldReadContract({
      contractName: "CommerceContract",
      functionName: "getProductData",
      args: [getListing],
    });
    console.log(getListing);
  });

  console.log(array);

  return (
    <div>
      <Link href="/listing/1">
        <div className="border dark:border-gray-500 border-black dark:bg-gray-300/10 bg-black/10  h-[275px]"></div>
        <div className="p-1">
          <div className="flex gap-3 items-center">
            <span className="text-2xl dark:text-gray-200 ">$12</span>
            <span className="font-thin dark:text-gray-400">0.003 ETH</span>
          </div>
          <div className="mt-0 mb-0">
            <span className="block">Title</span>
            <span className="mt-2 text-gray-500 ">Nashville, TN</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
