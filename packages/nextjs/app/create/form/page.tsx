"use client";

import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

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
  const serviceType = searchParams.get("title") || "";
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract("CommerceContract");
  const { address } = useAccount();

  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    price: 0,
    photo: "",
    location: "",
    quantityOfService: 1,
    category: serviceType,
    features: [""],
    upcharges: [{ upcharge: "", value: "" }],
    shippingMethod: "",
  });

  useEffect(() => {
    setFormData(prevData => ({
      ...prevData,
      category: serviceType,
    }));
  }, [serviceType]);

  // Handle form input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Combine City and State
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

  // Feature section
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

  // Upcharge section
  const addUpcharge = () => {
    setFormData({ ...formData, upcharges: [...formData.upcharges, { upcharge: "", value: "" }] });
  };

  const deleteUpcharge = (index: number) => {
    const newUpcharges = [...formData.upcharges];
    newUpcharges.splice(index, 1);
    setFormData({ ...formData, upcharges: newUpcharges });
  };

  const updateUpchargeValue = (index: number, value: string, field: "upcharge" | "value") => {
    const updatedValue = field === "value" ? Number(value) : value;
    const updatedUpcharges = formData.upcharges.map((item, i) =>
      i === index ? { ...item, [field]: updatedValue } : item,
    );
    setFormData({ ...formData, upcharges: updatedUpcharges });
  };

  // Submit section
  const handleSubmit = async () => {
    if (!formData.title || !formData.description || !formData.price || !formData.quantityOfService) {
      console.error("Title, description, price, and quantity of service are required.");
      return;
    }

    try {
      const args = [
        Date.now(), // Unique product ID, you might want to use a better ID generation method
        formData.title,
        formData.description,
        formData.photo || "", // photo is optional
        formData.category,
        formData.location,
        formData.shippingMethod,
        Date.now(), // Timestamp from frontend
        formData.features,
        formData.upcharges.map(upcharge => [upcharge.upcharge, upcharge.value]),
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
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12">
      <form>
        <div className="space-y-12">
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
                <label htmlFor="description" className="block text-sm font-medium leading-6">
                  DESCRIPTION
                </label>
                <p className="mt-1 text-sm leading-6 text-gray-400">
                  Write a few sentences about the service you're providing.
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
              <div className="col-span-full flex justify-center">
                <input type="file" className="file-input file-input-bordered w-full max-w-xs mt-4 mb-4" />
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                  TOTAL PRICE
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="price"
                    id="price"
                    className="text-left border-b border-gray-900 dark:border-gray-200/20 w-full bg-gray-500/20 py-2 px-3 text-sm leading-6 text-gray-800 dark:text-gray-300 focus:bg-gray-700/20 focus:border-primary/40 hover:border-primary/60 focus:outline-none"
                    placeholder="$249"
                    value={formData.price}
                    onChange={handleInputChange}
                  />
                </div>
                <span> IN WEI </span>
              </div>

              <div className="sm:col-span-4">
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
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8">
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
                          <span className="text-gray-300 sm:text-sm">WEI</span>
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
