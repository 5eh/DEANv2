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
        const priceInUSD = (product.price / 100) * nativeCurrencyPrice;
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
                      : `${(product.price / 100).toFixed(3)} ${NATIVE_TOKEN}`}
                  </span>
                  <span className="font-thin dark:text-gray-400">
                    {showInUSD
                      ? `${(product.price / 100).toFixed(3)} ${NATIVE_TOKEN}`
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
                    <span className="text-right dark:text-gray-100/20 font-thin lowercase">{listingID}</span>
                  </div>
                </Popup.Title>
              }
            >
              <p className="pl-3 pr-3">
                {showInUSD ? `$${priceInUSD.toFixed(2)} USD` : `${(product.price / 100).toFixed(3)} ${NATIVE_TOKEN}`}
              </p>
              <p className="pl-3 pr-3">{product.title}</p>
              <p className="pl-3 pr-3">{product.description}</p>
              <p className="pl-3 pr-3">{product.photo}</p>
              <p className="pl-3 pr-3">{product.price}</p>
              <p className="pl-3 pr-3">{product.location}</p>
              <p className="pl-3 pr-3">{product.shippingMethod}</p>
              <p className="pl-3 pr-3">{product.upcharges}</p>
              <p className="pl-3 pr-3">{product.category}</p>
              <p className="pl-3 pr-3">{product.timeValidity}</p>
              <p className="pl-3 pr-3">{product.quantity}</p>
              <p className="pl-3 pr-3">{product.creatorWallet}</p>
              <p className="pl-3 pr-3">{listingID}</p>
            </Popup>
          </div>
        );
      })}
    </>
  );
}
