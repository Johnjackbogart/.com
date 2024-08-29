import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { TRPCReactProvider } from "~/trpc/react";
import Nav from "~/components/navbar";

export const metadata: Metadata = {
  name: "viewport",
  title: "Hi :)",
  description: "My Personal Website, welcome!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <Nav />
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
