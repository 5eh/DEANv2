"use client";

import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MARKETPLACE_DESCRIPTION, MARKETPLACE_TITLE } from "../../../configuration/company";
import { ChatBubbleLeftIcon, PlusIcon, UserIcon } from "@heroicons/react/20/solid";
import { Bars3Icon, BugAntIcon } from "@heroicons/react/24/outline";
import { ArrowUpCircleIcon, ComputerDesktopIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useOutsideClick } from "~~/hooks/scaffold-eth";

type HeaderMenuLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

export const menuLinks: HeaderMenuLink[] = [
  {
    label: "Explore",
    href: "/explore",
    icon: <MagnifyingGlassIcon className="h-4 w-4" />,
  },
  {
    label: "Create",
    href: "/create",
    icon: <PlusIcon className="h-4 w-4" />,
  },
  {
    label: "Transactions",
    href: "/blockexplorer",
    icon: <ComputerDesktopIcon className="h-4 w-4" />,
  },
  {
    label: "Profile",
    href: "/profile",
    icon: <UserIcon className="h-4 w-4" />,
  },
  {
    label: "Messages",
    href: "/messenger",
    icon: <ChatBubbleLeftIcon className="h-4 w-4" />,
  },
];

export const HeaderMenuLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {menuLinks.map(({ label, href, icon }) => {
        const isActive = pathname === href;
        return (
          <li key={href}>
            <Link
              href={href}
              passHref
              className={`${
                isActive ? "bg-secondary shadow-md" : ""
              } rounded-md pt-1 pb-1 pl-3 pr-3 min-w-fit w-fit border backdrop-blur-md transition hover:ease-in-out
              bg-secondary/40 hover:bg-secondary/50 border-secondary/60 hover:border-secondary/90
              dark:bg-primary/20 dark:hover:bg-primary/40 dark:border-primary dark:hover:border-primary/80 py-1.5 px-3 text-sm gap-2 grid grid-flow-col`}
            >
              {icon}
              <span>{label}</span>
            </Link>
          </li>
        );
      })}
    </>
  );
};

/**
 * Site header
 */
export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), []),
  );

  return (
    <>
      <div className="sticky lg:static top-0 navbar bg-base-100 min-h-0 flex-shrink-0 justify-between z-20 shadow-md shadow-secondary px-0 sm:px-2">
        <div className="navbar-start w-auto lg:w-1/2">
          <div className="lg:hidden dropdown" ref={burgerMenuRef}>
            <label
              tabIndex={0}
              className={`ml-1 btn btn-ghost ${isDrawerOpen ? "hover:bg-secondary" : "hover:bg-transparent"}`}
              onClick={() => {
                setIsDrawerOpen(prevIsOpenState => !prevIsOpenState);
              }}
            >
              <Bars3Icon className="h-1/2" />
            </label>
            {isDrawerOpen && (
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                onClick={() => {
                  setIsDrawerOpen(false);
                }}
              >
                <HeaderMenuLinks />
              </ul>
            )}
          </div>
          <Link href="/" passHref className="hidden lg:flex items-center gap-2 ml-4 mr-6 shrink-0">
            <div className="flex relative w-10 h-10">
              <Image alt="SE2 logo" className="cursor-pointer" fill src="/logo.svg" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold leading-tight">{MARKETPLACE_TITLE}</span>
              <span className="text-xs">{MARKETPLACE_DESCRIPTION}</span>
            </div>
          </Link>
        </div>
        <div className="flex justify-center w-full">
          <ul className="hidden lg:flex lg:flex-nowrap menu menu-horizontal px-1 gap-2">
            <HeaderMenuLinks />
          </ul>
        </div>
        <div className="navbar-end flex-grow mr-4">
          <RainbowKitCustomConnectButton />
          <FaucetButton />
        </div>
      </div>
    </>
  );
};
