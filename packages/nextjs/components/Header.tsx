"use client";

import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MARKETPLACE_DESCRIPTION, MARKETPLACE_TITLE } from "../../../configuration/company";
import { ChatBubbleLeftIcon, PlusIcon, UserIcon } from "@heroicons/react/20/solid";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { ComputerDesktopIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useOutsideClick } from "~~/hooks/scaffold-eth";

type HeaderMenuLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

export const menuLinks: HeaderMenuLink[] = [
  {
    label: "EXPLORE",
    href: "/explore",
    icon: <MagnifyingGlassIcon className="h-4 w-4" />,
  },
  {
    label: "CREATE",
    href: "/create",
    icon: <PlusIcon className="h-4 w-4" />,
  },
  {
    label: "TRANSACTIONS",
    href: "/blockexplorer",
    icon: <ComputerDesktopIcon className="h-4 w-4" />,
  },
  {
    label: "PROFILE",
    href: "/profile",
    icon: <UserIcon className="h-4 w-4" />,
  },
  // {
  //   label: "MESSAGES",
  //   href: "/messenger",
  //   icon: <ChatBubbleLeftIcon className="h-4 w-4" />,
  // },
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
                isActive ? "bg-primary shadow-md" : ""
              } p-3 min-w-fit w-fit border backdrop-blur-md transition hover:ease-in-out
              bg-primary/40 hover:bg-primary/50 border-primary/60 hover:border-primary/90
              dark:bg-primary/20 dark:hover:bg-primary/40 dark:border-primary dark:hover:border-primary/80 py-1.5 px-3 text-sm gap-2 flex items-center`}
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
      <div className="sticky lg:static top-0 navbar min-h-0 flex-shrink-0 justify-around z-20 px-0 sm:px-2">
        <div>
          <Link href="/" passHref className="hidden lg:flex items-center gap-2 ml-4 mr-6 shrink-0">
            <div className="flex relative w-10 h-10">
              <Image alt={`${MARKETPLACE_TITLE} Logo`} className="cursor-pointer" fill src="/logo.svg" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold leading-tight">{MARKETPLACE_TITLE}</span>
              <span className="text-xs">{MARKETPLACE_DESCRIPTION}</span>
            </div>
          </Link>
        </div>
        <div className="navbar-end flex-grow mr-4">
          <RainbowKitCustomConnectButton />
          <FaucetButton />
        </div>
      </div>

      <div className="w-full flex justify-center items-center relative pb-5">
        <div className="w-full border border-transparent border-t-black dark:border-t-white" />
        <ul className="hidden lg:flex lg:flex-nowrap gap-x-4 pl-4 pr-4">
          <HeaderMenuLinks />
        </ul>
        <div className="w-full border border-transparent border-t-black dark:border-t-white" />
      </div>
    </>
  );
};
