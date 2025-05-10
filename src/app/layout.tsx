import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/header";
import MobileNav from "@/components/shared/mobile_nav";
import { QueryProvider } from "@/lib/react-query/QueryProvider";
import { Toaster } from "sonner";

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
        <QueryProvider>
          <Header />
          {children}
          <MobileNav />
          <Toaster position="top-center" />
        </QueryProvider>
      </body>
    </html>
  );
}
