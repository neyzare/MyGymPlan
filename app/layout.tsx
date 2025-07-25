"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { NavbarGym } from "./ component/NavBar";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { FloatingDockDemo } from "./ component/FloatingDock";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth()

  useEffect(() => {
    // Vérifier si on a un utilisateur dans le localStorage
    const savedUser = localStorage.getItem('user');
    
    // Si on a un utilisateur en localStorage, on peut afficher directement
    if (savedUser) {
      setIsLoading(false);
      return;
    }

    // Vérifier si le token existe dans les cookies
    const hasToken = document.cookie.includes('authToken=');
    
    // Si pas de token ni d'utilisateur en localStorage, on peut afficher directement
    if (!hasToken) {
      setIsLoading(false);
      return;
    }

    // Si token existe mais pas d'utilisateur en localStorage, on vérifie l'auth
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check', {
          credentials: 'include',
        });
        
        if (!response.ok) {
          // Si la vérification échoue, on supprime le cookie
          document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <html lang="en">
        <body className={inter.className}>
          <div className="fixed inset-0 flex items-center justify-center bg-white">
            <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <NavbarGym />
        {children}

        {
          !user ? null : <FloatingDockDemo/>
        }
      </body>
    </html>
  );
}
