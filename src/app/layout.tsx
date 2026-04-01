import type { Metadata } from "next";
import { Outfit, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import ThemeRegistry from "@/components/ThemeRegistry";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClientDirectionSetter from "@/components/ClientDirectionSetter";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const notoArabic = Noto_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hangman Game Creator",
  description:
    "Create custom Hangman games for your students. Set the number of allowed mistakes, add your word list, and play!",
  openGraph: {
    title: "Hangman Game Creator",
    description:
      "Create custom Hangman games for your students. Set the number of allowed mistakes, add your word list, and play!",
    type: "website",
    siteName: "Hangman Creator",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${outfit.variable} ${notoArabic.variable}`}
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <ClientDirectionSetter />
        <ThemeRegistry>
          <Header />
          <main style={{ flex: 1 }}>{children}</main>
          <Footer />
        </ThemeRegistry>
      </body>
    </html>
  );
}
