"use client";

import Image from "next/image";
import Link from "next/link";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

export default function Listings() {
  const { data: allListings } = useScaffoldReadContract({
    contractName: "CommerceContract",
    functionName: "getAllProductData",
  });

  if (!allListings) {
    return <p>Loading listings...</p>;
  }

  const [listingIDs, productDataArray] = allListings;

  return (
    <>
      {listingIDs.map((listingID, index) => {
        const product = productDataArray[index];
        return (
          <div key={listingID} className="col-span-1">
            <Link href={`/listing/${listingID}`}>
              <div className=" dark:border-gray-500 border-black dark:bg-gray-300/10 h-[275px]">
                <div className="relative w-full h-full overflow-hidden">
                  <div className="absolute inset-0 w-full h-full dark:bg-black/50 backdrop-blur-xl">
                    <Image
                      src={product.photo}
                      alt={product.title}
                      layout="fill"
                      objectFit="contain"
                      className="dark:border dark:border-gray-200/20 rounded-t-lg"
                    />
                  </div>
                </div>
              </div>
              <div className="p-3 dark:border-gray-200/20 dark:border h-24 dark:bg-gray-200/5 dark:border-t-transparent">
                <div className="flex gap-3 items-center justify-between">
                  <span className="text-lg font-bold dark:text-gray-200">{(product.price / 100).toFixed(3)} MOVE</span>
                  <span className="font-thin dark:text-gray-400 ">${product.price / 100} USD</span>
                </div>
                <div className="mt-0 mb-0">
                  <span className="block">{product.title}</span>
                  <span className="mt-2 text-gray-500 ">{product.location}</span>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </>
  );
}
