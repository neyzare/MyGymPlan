"use client"

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavbarGym } from "./ component/NavBar";
import { useState, useEffect } from "react";
import { FloatingDockDemo } from "./ component/FloatingDock";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState<boolean>(false);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await fetch('/api/auth/check', {
          credentials: 'include'
        });
        setUser(response.ok);
      } catch (error) {
        console.error('Erreur de vérification:', error);
        setUser(false);
      }
    };

    checkUser();
  }, []);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NavbarGym/>
        {children}
        {user ? <FloatingDockDemo /> : null}
      </body>
    </html>
  );
}
