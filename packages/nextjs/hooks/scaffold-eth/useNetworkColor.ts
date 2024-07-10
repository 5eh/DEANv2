import { useTargetNetwork } from "./useTargetNetwork";
import { useTheme } from "next-themes";
import { ChainWithAttributes } from "~~/utils/scaffold-eth";
import { PRIMARY_TEXT_DARK, PRIMARY_TEXT_LIGHT } from "../../../../configuration/design";

export const DEFAULT_NETWORK_COLOR: [string, string] = [`${PRIMARY_TEXT_LIGHT}`, `${PRIMARY_TEXT_DARK}`];

export function getNetworkColor(network: ChainWithAttributes, isDarkMode: boolean) {
  const colorConfig = network.color ?? DEFAULT_NETWORK_COLOR;
  return Array.isArray(colorConfig) ? (isDarkMode ? colorConfig[1] : colorConfig[0]) : colorConfig;
}

/**
 * Gets the color of the target network
 */
export const useNetworkColor = () => {
  const { resolvedTheme } = useTheme();
  const { targetNetwork } = useTargetNetwork();

  const isDarkMode = resolvedTheme === "dark";

  return getNetworkColor(targetNetwork, isDarkMode);
};
