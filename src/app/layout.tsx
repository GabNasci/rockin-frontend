import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/header";
import MobileNav from "@/components/shared/mobile_nav";
import { QueryProvider } from "@/lib/react-query/QueryProvider";
import { Toaster } from "sonner";
import Script from "next/script";
import { AuthProvider } from "@/lib/contexts/auth-context";
import { SearchProvider } from "@/lib/contexts/search-context";

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_APP_ID,
//   measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

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
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
