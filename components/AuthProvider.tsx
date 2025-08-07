"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { useRouter, usePathname } from "next/navigation";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // ✅ FIX: Toujours initialiser avec null pour éviter l'hydratation mismatch
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // ✅ FIX: Charger l'utilisateur depuis localStorage après l'hydratation
  useEffect(() => {
    setIsHydrated(true);
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Mettre à jour localStorage quand l'utilisateur change
  useEffect(() => {
    if (!isHydrated) return; // Ne pas mettre à jour avant l'hydratation
    
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user, isHydrated]);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      setUser(data.user);
      return data.user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      setUser(null);
      localStorage.removeItem('user');
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const checkAuth = async () => {
    // Si nous avons déjà un utilisateur dans le state, pas besoin de vérifier
    if (user) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/check', {
        credentials: 'include',
      });
      
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        if (pathname === '/login') {
          router.push('/programme');
        }
      } else {
        setUser(null);
        localStorage.removeItem('user');
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setUser(null);
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  };

  // Gestion du chargement initial
  useEffect(() => {
    if (!isHydrated) return; // Attendre l'hydratation
    
    const handleInitialAuth = async () => {
      // Vérifier si on a un utilisateur dans le localStorage (déjà chargé)
      if (user) {
        setIsInitialLoading(false);
        setLoading(false);
        return;
      }

      // Vérifier si le token existe dans les cookies
      const hasToken = document.cookie.includes('authToken=');

      // Si pas de token, on peut afficher directement
      if (!hasToken) {
        setIsInitialLoading(false);
        setLoading(false);
        return;
      }

      // Si token existe, on vérifie l'auth
      try {
        const response = await fetch('/api/auth/check', {
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          // Si la vérification échoue, on supprime le cookie
          document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          setUser(null);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setUser(null);
      } finally {
        setIsInitialLoading(false);
        setLoading(false);
      }
    };

    handleInitialAuth();
  }, [isHydrated, user]);

  // Vérification auth sur changement de route
  useEffect(() => {
    if (!isHydrated) return; // Attendre l'hydratation
    
    // Ne pas vérifier l'auth sur la page de login au chargement initial si on a déjà un utilisateur
    if (pathname !== '/login' || !user) {
      checkAuth();
    } else {
      setLoading(false);
    }
  }, [pathname, isHydrated]);

  // ✅ FIX: Afficher un loader jusqu'à l'hydratation complète
  if (!isHydrated || isInitialLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

 