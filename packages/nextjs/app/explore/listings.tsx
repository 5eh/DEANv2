"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

export default function Listings() {
  const [listingData, setListingData] = useState([]);

  const { data: allListings } = useScaffoldReadContract({
    contractName: "CommerceContract",
    functionName: "getAllListings",
  });

  useEffect(() => {
    if (allListings && allListings.length > 0) {
      fetchAllListingsData();
    }
  }, [allListings]);

  const fetchAllListingsData = async () => {
    const fetchedData = await Promise.all(
      allListings.map(async listingID => {
        const { data: listing } = await useScaffoldReadContract({
          contractName: "CommerceContract",
          functionName: "getProductData",
          args: [listingID],
        });
        return { listingID, ...listing };
      }),
    );
    setListingData(fetchedData);
    console.log(fetchedData);
  };

  console.log(listingData);

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
