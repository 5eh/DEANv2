"use client";

import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import Sorting from "./sorting";

const Page = () => {
  // const address = "0xdD747e22cf6A2E1903d2E8F2e2F0d515B9d1Ed9c";

  const { data: getAllContracts } = useScaffoldReadContract({
    contractName: "CommerceFactory",
    functionName: "getCommerceContracts",
  });

  // const { data: getListingData } = useScaffoldReadContract({
  //   contractName: "CommerceContract",
  //   functionName: "getProductData",
  //   args: [address],
  // });

  console.log("All available listings", getAllContracts);
  // console.log("Listing data of test1", getListingData);

  return (
    <div>
      <Sorting />
    </div>
  );
};

export default Page;
