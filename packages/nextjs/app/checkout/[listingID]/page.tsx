"use client";

import { useParams } from "next/navigation";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { useEffect, useState } from "react";
import { Popover, PopoverBackdrop, PopoverButton, PopoverPanel } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { NATIVE_TOKEN } from "../../../../../configuration/company";

export default function Checkout() {
  const { listingID } = useParams();
  const [product, setProduct] = useState(null);

  const { data: allListings } = useScaffoldReadContract({
    contractName: "CommerceContract",
    functionName: "getAllProductData",
  });

  useEffect(() => {
    if (listingID && allListings) {
      const [listingIDs, productDataArray] = allListings;
      const listingIndex = listingIDs.indexOf(listingID);
      if (listingIndex !== -1) {
        setProduct(productDataArray[listingIndex]);
        console.log("Listing Data:", productDataArray[listingIndex]);
      } else {
        console.log("Listing not found.");
      }
    }
  }, [listingID, allListings]);

  if (!listingID) {
    return <p>Loading...</p>;
  }

  if (!allListings) {
    return <p>Loading listing data...</p>;
  }

  if (!product) {
    return <p>Listing not found.</p>;
  }

  return (
    <div className="px-6 lg:px-8">
      <div className="mt-12">
        <h1 className="text-4xl font-semibold code"> {product.title} </h1>
      </div>

      <div className="space-y-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12">
        <img src={product.photo} alt={product.title} />
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p>
          Price: {(Number(product.price) / 10 ** 18).toFixed(8)}{" "}
          <span className="code text-primary"> {NATIVE_TOKEN} </span>
        </p>
        <p>Category: {product.category}</p>
        <p>Location: {product.location}</p>
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 xl:gap-x-48">
        <h1 className="sr-only">Order information</h1>

        <section
          aria-labelledby="summary-heading"
          className="px-4 pb-10 pt-16 sm:px-6 lg:col-start-2 lg:row-start-1 lg:px-0 lg:pb-16"
        >
          <div className="mx-auto max-w-lg lg:max-w-none">
            <h2 id="summary-heading" className="text-lg font-medium text-white">
              Order summary
            </h2>

            <dl className="hidden space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-white lg:block">
              <div className="flex items-center justify-between">
                <dt className="text-gray-600">Subtotal</dt>
                <dd>
                  {(Number(product.price) / 10 ** 18).toFixed(8)}{" "}
                  <span className="code text-primary"> {NATIVE_TOKEN} </span>
                </dd>
              </div>

              <div className="flex items-center justify-between">
                <dt className="text-gray-600">Shipping</dt>
                <dd>$15.00</dd>
              </div>

              <div className="flex items-center justify-between">
                <dt className="text-gray-600">Taxes</dt>
                <dd>$26.80</dd>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                <dt className="text-base">Total</dt>
                <dd className="text-base">
                  {(Number(product.price) / 10 ** 18 + 41.8).toFixed(8)}{" "}
                  <span className="code text-primary"> {NATIVE_TOKEN} </span>
                </dd>
              </div>
            </dl>

            <Popover className="fixed inset-x-0 bottom-0 flex flex-col-reverse text-sm font-medium text-white lg:hidden">
              <div className="relative z-10 border-t border-gray-200 px-4 sm:px-6">
                <div className="mx-auto max-w-lg">
                  <PopoverButton className="flex w-full items-center py-6 font-medium">
                    <span className="mr-auto text-base">Total</span>
                    <span className="mr-2 text-base">
                      {(Number(product.price) / 10 ** 18 + 41.8).toFixed(8)}{" "}
                      <span className="code text-primary"> {NATIVE_TOKEN} </span>
                    </span>
                    <ChevronUpIcon aria-hidden="true" className="h-5 w-5 text-gray-500" />
                  </PopoverButton>
                </div>
              </div>

              <PopoverBackdrop
                transition
                className="fixed inset-0 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
              />

              <PopoverPanel
                transition
                className="relative transform px-4 py-6 transition duration-300 ease-in-out data-[closed]:translate-y-full sm:px-6"
              >
                <dl className="mx-auto max-w-lg space-y-6">
                  <div className="flex items-center justify-between">
                    <dt className="text-gray-600">Subtotal</dt>
                    <dd>
                      {(Number(product.price) / 10 ** 18).toFixed(8)}{" "}
                      <span className="code text-primary"> {NATIVE_TOKEN} </span>
                    </dd>
                  </div>

                  <div className="flex items-center justify-between">
                    <dt className="text-gray-600">Shipping</dt>
                    <dd>$15.00</dd>
                  </div>

                  <div className="flex items-center justify-between">
                    <dt className="text-gray-600">Taxes</dt>
                    <dd>$26.80</dd>
                  </div>
                </dl>
              </PopoverPanel>
            </Popover>
          </div>
        </section>

        <form className="px-4 pb-36 pt-16 sm:px-6 lg:col-start-1 lg:row-start-1 lg:px-0 lg:pb-16">
          <div className="mx-auto max-w-lg lg:max-w-none">
            <section aria-labelledby="shipping-heading" className="mt-10">
              <h2 id="shipping-heading" className="text-lg font-medium text-gray-300">
                Shipping address
              </h2>

              <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
                <div className="sm:col-span-3">
                  <label htmlFor="company" className="block text-sm font-medium text-white">
                    NAME
                  </label>
                  <div className="sm:col-span-4">
                    <div className="mt-2">
                      <input
                        type="text"
                        name="Name"
                        id="Name"
                        autoComplete="Name"
                        className="text-left border-b border-gray-900 dark:border-gray-200/20 w-full bg-gray-500/20 py-2 px-3 text-sm leading-6 text-gray-800 dark:text-gray-300 focus:bg-gray-700/20 focus:border-primary/40 hover:border-primary/60 focus:outline-none"
                        placeholder="Name or alias for delivery"
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="address" className="block text-sm font-medium text-white">
                    Address 1
                  </label>
                  <div className="sm:col-span-4">
                    <div className="mt-2">
                      <input
                        type="text"
                        name="address1"
                        id="address1"
                        autoComplete="address-line1"
                        className="text-left border-b border-gray-900 dark:border-gray-200/20 w-full bg-gray-500/20 py-2 px-3 text-sm leading-6 text-gray-800 dark:text-gray-300 focus:bg-gray-700/20 focus:border-primary/40 hover:border-primary/60 focus:outline-none"
                        placeholder="Address 1"
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="address2" className="block text-sm font-medium text-white">
                    Address 2
                  </label>
                  <div className="sm:col-span-4">
                    <div className="mt-2">
                      <input
                        type="text"
                        name="address2"
                        id="address2"
                        autoComplete="address-line2"
                        className="text-left border-b border-gray-900 dark:border-gray-200/20 w-full bg-gray-500/20 py-2 px-3 text-sm leading-6 text-gray-800 dark:text-gray-300 focus:bg-gray-700/20 focus:border-primary/40 hover:border-primary/60 focus:outline-none"
                        placeholder="Apartment, suite, house number"
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="country" className="block text-sm font-medium text-white">
                    Country
                  </label>
                  <div className="sm:col-span-4">
                    <div className="mt-2">
                      <input
                        type="text"
                        name="country"
                        id="country"
                        autoComplete="country"
                        className="text-left border-b border-gray-900 dark:border-gray-200/20 w-full bg-gray-500/20 py-2 px-3 text-sm leading-6 text-gray-800 dark:text-gray-300 focus:bg-gray-700/20 focus:border-primary/40 hover:border-primary/60 focus:outline-none"
                        placeholder="Country"
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="state" className="block text-sm font-medium text-white">
                    State / Province
                  </label>
                  <div className="sm:col-span-4">
                    <div className="mt-2">
                      <input
                        type="text"
                        name="state"
                        id="state"
                        autoComplete="address-level1"
                        className="text-left border-b border-gray-900 dark:border-gray-200/20 w-full bg-gray-500/20 py-2 px-3 text-sm leading-6 text-gray-800 dark:text-gray-300 focus:bg-gray-700/20 focus:border-primary/40 hover:border-primary/60 focus:outline-none"
                        placeholder="State or Province"
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="postcode" className="block text-sm font-medium text-white">
                    Postcode
                  </label>
                  <div className="sm:col-span-4">
                    <div className="mt-2">
                      <input
                        type="text"
                        name="postcode"
                        id="postcode"
                        autoComplete="postal-code"
                        className="text-left border-b border-gray-900 dark:border-gray-200/20 w-full bg-gray-500/20 py-2 px-3 text-sm leading-6 text-gray-800 dark:text-gray-300 focus:bg-gray-700/20 focus:border-primary/40 hover:border-primary/60 focus:outline-none"
                        placeholder="Postcode"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="description" className="block text-sm font-medium leading-6 mt-12">
                    CUSTOM INSTRUCTIONS
                  </label>
                  <p className="mt-1 text-sm leading-6 text-gray-400">
                    Write a few sentences if you need to handle a custom delivery or handle specific instructions.
                  </p>
                  <textarea
                    id="instructions"
                    name="instructions"
                    rows={3}
                    className="text-left border border-gray-200/20 w-full bg-gray-500/20 py-2 px-3 text-sm leading-6 text-gray-800 dark:text-gray-300 focus:bg-gray-700/20 focus:border-primary/40 hover:border-primary/60 focus:outline-none"
                    placeholder="This tropical plant is known for its unique, hole-punched leaves and low maintenance requirements. Ideal for indoor spaces as it thrives in indirect light and requires watering only once a week."
                  />
                </div>
              </div>
            </section>

            <div className="mt-10 border-t border-gray-200 pt-6 sm:flex sm:items-center sm:justify-between">
              <button
                type="button"
                className="w-full rounded-md border border-primary/80 bg-primary/30 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-50 sm:order-last sm:ml-6 sm:w-auto"
              >
                PAY WITH VARA
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
