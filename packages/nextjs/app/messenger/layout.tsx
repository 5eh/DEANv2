import * as React from "react";
import { Metadata } from "next";
import { COMPANY_NAME } from "../../../../configuration/company";
import { TITLE_BREAKER, MESSAGE_TITLE, MESSAGE_DESCRIPTION } from "../../../../configuration/seo";

export const metadata: Metadata = {
  title: `${MESSAGE_TITLE} ${TITLE_BREAKER} ${COMPANY_NAME}`,
  description: `${MESSAGE_DESCRIPTION}`,
};

export default function ComponentsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
