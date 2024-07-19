import { useState } from "react";
import { FORM_SELECTION } from "../../../../configuration/form";
import Listings from "./listings";
import { useGlobalState } from "~~/services/store/store";
import { NATIVE_TOKEN } from "../../../../configuration/company";

export default function Sorting() {
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showInUSD, setShowInUSD] = useState(false);

  // const nativeCurrencyPrice = useGlobalState(state => state.nativeCurrency.price);

  const toggleCurrency = () => {
    setShowInUSD(!showInUSD);
  };

  const handleCategoryClick = categoryId => {
    if (categoryId === null) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryId);
    }
  };

  console.log(selectedCategory);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 grid-rows-5 w-screen h-screen">
      <div className="row-span-1 md:row-span-5 border border-transparent dark:border-r-white border-r-black text-left pt-8">
        <div
          onClick={() => handleCategoryClick(null)}
          className={`hover:bg-primary/10 pt-2 pb-2 transition hover:border-l-white/20 border-l-4 ${
            selectedCategory === null ? "border-l-white bg-primary/20" : "border-l-transparent"
          }`}
        >
          <button className="ml-8">All listings</button>
        </div>

        {FORM_SELECTION.map(category => (
          <div
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`hover:bg-primary/10 pt-2 pb-2 transition hover:border-l-white/20 border-l-4 ${
              selectedCategory === category.title ? "border-l-white bg-primary/20" : "border-l-transparent"
            }`}
          >
            <button className="ml-8">{category.title}</button>
          </div>
        ))}
      </div>
      <div className="md:col-span-3 lg:col-span-4 m-4">
        <div className="bg-secondary/20 border border-secondary h-fit mt-4 mb-4">
          <p className="p-4">This is the announcements section, maybe something small, maybe something useful</p>
        </div>
      </div>
      <div className="col-span-4 row-span-4 md:col-start-2 lg:col-start-2 row-start-2">
        <div className="flex justify-center items-center w-full relative">
          <div className="w-full flex justify-center items-center relative gap-3">
            <div className="w-full border border-transparent border-t-black dark:border-t-white pt-1" />
            <input
              type="text"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              placeholder="Search..."
              className="px-4 py-2 border dark:border-white border-black bg-gray-300/10 dark:bg-gray-300/10 dark:text-white w-2/3 hover:ring-2 hover:ring-primary/50"
            />

            <button
              onClick={toggleCurrency}
              className="px-4 w-fit py-2 border dark:border-white border-black bg-primary/20 dark:bg-primary/20 dark:text-white hover:ring-2 hover:ring-primary/50"
            >
              <span className="text-gray-700 dark:text-gray-300">{showInUSD ? `USD` : `${NATIVE_TOKEN}`}</span>
            </button>

            <div className="w-full border border-transparent border-t-black dark:border-t-white pt-1" />
          </div>
        </div>

        <div className="grid p-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-0">
          <Listings showInUSD={showInUSD} searchInput={searchInput} selectedCategory={selectedCategory} />
        </div>
      </div>
    </div>
  );
}
