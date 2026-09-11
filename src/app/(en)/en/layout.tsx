import { pageMetadata, SiteDocument } from "@/app/_components/site-document";
export const metadata = pageMetadata("en");
export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteDocument locale="en">{children}</SiteDocument>;
}
