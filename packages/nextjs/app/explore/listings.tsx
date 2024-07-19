"use client";

import Image from "next/image";
import { useState } from "react";
import Popup from "~~/components/Popup";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { COMPANY_DESCRIPTION, COMPANY_NAME, NATIVE_TOKEN } from "../../../../configuration/company";
import { useGlobalState } from "~~/services/store/store";
import Link from "next/link";
import { CheckIcon } from "@heroicons/react/24/solid";

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
              <div className="relative sm:h-[75px] md:h-[150px] lg:h-[275px] overflow-hidden border dark:border-gray-500 border-black dark:bg-gray-300/10">
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
                    layout="fill"
                    objectFit="contain"
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
              className="xl:w-3/5 min-h-64 max-w-full max-h-[80vh] overflow-y-auto relative"
              title={
                <Popup.Title className="pl-3 pr-3 uppercase">
                  <div className="flex w-full justify-between">
                    <span className="text-left code">{product.title}</span>
                    <span className="text-right dark:text-gray-100/50 font-thin lowercase">{product.category}</span>
                  </div>
                </Popup.Title>
              }
            >
              <div className="grid grid-cols-auto grid-rows-auto gap-2 m-4">
                <div className="col-span-2 row-span-2 border border-gray-800 h-fit">
                  <div className="p-4">
                    <span>{product.description}</span>
                  </div>
                </div>

                <div className="col-span-2 row-span-6 border border-gray-400 overflow-hidden">
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 flex items-center justify-center filter blur-xl">
                      <Image
                        src={product.photo}
                        alt={product.title}
                        layout="fill"
                        objectFit="cover"
                        className="object-center"
                      />
                    </div>
                    <div className="relative flex items-center justify-center w-full h-full">
                      <Image
                        src={product.photo}
                        alt={product.title}
                        layout="fill"
                        objectFit="contain"
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-2 flex gap-2">
                  <div className="grid grid-cols-2 gap-3 w-full">
                    <div className="border border-gray-700 w-full flex items-center gap-3 pl-4 pr-4">
                      <div className="relative w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500">
                        <CheckIcon className="w-4 h-6 text-white" />
                      </div>
                      <p>Feature 1</p>
                    </div>
                    <div className="border border-gray-700 w-full flex items-center gap-3 pl-4 pr-4">
                      <div className="relative w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500">
                        <CheckIcon className="w-4 h-6 text-white" />
                      </div>
                      <p>Feature 2</p>
                    </div>
                  </div>
                </div>

                <div className="col-span-2 row-span-2 border border-gray-600 border-dotted h-64">
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 flex items-center justify-center filter blur-xl">
                      <Image
                        src="https://plus.unsplash.com/premium_photo-1673137021181-ac1b77dda93a?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt={product.title}
                        layout="fill"
                        objectFit="cover"
                        className="object-center"
                      />
                    </div>
                    <div className="relative flex items-center justify-center w-full h-full">
                      <Image
                        src="https://plus.unsplash.com/premium_photo-1673137021181-ac1b77dda93a?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt={product.title}
                        layout="fill"
                        objectFit="cover"
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-2 border border-gray-400 h-fit pl-4 pr-4">
                  <p>Upcharge list</p>
                </div>

                <div className="col-span-2 border border-gray-400 h-fit pl-4 pr-4">
                  <p>Shipping Method List (dropdown)</p>
                </div>

                <div className="col-span-2 col-start-3 border border-primary/80 bg-primary/20 p-4">
                  <div className="flex gap-3 items-center justify-between">
                    <span className="text-lg font-bold dark:text-gray-200">
                      {showInUSD
                        ? `$${priceInUSD.toFixed(2)} USD`
                        : `${(Number(product.price) / 100).toFixed(3)} ${NATIVE_TOKEN}`}
                    </span>
                    <span className="font-thin dark:text-gray-400">
                      {showInUSD
                        ? `${(Number(product.price) / 100).toFixed(4)} ${NATIVE_TOKEN}`
                        : `$${priceInUSD.toFixed(2)} USD`}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center items-center w-full mt-2 gap-x-1 relative">
                <div className="w-full border border-transparent border-t-black dark:border-t-primary pt-1" />
                <div className="text-center w-1/2">
                  <p>ABOUT SELLER</p>
                </div>
                <div className="w-full border border-transparent border-t-black dark:border-t-primary pt-1" />
              </div>

              <div className="grid grid-cols-auto grid-rows-auto gap-4 m-4 w-fit">
                <div className="h-64 w-64 row-span-2 border border-white">Avatar</div>
                <div className="col-span-2 border border-white">
                  <div>
                    <span>{COMPANY_NAME} </span>
                  </div>
                  <div>
                    <span>4.8 / 10</span>
                  </div>

                  <div>
                    <span>24 ratings</span>
                  </div>
                </div>
                <div className="col-start-4 border border-white">Location</div>
                <div className="col-start-5 border border-white">Reviews</div>
                <div className="col-span-2 col-start-2 row-start-2 text-left max-w-48 ">{COMPANY_DESCRIPTION}</div>
                <div className="col-start-4 row-start-2 border border-white">Badges</div>
                <div className="col-start-5 row-start-2 border border-white">View full profile button</div>
              </div>

              <div className="flex justify-center items-center w-full mt-2 relative pl-4 pr-4 gap-4">
                <Link
                  href={`/message/${product.creatorWallet}`}
                  className="text-center w-1/2 bg-gray-600/20 border border-gray-600 hover:cursor-pointer"
                >
                  <p>MESSAGE {product.title.toUpperCase()}</p>
                </Link>
                <Link
                  href={`/checkout/${listingID}`}
                  className="text-center w-1/2 bg-green-400/20 border border-green-600"
                >
                  <p>CONTINUE TO CHECKOUT</p>
                </Link>
              </div>
            </Popup>
          </div>
        );
      })}
    </>
  );
}
