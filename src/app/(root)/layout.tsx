import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "../globals.css";

import Topbar from "@/components/shared/Topbar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import Bottombar from "@/components/shared/Bottombar";

export const metadata = {
  title: "VieVista",
  description: "A Next.js Meta VieVista Application",
  icons: {
    icon: "/assets/pet-care.png",
  },
};

const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children, // props
}: {
  children: React.ReactNode; // types of props
}) {
  return (
    // return of layout
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-dark-1`}>
          <Topbar />

          <main>
            <LeftSidebar />

            <section className="main-container">
              <div className="w-full max-w-4xl">{children}</div>
            </section>

            <RightSidebar />
          </main>

          <Bottombar />
        </body>
      </html>
    </ClerkProvider>
  );
}
