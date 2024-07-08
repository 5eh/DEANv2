import { useRef, useState } from "react";
import { NetworkOptions } from "./NetworkOptions";
import CopyToClipboard from "react-copy-to-clipboard";
import { getAddress } from "viem";
import { Address } from "viem";
import { useDisconnect } from "wagmi";
import {
  ArrowLeftOnRectangleIcon,
  ArrowTopRightOnSquareIcon,
  ArrowsRightLeftIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  DocumentDuplicateIcon,
  QrCodeIcon,
} from "@heroicons/react/24/outline";
import { BlockieAvatar, isENS } from "~~/components/scaffold-eth";
import { useOutsideClick, useTargetNetwork } from "~~/hooks/scaffold-eth";
import { getTargetNetworks } from "~~/utils/scaffold-eth";
import { SwitchTheme } from "~~/components/SwitchTheme";
import { hardhat } from "viem/chains";
import { CogIcon, UserIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const allowedNetworks = getTargetNetworks();

type AddressInfoDropdownProps = {
  address: Address;
  blockExplorerAddressLink: string | undefined;
  displayName: string;
  ensAvatar?: string;
};

export const AddressInfoDropdown = ({
  address,
  ensAvatar,
  displayName,
  blockExplorerAddressLink,
}: AddressInfoDropdownProps) => {
  const { disconnect } = useDisconnect();
  const checkSumAddress = getAddress(address);

  const [addressCopied, setAddressCopied] = useState(false);

  const [selectingNetwork, setSelectingNetwork] = useState(false);
  const dropdownRef = useRef<HTMLDetailsElement>(null);
  const closeDropdown = () => {
    setSelectingNetwork(false);
    dropdownRef.current?.removeAttribute("open");
  };
  useOutsideClick(dropdownRef, closeDropdown);
  const { targetNetwork } = useTargetNetwork();

  const isLocalNetwork = targetNetwork.id === hardhat.id;

  return (
    <>
      <details ref={dropdownRef} className="dropdown dropdown-end leading-3">
        <summary
          tabIndex={0}
          className="btn hover:border-primary hover:bg-primary/20 border border-black dark:border-white btn-sm ml-3 mr-3 dropdown-toggle !h-auto rounded-none"
        >
          {/* <BlockieAvatar address={checkSumAddress} size={24} ensImage={ensAvatar} /> */}
          <span className="ml-2 mr-1">
            {isENS(displayName) ? displayName : checkSumAddress?.slice(0, 6) + "..." + checkSumAddress?.slice(-4)}
          </span>
          <ChevronDownIcon className="h-6 w-4 ml-2 sm:ml-0" />
        </summary>
        <ul
          tabIndex={0}
          className="dropdown-content menu z-[2] m-2 bg-base-200 border border-black dark:border-white gap-1"
        >
          <NetworkOptions hidden={!selectingNetwork} />
          <li className={selectingNetwork ? "hidden" : ""}>
            {addressCopied ? (
              <div className="btn-sm  flex gap-3">
                <CheckCircleIcon
                  className="text-xl font-normal h-6 w-4 cursor-pointer ml-2 sm:ml-0"
                  aria-hidden="true"
                />
                <span className="whitespace-nowrap">Copy address</span>
              </div>
            ) : (
              <CopyToClipboard
                text={checkSumAddress}
                onCopy={() => {
                  setAddressCopied(true);
                  setTimeout(() => {
                    setAddressCopied(false);
                  }, 800);
                }}
              >
                <div className="btn-sm rounded-none hover:bg-primary/20 flex gap-3">
                  <DocumentDuplicateIcon
                    className="text-xl font-normal  h-6 w-4 cursor-pointer ml-2 sm:ml-0"
                    aria-hidden="true"
                  />
                  <span className=" whitespace-nowrap">Copy address</span>
                </div>
              </CopyToClipboard>
            )}
          </li>
          <li className={selectingNetwork ? "hidden" : ""}>
            <label htmlFor="qrcode-modal" className="btn-sm rounded-none hover:bg-primary/20  flex gap-3 py-3">
              <QrCodeIcon className="h-6 w-4 ml-2 sm:ml-0" />
              <span className="whitespace-nowrap ">View QR Code</span>
            </label>
          </li>
          <li className={selectingNetwork ? "hidden" : ""}>
            <button className="menu-item btn-sm rounded-none  hover:bg-primary/20 flex gap-3 py-3" type="button">
              <ArrowTopRightOnSquareIcon className="h-6 w-4 ml-2 sm:ml-0" />
              <a
                target="_blank"
                href={blockExplorerAddressLink}
                rel="noopener noreferrer"
                className="whitespace-nowrap"
              >
                View on Block Explorer
              </a>
            </button>
          </li>

          <li></li>

          <li>
            <Link
              href="/profile"
              className="menu-item text-error btn-sm rounded-none hover:bg-primary/20 flex gap-3 py-3"
              type="button"
              onClick={() => disconnect()}
            >
              <UserIcon className="h-6 w-4 ml-2 sm:ml-0 dark:text-white text-black" />{" "}
              <span className="dark:text-white text-black">Edit Profile</span>
            </Link>
          </li>
          <li>
            <Link
              href="/settings"
              className="menu-item text-error btn-sm rounded-none hover:bg-primary/20 flex gap-3 py-3"
              type="button"
              onClick={() => disconnect()}
            >
              <CogIcon className="h-6 w-4 ml-2 sm:ml-0 dark:text-white text-black" />{" "}
              <span className="dark:text-white text-black">Settings</span>
            </Link>
          </li>

          <li></li>

          {allowedNetworks.length > 1 ? (
            <li className={selectingNetwork ? "hidden" : ""}>
              <button
                className="btn-sm rounded-none border hover:bg-primary/20 flex gap-3 py-3"
                type="button"
                onClick={() => {
                  setSelectingNetwork(true);
                }}
              >
                <ArrowsRightLeftIcon className="h-6 w-4 ml-2 sm:ml-0" /> <span>Switch Network</span>
              </button>
            </li>
          ) : null}
          <li className={selectingNetwork ? "hidden" : ""}>
            <button
              className="menu-item text-error btn-sm rounded-none hover:bg-red-500/20 flex gap-3 py-3"
              type="button"
              onClick={() => disconnect()}
            >
              <ArrowLeftOnRectangleIcon className="h-6 w-4 ml-2 sm:ml-0 " /> <span>Disconnect Wallet</span>
            </button>
          </li>

          <SwitchTheme className={`pointer-events-auto ${isLocalNetwork ? "self-end md:self-auto" : ""}`} />
        </ul>
      </details>
    </>
  );
};
