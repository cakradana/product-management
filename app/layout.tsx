import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gradient-to-b from-base-300 to-base-100 min-h-screen`}
      >
        <Providers>
          <div className="drawer lg:drawer-open	text-base-content">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
              <Navbar />
              <main className="flex-grow p-4">{children}</main>
            </div>
            <Sidebar />
          </div>
        </Providers>
      </body>
    </html>
  );
}
