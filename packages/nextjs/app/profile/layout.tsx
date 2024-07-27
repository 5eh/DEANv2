import * as React from "react";
import { Metadata } from "next";
import { COMPANY_NAME } from "../../../../configuration/company";
import { PROFILE_TITLE, TITLE_BREAKER, PROFILE_DESCRIPTION } from "../../../../configuration/seo";

export const metadata: Metadata = {
  title: `${PROFILE_TITLE} ${TITLE_BREAKER} ${COMPANY_NAME}`,
  description: `${PROFILE_DESCRIPTION}`,
};

export default function ComponentsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
