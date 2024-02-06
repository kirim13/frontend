import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "../globals.css";

export const metadata = {
  title: "VieVista",
  description: "A Next.js Meta VieVista Application",
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
        <body className={`${inter.className} bg-dark-1`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
