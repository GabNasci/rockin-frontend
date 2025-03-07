import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ variable: "--font-sans" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={montserrat.variable}>
      <body className="font-sans bg-gray-50">{children}</body>
    </html>
  );
}
