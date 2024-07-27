import * as React from "react";
import { Metadata } from "next";
import { COMPANY_NAME } from "../../../../configuration/company";
import { CHECKOUT_DESCRIPTION, TITLE_BREAKER, CHECKOUT_TITLE } from "../../../../configuration/seo";

export const metadata: Metadata = {
  title: `${CHECKOUT_TITLE} ${TITLE_BREAKER} ${COMPANY_NAME}`,
  description: `${CHECKOUT_DESCRIPTION}`,
};

export default function ComponentsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
