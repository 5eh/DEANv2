import * as React from "react";
import { Metadata } from "next";
import { COMPANY_NAME } from "../../../../configuration/company";
import { EXPLORE_TITLE, TITLE_BREAKER, EXPLORE_DESCRIPTION } from "../../../../configuration/seo";

export const metadata: Metadata = {
  title: `${EXPLORE_TITLE} ${TITLE_BREAKER} ${COMPANY_NAME}`,
  description: `${EXPLORE_DESCRIPTION}`,
};

export default function ComponentsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
