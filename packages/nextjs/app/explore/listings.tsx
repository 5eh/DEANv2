"use client";

import Image from "next/image";
import { useState } from "react";
import Popup from "~~/components/Popup";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { NATIVE_TOKEN } from "../../../../configuration/company";
import { useGlobalState } from "~~/services/store/store";

export default function Listings({ showInUSD, searchInput, selectedCategory }) {
  const nativeCurrencyPrice = useGlobalState(state => state.nativeCurrency.price);
  const [openPopup, setOpenPopup] = useState({});

  const { data: allListings } = useScaffoldReadContract({
    contractName: "CommerceContract",
    functionName: "getAllProductData",
  });

  if (!allListings) {
    return <p>Loading listings...</p>;
  }

  const [listingIDs, productDataArray] = allListings;

  const togglePopup = listingID => {
    setOpenPopup(prevState => ({
      ...prevState,
      [listingID]: !prevState[listingID],
    }));
  };

  const filteredListings = listingIDs.filter((listingID, index) => {
    const product = productDataArray[index];
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesSearch = searchInput ? product.title.toLowerCase().includes(searchInput.toLowerCase()) : true;
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {filteredListings.map((listingID, index) => {
        const product = productDataArray[index];
        const priceInUSD = Number(product.price);
        return (
          <div key={listingID} className="col-span-1">
            <div onClick={() => togglePopup(listingID)} className="hover:cursor-pointer">
              <div className="relative  sm:h-[75px] md:h-[150px] lg:h-[275px] overflow-hidden border dark:border-gray-500 border-black dark:bg-gray-300/10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src={product.photo}
                    alt={product.title}
                    layout="fill"
                    objectFit="cover"
                    className="filter blur-xl"
                    style={{ objectPosition: "center top" }}
                  />
                </div>
                <div className="relative flex items-center justify-center w-full h-full">
                  <Image
                    src={product.photo}
                    alt={product.title}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover dark:border border-gray-800 border-b-transparent dark:border-b-transparent dark:border-gray-200/20"
                  />
                </div>
              </div>
              <div className="p-3 dark:border-gray-200/20 border-gray-800 border dark:border h-24 dark:bg-gray-200/5 dark:border-t-transparent">
                <div className="flex gap-3 items-center justify-between">
                  <span className="text-lg font-bold dark:text-gray-200">
                    {showInUSD
                      ? `$${priceInUSD.toFixed(2)} USD`
                      : `${(Number(product.price) / 100).toFixed(8)} ${NATIVE_TOKEN}`}
                  </span>
                  <span className="font-thin dark:text-gray-400">
                    {showInUSD
                      ? `${(Number(product.price) / 100).toFixed(3)} ${NATIVE_TOKEN}`
                      : `$${priceInUSD.toFixed(2)} USD`}
                  </span>
                </div>
                <div className="mt-0 mb-0">
                  <span className="block">{product.title}</span>
                  <span className="mt-2 text-gray-500">{product.location}</span>
                </div>
              </div>
            </div>

            <Popup
              isOpen={openPopup[listingID]}
              onClose={() => togglePopup(listingID)}
              className="xl:w-3/5 min-h-64 max-w-full max-h-full"
              title={
                <Popup.Title className="pl-3 pr-3 uppercase ">
                  <div className="flex w-full justify-between">
                    <span className="text-left code">{product.title}</span>
                    <span className="text-right dark:text-gray-100/50 font-thin lowercase">{listingID}</span>
                  </div>
                </Popup.Title>
              }
            >
              <div className="grid grid-cols-5 grid-rows-5 gap-4 m-4">
                <div className="col-span-2 border border-red-400">
                  <p className="pl-3 pr-3">{product.category}</p>
                </div>

                <div className="col-span-2 col-start-1 row-start-2 border border-red-400">
                  <p className="pl-3 pr-3">
                    {showInUSD
                      ? `$${priceInUSD.toFixed(2)} USD`
                      : `${(Number(product.price) / 100).toFixed(3)} ${NATIVE_TOKEN}`}
                  </p>

                  <p className="pl-3 pr-3">{product.location}</p>
                </div>
                <div className="col-span-2 row-span-5 col-start-4 row-start-1 border border-red-400">
                  <p className="pl-3 pr-3">{product.photo}</p>
                </div>
                <div className="col-start-3 row-start-1 border border-red-400">
                  Valid until
                  <p className="pl-3 pr-3">{product.quantity}</p>
                </div>

                <div className="col-start-3 row-start-2 border border-red-400">
                  {" "}
                  <p className="pl-3 pr-3">{product.shippingMethod}</p>
                </div>
                <div className="col-start-3 row-start-3 border border-red-400">
                  <p className="pl-3 pr-3">{product.upcharges} UPCHARGES</p>
                </div>
                <div className="col-start-3 row-start-4 border border-red-400">
                  <p className="pl-3 pr-3">{product.upcharges} FEATURES</p>
                </div>
                <div className="col-start-3 row-start-5 border border-red-400">
                  {" "}
                  <p className="pl-3 pr-3">{product.creatorWallet}</p>
                  View Etherscan
                </div>
                <div className="col-span-2 row-span-3 col-start-1 row-start-3 border border-red-400">
                  <p className="pl-3 pr-3">{product.description}</p>
                </div>
              </div>

              <div className="flex justify-center items-center w-full mt-8 gap-x-1 relative">
                <div className="w-full border border-transparent border-t-black dark:border-t-primary pt-1" />{" "}
                <div className="text-center w-1/2">
                  {" "}
                  <p>ABOUT SELLER </p>{" "}
                </div>
                <div className="w-full border border-transparent border-t-black dark:border-t-primary pt-1" />{" "}
              </div>

              <div className="grid grid-cols-5 grid-rows-2 gap-4 m-4">
                <div className="h-64 row-span-2 border border-white">Avatar</div>
                <div className=" col-span-2 border border-white">Name & ratings</div>
                <div className="col-start-4 border border-white">Location</div>
                <div className="col-start-5 border border-white">Reviews</div>
                <div className="col-span-2 col-start-2 row-start-2 border border-white">Description (or badges)?</div>
                <div className="col-start-4 row-start-2 border border-white">Badges</div>
                <div className="col-start-5 row-start-2 border border-white">View full profile button</div>
              </div>
            </Popup>
          </div>
        );
      })}
    </>
  );
}
