import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { TRPCReactProvider } from "~/trpc/react";
import Nav from "~/components/navbar";
import ThemeProvider from "~/components/theme-provider";

export const metadata: Metadata = {
  title: "Hi :)",
  description: "My Personal Website, welcome!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system">
          <Nav />
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
