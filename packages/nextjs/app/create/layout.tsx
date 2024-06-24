import * as React from "react";
import { Metadata } from "next";
import { MARKETPLACE_DESCRIPTION } from "../../../../configuration/company";

export const metadata: Metadata = {
  title: "Create",
  description: `${MARKETPLACE_DESCRIPTION}`,
};

export default function ComponentsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
