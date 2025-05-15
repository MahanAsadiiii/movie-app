import type { Metadata } from "next";
import { Vazirmatn, Roboto_Mono } from "next/font/google";
import "./globals.css";

const roboto = Vazirmatn({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Movie website",
  description: "explore movies review",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${robotoMono.variable} antialiased`}
      >
        <div className="flex justify-center">
          <div className="md:w-5xl">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
