import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ReactQueryProvider from "./utils/ReactQueryProvider";

const geistSans = localFont({
  src: "./fonts/Barlow-Regular.ttf",
  variable: "--font-barlow-regular",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/Barlow-Regular.ttf",
  variable: "--font-barlow-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-cPurple-100 px-8`} 
      >
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
