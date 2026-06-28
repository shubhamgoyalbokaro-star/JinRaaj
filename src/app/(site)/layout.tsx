import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { getSiteSettings } from "@/lib/data";

export const revalidate = 60;

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const site = await getSiteSettings();

  return (
    <>
      <Navbar site={site} />
      <main className="flex-1">{children}</main>
      <Footer site={site} />
      <WhatsAppFab whatsapp={site.whatsapp} />
    </>
  );
}
