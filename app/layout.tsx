import { Inter } from "next/font/google";
import "./globals.css";
import { NavbarGym } from "./ component/NavBar";
import { FloatingDockDemo } from "./ component/FloatingDock";
import { AuthProvider } from "../components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <NavbarGym />
          {children}
          <FloatingDockDemo />
        </AuthProvider>
      </body>
    </html>
  );
}
