"use client";

import Link from "next/link";
import React from "react";
import { FORM_SELECTION } from "../../../../configuration/form";

export default function Create() {
  const [customListing, setCustomListing] = React.useState("");
  return (
    <>
      <div className="x-6 lg:px-8">
        <div className="mt-12">
          <h1 className="text-4xl font-semibold code"> SELECT CATEGORY </h1>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr sm:grid-cols-2 md:grid-cols-3 gap-1 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-6">
          {FORM_SELECTION.map(service => (
            <article
              key={service.id}
              className="relative shadow-2xl isolate flex flex-col justify-end overflow-hidden hover:border-primary/90 border border-primary/20 hover:border-6 opacity-80 hover:opacity-100 transition hover:ease-in-out bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
            >
              <Link
                href={{
                  pathname: "/create/form",
                  query: {
                    id: service.id,
                    title: service.title,
                  },
                }}
              >
                <img src={service.imageUrl} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40 transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-0" />
                <div className="absolute inset-0 -z-10 bg-gradient-to-b from-gray-900 via-gray-900/10 transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-0" />

                <span className="mt-3 text-lg font-semibold leading-6  dark:text-white text-primary">
                  {service.title.toUpperCase()}
                </span>
              </Link>
            </article>
          ))}
        </div>
        <div className="mt-12">
          <h1 className="text-4xl font-semibold code"> CREATE CUSTOM LISTING </h1>
        </div>
        <div className="flex justify-center items-center w-full mt-8 gap-x-4 relative">
          <div className="w-full border border-transparent border-t-black dark:border-t-white pt-1" />{" "}
          <input
            type="text"
            value={customListing}
            onChange={e => setCustomListing(e.target.value)}
            placeholder="Blue bonnets"
            className="px-4 py-2 border dark:border-white border-black bg-gray-300/10 dark:bg-gray-300/10 dark:text-white w-3/4 hover:ring-2 hover:ring-primary/50 "
          />
          <button className="px-4 py-2 border dark:border-primary border-black bg-gray-300/10 dark:bg-gray-300/10 dark:text-white w-1/4 hover:ring-2 hover:ring-primary/50 ">
            {" "}
            Create{" "}
          </button>
          <div className="w-full border border-transparent border-t-black dark:border-t-white pt-1" />
        </div>
      </div>
    </>
  );
}
