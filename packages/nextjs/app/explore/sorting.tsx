import { useState } from "react";
import Listings from "./listings";
import { FORM_SELECTION } from "../../../../configuration/form";
import Link from "next/link";

export default function Sorting() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  console.log(selectedCategory, searchInput);

  return (
    <div className="grid grid-cols-5 grid-rows-5 w-screen h-screen">
      <div className="row-span-5 border code border-transparent dark:border-r-white border-r-black text-left pt-8">
        {FORM_SELECTION.map(category => (
          <div
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`hover:bg-primary/10 pt-2 pb-2 scroll-pb-20 transition hover:border-l-white/20 hover:ease-in-out border-l-4 ${
              selectedCategory === category.id ? "border-l-white bg-primary/20" : "border-l-transparent"
            }`}
          >
            <button className="ml-8">{category.title}</button>
          </div>
        ))}
      </div>
      <div className="col-span-4 col-h m-4">
        <div className="bg-secondary/20 border border-secondary h-fit mt-4 mb-4">
          <p className="p-4">This is the announcements section, maybe something small, maybe something useful</p>
        </div>
      </div>
      <div className="col-span-4 row-span-4 col-start-2 row-start-2">
        <div className="flex justify-center items-center w-full  relative">
          <div className="w-full flex justify-center items-center relative">
            <div className="w-full border border-transparent border-t-black dark:border-t-white pt-1" />
            <input
              type="text"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              placeholder="Search..."
              className="px-4 py-2 border dark:border-white border-black bg-gray-300/10 dark:bg-gray-300/10 dark:text-white w-2/3 hover:ring-2 hover:ring-primary/50"
            />
            <div className="w-full border border-transparent border-t-black dark:border-t-white pt-1" />
          </div>
        </div>
        <div className="grid p-4 grid-cols-4 gap-4 relative z-0">
          <div className="">
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
        </div>
      </div>
    </div>
  );
}
