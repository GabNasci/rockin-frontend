import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/header";
import MobileNav from "@/components/shared/mobile_nav";

const montserrat = Montserrat({ variable: "--font-sans", subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={montserrat.variable}>
      <head>
        <title>Rockin</title>
      </head>
      <body className="font-sans bg-gray-50">
        <Header />
        {children}
        <MobileNav />
      </body>
    </html>
  );
}
