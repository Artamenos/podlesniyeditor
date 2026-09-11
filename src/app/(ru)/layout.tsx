import { pageMetadata, SiteDocument } from "@/app/_components/site-document";
export const metadata = pageMetadata("ru");
export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteDocument locale="ru">{children}</SiteDocument>;
}
