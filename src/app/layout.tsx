import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/header";
import MobileNav from "@/components/shared/mobile_nav";
import { QueryProvider } from "@/lib/react-query/QueryProvider";
import { Toaster } from "sonner";
import Script from "next/script";
import { AuthProvider } from "@/lib/contexts/auth.context";
import { SearchProvider } from "@/lib/contexts/search.context";
import { AuthDialogProvider } from "@/lib/contexts/auth-dialog.context";
import { AuthDialog } from "@/components/shared/dialog/auth.dialog";

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
          <AuthProvider>
            <AuthDialogProvider>
              <SearchProvider>
                <Header />
                {children}
                <MobileNav />
                <Toaster position="top-center" />
                <Script
                  src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
                  strategy="beforeInteractive"
                  async
                  defer
                />
              </SearchProvider>
              <AuthDialog />
            </AuthDialogProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
