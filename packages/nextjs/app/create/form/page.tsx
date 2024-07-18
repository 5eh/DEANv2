"use client";

import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { NATIVE_TOKEN } from "../../../../../configuration/company";
import { useGlobalState } from "~~/services/store/store";
import Image from "next/image";

interface FormData {
  title: string;
  description: string;
  price: number;
  photo?: string;
  location: string;
  quantityOfService: number;
  category: string;
  features: string[];
  upcharges: { upcharge: string; value: string }[];
  shippingMethod: string;
}

const Form: React.FC = () => {
  const searchParams = useSearchParams() || new URLSearchParams();
  const category = searchParams.get("id") || "";
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract("CommerceContract");
  const nativeCurrencyPrice = useGlobalState(state => state.nativeCurrency.price);
  const [showInUSD, setShowInUSD] = useState(true);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    price: 0,
    photo: "",
    location: "",
    quantityOfService: 1,
    category: category,
    features: [""],
    upcharges: [{ upcharge: "", value: "" }],
    shippingMethod: "",
  });

  useEffect(() => {
    setFormData(prevData => ({
      ...prevData,
      category: category,
    }));
  }, [category]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
    setFormData({
      ...formData,
      location: `${event.target.value}, ${state}`,
    });
  };

  const handleStateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(event.target.value);
    setFormData({
      ...formData,
      location: `${city}, ${event.target.value}`,
    });
  };

  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = formData.features.map((item, i) => (i === index ? value : item));
    setFormData({ ...formData, features: updatedFeatures });
  };

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ""] });
  };

  const deleteFeature = (index: number) => {
    const updatedFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: updatedFeatures });
  };

  const addUpcharge = () => {
    setFormData({ ...formData, upcharges: [...formData.upcharges, { upcharge: "", value: "" }] });
  };

  const deleteUpcharge = (index: number) => {
    const newUpcharges = [...formData.upcharges];
    newUpcharges.splice(index, 1);
    setFormData({ ...formData, upcharges: newUpcharges });
  };

  const updateUpchargeValue = (index: number, value: string, field: "upcharge" | "value") => {
    const updatedValue = field === "value" ? value : value;
    const updatedUpcharges = formData.upcharges.map((item, i) =>
      i === index ? { ...item, [field]: updatedValue } : item,
    );
    setFormData({ ...formData, upcharges: updatedUpcharges });
  };

  const toggleCurrency = () => {
    setShowInUSD(!showInUSD);
  };

  const fileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const form = new FormData();
    form.append("image", file);

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=94d67511d33d7f7cdd49759c1bbb4a8d`, {
        method: "POST",
        body: form,
      });
      const data = await response.json();
      setFormData({ ...formData, photo: data.data.url });
      setPreviewImage(data.data.url); // Set preview image
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.description || !formData.price || !formData.quantityOfService) {
      console.error("Title, description, price, and quantity of service are required.");
      return;
    }

    try {
      const timestamp = Date.now();
      const uniqueComponent = Math.floor(Math.random() * 1000000);
      const listingID = `listing-${timestamp}-${uniqueComponent}`;

      console.log(listingID);

      // Ethereum specific
      const priceInNativeToken = showInUSD ? formData.price / nativeCurrencyPrice : formData.price;
      const priceInWei = BigInt(Math.round(priceInNativeToken * 10 ** 18)); // Convert to smallest unit (wei for ETH)

      const args = [
        formData.title,
        formData.description,
        formData.photo || "", // photo is optional,
        formData.location,
        formData.shippingMethod,
        formData.upcharges.map(upcharge => upcharge.upcharge).join(", "),
        formData.category,
        priceInWei,
        BigInt(formData.quantityOfService),
        BigInt(30 * 24 * 60 * 60), // Assuming validity time is 30 days in seconds
        listingID,
      ];

      await writeYourContractAsync({
        functionName: "createProduct",
        args: args,
        overrides: {
          gasLimit: 300000, // Adjust gas limit as needed
        },
      });
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className="x-6 lg:px-8">
      <div className="mt-12">
        <h1 className="text-4xl font-semibold code"> CREATE YOUR LISTING </h1>
      </div>
      <form className="">
        <div className="space-y-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12">
          <div className="border-b border-white/10 pb-12">
            <div className="mt-10 gap-x-6 gap-y-8">
              <div className="sm:col-span-4">
                <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                  TITLE
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    autoComplete="title"
                    className="text-left border-b border-gray-900 dark:border-gray-200/20 w-full bg-gray-500/20 py-2 px-3 text-sm leading-6 text-gray-800 dark:text-gray-300 focus:bg-gray-700/20 focus:border-primary/40 hover:border-primary/60 focus:outline-none"
                    placeholder="Monstera Deliciosa"
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-span-full">
                <label htmlFor="description" className="block text-sm font-medium leading-6 mt-12">
                  DESCRIPTION
                </label>
                <p className="mt-1 text-sm leading-6 text-gray-400">
                  Write a few sentences about the service you&apos;re providing.
                </p>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="text-left border border-gray-200/20 w-full bg-gray-500/20 py-2 px-3 text-sm leading-6 text-gray-800 dark:text-gray-300 focus:bg-gray-700/20 focus:border-primary/40 hover:border-primary/60 focus:outline-none"
                  placeholder="This tropical plant is known for its unique, hole-punched leaves and low maintenance requirements. Ideal for indoor spaces as it thrives in indirect light and requires watering only once a week."
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              {/* <div className="col-span-full flex justify-center">
                <input type="file" className="file-input file-input-bordered w-full max-w-xs mt-4 mb-4" />
              </div> */}
              <label
                htmlFor="photo"
                className="block text-sm font-medium leading-6 mt-12 text-gray-900 dark:text-white"
              >
                INSERT PHOTO
              </label>
              <div className="flex justify-center items-center w-full mt-8 gap-x-1 relative">
                <div className="w-full border border-transparent border-t-black dark:border-t-white pt-1" />{" "}
                <input
                  type="file"
                  id="input_img"
                  onChange={fileChange}
                  className="px-4 lg:mt-8 lg:mb-8 py-2 border dark:border-white border-black bg-gray-300/10 dark:bg-gray-300/10 dark:text-white w-3/4 hover:ring-2 hover:ring-primary/50 "
                />
                <div className="w-full border border-transparent border-t-black dark:border-t-white pt-1" />
              </div>

              {/* PREVIEW */}

              {previewImage && (
                <div className="grid lg:grid-cols-8 lg:grid-rows-1 sm:col-span-3">
                  <div className="lg:col-span-2 lg:col-start-4 sm:col-span-3 sm:col-start-2">
                    <div className="hover:cursor-pointer">
                      <div className="relative  sm:h-[75px] md:h-[150px] lg:h-[275px] overflow-hidden border dark:border-gray-500 border-black dark:bg-gray-300/10">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Image
                            src={previewImage}
                            alt={previewImage}
                            layout="fill"
                            objectFit="cover"
                            className="filter blur-xl"
                            style={{ objectPosition: "center top" }}
                          />
                        </div>
                        <div className="relative flex items-center justify-center w-full h-full">
                          <Image
                            src={previewImage}
                            alt={previewImage}
                            width={600}
                            height={400}
                            className="w-full h-auto object-cover dark:border border-gray-800 border-b-transparent dark:border-b-transparent dark:border-gray-200/20"
                          />
                        </div>
                      </div>
                      <div className="p-3 dark:border-gray-200/20 border-gray-800 border dark:border h-24 dark:bg-gray-200/5 dark:border-t-transparent">
                        <div className="flex gap-3 items-center justify-between">
                          <span className="text-lg font-bold dark:text-gray-200">{formData.price}</span>
                          <span className="font-thin dark:text-gray-400">{formData.price}</span>
                        </div>
                        <div className="mt-0 mb-0">
                          <span className="block">{formData.title}</span>
                          <span className="block">{formData.description}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="sm:col-span-3">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 mt-12 text-gray-900 dark:text-white"
                >
                  TOTAL PRICE
                </label>

                <div className="mt-2 flex items-center">
                  <div className="relative w-full ">
                    <div
                      className="absolute inset-y-0 left-0 flex items-center hover:cursor-pointer"
                      onClick={toggleCurrency}
                    >
                      <span className="text-gray-200 ml-2 text-md font-semibold">
                        {showInUSD ? "USD" : NATIVE_TOKEN}
                      </span>
                    </div>
                    <div>
                      <input
                        type="number"
                        name="price"
                        id="price"
                        className="text-left border-b border-gray-900 dark:border-gray-200/20 w-full bg-gray-500/20 py-2 pl-12 pr-12 text-md leading-6 text-gray-800 dark:text-gray-300 focus:bg-gray-700/20 focus:border-primary/40 hover:border-primary/60 focus:outline-none"
                        placeholder={showInUSD ? "249" : `${(249 / nativeCurrencyPrice).toFixed(6)}`}
                        value={formData.price}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="absolute inset-y-0 right-0  flex items-center pointer-events-none">
                      <span className="text-gray-600 mr-2">
                        {showInUSD
                          ? `${(formData.price / nativeCurrencyPrice).toFixed(6)} ${NATIVE_TOKEN}`
                          : `$${(formData.price * nativeCurrencyPrice).toFixed(2)}`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4 mt-12">
                <label
                  htmlFor="shippingMethod"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  SHIPPING METHOD
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="shippingMethod"
                    id="shippingMethod"
                    className="text-left border-b border-gray-900 dark:border-gray-200/20 w-full bg-gray-500/20 py-2 px-3 text-sm leading-6 text-gray-800 dark:text-gray-300 focus:bg-gray-700/20 focus:border-primary/40 hover:border-primary/60 focus:outline-none"
                    placeholder="Standard Shipping"
                    value={formData.shippingMethod}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="border-b border-white/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2 sm:col-start-1">
                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                  CITY
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="city"
                    id="city"
                    placeholder="Austin"
                    autoComplete="address-level2"
                    className="text-left border-b border-gray-900 dark:border-gray-200/20 w-full bg-gray-500/20 py-2 px-3 text-sm leading-6 text-gray-800 dark:text-gray-300 focus:bg-gray-700/20 focus:border-primary/40 hover:border-primary/60 focus:outline-none"
                    value={formData.location.split(",")[0] || ""}
                    onChange={handleCityChange}
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                  STATE / PROVINCE
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="state"
                    id="state"
                    autoComplete="address-level1"
                    placeholder="Texas"
                    className="text-left border-b border-gray-900 dark:border-gray-200/20 w-full bg-gray-500/20 py-2 px-3 text-sm leading-6 text-gray-800 dark:text-gray-300 focus:bg-gray-700/20 focus:border-primary/40 hover:border-primary/60 focus:outline-none"
                    value={(formData.location.split(",")[1] || "").trim()}
                    onChange={handleStateChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-full">
            <label htmlFor="features" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
              FEATURES
            </label>
            {formData.features.map((feature, index) => (
              <div key={index} className="mt-2 flex items-center">
                <input
                  type="text"
                  name={`feature${index}`}
                  id={`feature${index}`}
                  autoComplete={`feature${index}`}
                  className="text-left border-b border-gray-900 dark:border-gray-200/20 w-full bg-gray-500/20 py-2 px-3 text-sm leading-6 text-gray-800 dark:text-gray-300 focus:bg-gray-700/20 focus:border-primary/40 hover:border-primary/60 focus:outline-none"
                  placeholder="Feature description"
                  value={feature}
                  onChange={e => handleFeatureChange(index, e.target.value)}
                />
                <button
                  type="button"
                  className="ml-2 text-gray-900 dark:text-white dark:hover:text-primary/40"
                  onClick={() => deleteFeature(index)}
                >
                  Delete
                </button>
              </div>
            ))}
            <button type="button" className="mt-2 text-gray-900 dark:text-white" onClick={addFeature}>
              ADD FEATURE
            </button>
          </div>

          <div className="border-b border-white/10 pb-12">
            <div className="mt-10 grid grid-cols-1">
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-secondary dark:text-gray-400">
                  PREMIUM UPCHARGES TO THIS LISTING <span className="text-gray-800 dark:text-gray-500">(OPTIONAL)</span>
                </legend>
                <div className="mt-1 space-y-2">
                  {formData.upcharges.map((item, index) => (
                    <div key={index} className="relative flex gap-x-1 items-center">
                      <input
                        type="text"
                        value={item.upcharge}
                        onChange={e => updateUpchargeValue(index, e.target.value, "upcharge")}
                        className="text-left border border-gray-200/20 w-full bg-gray-500/20 py-2 px-3 text-sm leading-6 text-gray-300 focus:bg-gray-700/20 focus:border-primary/60 hover:border-primary/60 focus:outline-none"
                        placeholder="Extra product half off"
                      />
                      <div className="relative flex">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <span className="text-gray-300 sm:text-sm">{NATIVE_TOKEN}</span>
                        </div>
                        <input
                          type="number"
                          value={item.value}
                          onChange={e => updateUpchargeValue(index, e.target.value, "value")}
                          className="text-right border border-gray-200/20 bg-gray-500/20 py-2 px-3 text-sm leading-6 text-gray-300 focus:bg-gray-700/20 focus:border-primary/40 hover:border-primary/60 focus:outline-none"
                          placeholder=""
                        />
                        <button
                          type="button"
                          className="text-gray-900 dark:text-white dark:hover:text-primary/40"
                          onClick={() => deleteUpcharge(index)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                  <button type="button" className="text-gray-900 dark:text-white" onClick={addUpcharge}>
                    CREATE UPCHARGE
                  </button>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center gap-x-6 justify-center">
          <button
            type="button"
            className="border border-gray-200/20 bg-gray-500/20 hover:border-primary/60 text-right py-2 px-3 text-sm font-semibold text-gray-800 dark:text-gray-300 focus:bg-gray-700/20 focus:border-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/60"
            onClick={handleSubmit}
          >
            CREATE LISTING
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
