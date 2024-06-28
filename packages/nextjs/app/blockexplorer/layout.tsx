import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";
import { COMPANY_DESCRIPTION, COMPANY_NAME } from "../../../../configuration/company";

export const metadata = getMetadata({
  title: `Transactions | ${COMPANY_NAME}`,
  description: `${COMPANY_DESCRIPTION}`,
});

const BlockExplorerLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default BlockExplorerLayout;
