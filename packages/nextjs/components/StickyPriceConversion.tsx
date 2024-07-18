import React, { useState } from "react";
import { useGlobalState } from "~~/services/store/store";
import { NATIVE_TOKEN } from "../../../configuration/company";

/**
 * Site footer
 */
export const StickyPriceConversion = () => {
  const nativeCurrencyPrice = useGlobalState(state => state.nativeCurrency.price);
  const [showInUSD, setShowInUSD] = useState(true);

  const toggleCurrency = () => {
    setShowInUSD(!showInUSD);
  };

  const equivalentEthForOneUSD = (1 / nativeCurrencyPrice).toFixed(6);

  return (
    <div className="min-h-0 py-5 px-1 mb-10 lg:mb-0 hover:cursor-crosshair">
      <div className="fixed items-center w-fit z-10 p-4 bottom-0 left-0">
        {nativeCurrencyPrice > 0 && (
          <div>
            <button
              onClick={toggleCurrency}
              className="min-w-fit flex items-center w-fit gap-3 pl-3 pr-3 rounded-md pt-1 pb-1 bg-primary/20 border border-primary hover:border-primary/80 transition hover:ease-in-out hover:bg-primary/40 hover:text-gray-100 dark:border-primary backdrop-blur-md"
            >
              <span className="text-gray-700 dark:text-gray-300">
                {showInUSD
                  ? `1 ${NATIVE_TOKEN} = ${nativeCurrencyPrice.toFixed(2)} USD`
                  : `1 USD = ${equivalentEthForOneUSD} ${NATIVE_TOKEN}`}
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
