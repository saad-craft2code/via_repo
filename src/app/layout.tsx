import type { Metadata } from "next";
import { Geist_Mono, Plus_Jakarta_Sans, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { SessionGate } from "@/components/provider/session-gate";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-plex-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Via Trips — Provider Panel",
  description:
    "Service Provider Dashboard for Via Trips — manage hotels, bundles, bookings, and earnings.",
  keywords: ["Via Trips", "Provider Panel", "Hotel Owner", "Bundle Creator", "Travel Dashboard"],
  authors: [{ name: "Via Trips" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${plusJakarta.variable} ${geistMono.variable} ${ibmPlexArabic.variable} antialiased bg-background text-foreground`}
      >
        <SessionGate>{children}</SessionGate>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: "var(--popover, #fff)",
              color: "var(--popover-foreground, #111)",
              border: "1px solid var(--border, #e5e7eb)",
              borderRadius: "12px",
              fontSize: "14px",
              padding: "12px 16px",
            },
            success: { iconTheme: { primary: "oklch(0.2 0.02 240)", secondary: "#fff" } },
            error: { iconTheme: { primary: "oklch(0.55 0.22 25)", secondary: "#fff" } },
          }}
        />
      </body>
    </html>
  );
}
