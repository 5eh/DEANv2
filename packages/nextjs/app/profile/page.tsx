"use client";

import {
  AcademicCapIcon,
  ComputerDesktopIcon,
  FaceSmileIcon,
  GlobeAsiaAustraliaIcon,
  LanguageIcon,
  MapPinIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Popup from "~~/components/Popup";

export default function Page() {
  const [editAboutSection, setEditAboutSection] = useState(false);

  const toggleEditAboutSection = () => {
    setEditAboutSection(!editAboutSection);
  };
  return (
    <>
      <div className="px-4 lg-px:12">
        {/* <div className="mt-12 w-12 h-12 flex items-center justify-center dark:bg-primary/20 dark:border-white bg-gray-200 border border-black">
          <PencilSquareIcon className="w-8 h-8 text-black dark:text-white" />
        </div> */}

        <div className="relative w-auto h-32 md:h-48 lg:h-96 border dark:border-gray-500 border-black rounded-lg">
          {/* Banner */}
          <Image
            src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            layout="fill"
            objectFit="cover"
            alt="Profile Banner"
            className="opacity-80 hover:opacity-100 transition hover:ease-in-out rounded-lg"
          />
          {/* Profile */}
          <div className="absolute bottom-0 transform lg:ml-24 mx-auto left-0 right-0 z-2 translate-y-1/2 w-24 h-24 md:w-32 md:h-32  lg:w-48 lg:h-48 border border-white bg-black rounded-sm">
            <Image
              src="https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              layout="fill"
              objectFit="cover"
              alt="Profile Picture"
              className="opacity-80 hover:opacity-100 transition hover:ease-in-out rounded-sm"
            />
          </div>
          {/* Review + Badges */}
        </div>

        <div className="lg:grid lg:grid-cols-4 pt-12 md:pt-8 lg:pt-4 gap-4">
          <div className="md:col-start-2 md:col-span-1 flex gap-4 justify-start">
            <Link href={`reviews/`}>
              <div className="border border-yellow-500 bg-yellow-500/20 pl-4 pr-4 pt-3 pb-3">12 REVIEWS</div>
            </Link>
            <Link href={`reviews/`}>
              <div className="border border-yellow-500 bg-yellow-500/20 pl-4 pr-4 pt-3 pb-3">4.5 STARS</div>
            </Link>
          </div>
          <div className="md:col-span-2 flex gap-3">
            <div className="border border-primary bg-primary/20 pl-4 pr-4 pt-3 pb-3">VERIFIED</div>
            <div className="border border-red-500 bg-red-500/20 pl-4 pr-4 pt-3 pb-3">EMAIL CONFIRMED</div>
            <div className="border border-green-500 bg-green/20 pl-4 pr-4 pt-3 pb-3">HIGHLY TRUSTED</div>
          </div>
        </div>

        {/* Needs attention section - create standalone component */}
        {/* <div ...  */}

        {/* Grid - About / Listings */}
        <div className="lg:grid lg:grid-cols-2 pt-24 md:pt-20 lg:pt-10 pl-4 pr-4 gap-4">
          <div className="h-fit border border-gray-500 dark:bg-gray-400/10 lg:rounded-md lg:cols-span-1 ml-2">
            {/* Array of information */}
            <div className="w-full border border-transparent border-b-gray-500 scroll-p-10 pl-4 pr-4 pt-1">
              <p className="code font-semibold">ABOUT YOU</p>
            </div>

            {/* About section content goes here */}
            <div className="pl-4 pr-4 ">
              <div className="w-full flex items-center gap-4 pb-1 relative">
                <div className="relative">
                  {/* Custom Icon */}
                  <div className="relative w-8 h-8 bg-primary/50 rounded-full flex items-center justify-center border border-primary">
                    <FaceSmileIcon className="w-4 h-4 text-white" />
                  </div>
                </div>
                <p className="">Hi, my name&apos;s John Doe!</p>
              </div>
              {/*  */}

              <div className="w-full flex items-center gap-4 pb-1 relative">
                <div className="relative">
                  {/* Custom Icon */}
                  <div className="relative w-8 h-8 bg-green-500/50 rounded-full flex items-center justify-center  border border-green-500">
                    <GlobeAsiaAustraliaIcon className="w-4 h-4 text-white" />
                  </div>
                </div>
                <p className="">I was raised in Sydney, Australia</p>
              </div>
              {/*  */}

              <div className="w-full flex items-center gap-4 pb-1 relative">
                <div className="relative">
                  {/* Custom Icon */}
                  <div className="relative w-8 h-8 bg-green-500/50 rounded-full flex items-center justify-center  border border-green-500">
                    <MapPinIcon className="w-4 h-4 text-white" />
                  </div>
                </div>
                <p className="">I currently live in San Francisco, Bay Area</p>
              </div>
              {/*  */}

              <div className="w-full flex items-center gap-4 pb-1 relative">
                <div className="relative">
                  {/* Custom Icon */}
                  <div className="relative w-8 h-8 bg-white rounded-full flex items-center justify-center  border border-black">
                    <LanguageIcon className="w-4 h-4 text-black" />
                  </div>
                </div>
                <p className="">I speak English, Spanish and Russian</p>
              </div>
              {/*  */}

              <div className="w-full flex items-center gap-4 pb-1 relative">
                <div className="relative">
                  {/* Custom Icon */}
                  <div className="relative w-8 h-8 bg-white rounded-full flex items-center justify-center  border border-black">
                    <ComputerDesktopIcon className="w-4 h-4 text-black" />
                  </div>
                </div>
                <p className="">My occupation is </p>
              </div>
              {/*  */}

              <div className="w-full flex items-center gap-4 pb-1 relative">
                <div className="relative">
                  {/* Custom Icon */}
                  <div className="relative w-8 h-8 bg-pink-500/50 rounded-full flex items-center justify-center  border border-pink-500">
                    <AcademicCapIcon className="w-4 h-4 text-white" />
                  </div>
                </div>
                <p className="">I recently completed education at </p>
              </div>
              {/*  */}
            </div>

            <div className="pl-4 pr-4 w-full flex justify-items-center pb-1 border border-transparent border-t-gray-500">
              <button className="w-full pt-1 code" onClick={toggleEditAboutSection}>
                EDIT
              </button>
              {/* Credit edit link modal popup function */}

              <Popup
                isOpen={editAboutSection}
                onClose={toggleEditAboutSection}
                className="min-w-96 min-h-64 max-w-full max-h-full"
                title={<Popup.Title className="pl-3 pr-3 uppercase code">Popup 1 Title</Popup.Title>}
              >
                <p className="pl-3 pr-3">This is the content of the first popup.</p>
                <p className="pl-3 pr-3">This is the content of the first popup.</p>

                <p className="pl-3 pr-3">This is the content of the first popup.</p>
              </Popup>
            </div>
          </div>

          <div className=" lg:cols-span-1 ">
            {/* Array of information */}
            <div className="border-gray-500 rounded-md border">
              <div className="h-fit w-full  scroll-p-10 pl-4 pr-4 pt-1">
                <p className="code font-semibold">YOUR ACTIVE LISTINGS</p>
              </div>
            </div>

            <div className="mt-4 mb-4 gap-8">
              {/* Map here */}
              <div className=" grid grid-cols-2 gap-4  mb-4 border border-gray-500 rounded-md hover:border-primary/80 transition hover:ease-in-out">
                {/* Texts Column */}
                <div className="ml-2">
                  <div className="grid grid-rows-4 pl-4 text-left mt-8">
                    <div className="row-span-1">
                      <span className="dark:text-gray-400 text-gray-700 code">12th Feb, 2024</span>
                      <p className="font-bold">Modernized Listing Image</p>
                    </div>

                    <div className="row-span-1 dark:text-gray-400 text-gray-700">
                      Fantastic description about a fantastic commerce product that is TRULY fantastic.
                    </div>
                  </div>
                  <div className="flex gap-4 row-span-1 w-full pl-4 pb-4 ">
                    <Link href="explore/listingID">
                      <div className=" bg-primary/30 border hover:bg-primary/60 border-primary/80 transition hover:border-primary/100 hover:ease-in-out">
                        <span className="borderp-2 pl-12 pr-12 pt-4 pb-4">VIEW</span>{" "}
                      </div>
                    </Link>
                    <Link href="edit/listing">
                      <div className="bg-gray-400/30 hover:bg-gray-200 hover:text-black border border-white/80 transition hover:border-white/100 hover:ease-in-out">
                        <span className="borderp-2 pl-12 pr-12 pt-4 pb-4">EDIT</span>{" "}
                      </div>
                    </Link>
                  </div>
                </div>
                {/* Image Column */}
                <div className="relative h-full w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    layout="fill"
                    objectFit="cover"
                    alt="Listing image"
                    className="opacity-80 rounded-r-md hover:opacity-100  transition hover:ease-in-out "
                  />
                </div>
              </div>
            </div>

            {/* <div className="pl-4 pr-4 w-full flex justify-items-center pb-1 border border-transparent border-t-gray-500">
              <button className="w-full pt-1 code">EDIT</button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
