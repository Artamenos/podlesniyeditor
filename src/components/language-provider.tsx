"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { SiteCopy } from "@/data/translations";

const CopyContext = createContext<SiteCopy | null>(null);
export function LanguageProvider({ copy, children }: { copy: SiteCopy; children: ReactNode }) {
  return <CopyContext value={copy}>{children}</CopyContext>;
}
export function useCopy() {
  const copy = useContext(CopyContext);
  if (!copy) throw new Error("LanguageProvider is required");
  return copy;
}
