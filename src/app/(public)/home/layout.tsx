import Header from "@/components/shared/header";
import MobileNav from "@/components/shared/mobile_nav";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <MobileNav />
      {children}
    </div>
  );
}
