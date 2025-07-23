"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export function NavbarGym() {
  const navItems = [
    {
      name: "Programme",
      link: "/programme",
    },
    {
      name: "Features",
      link: "#features",
    },
    {
      name: "Features",
      link: "#featuresr",
    },
  ];

  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <div className="relative w-full">
      <Navbar>
      
        <NavBody>
          <NavbarLogo/>
          <NavItems items={navItems} className="font-bold text-[14px] text-white"/>

          {
            !user ? (
              <div className="flex items-center gap-4">
                <NavbarButton href="/login" className="text-black">Login</NavbarButton>
                <NavbarButton href="/inscription" variant="primary">Inscription</NavbarButton>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <span className="text-white">Bonjour, {user.name}</span>
                <NavbarButton onClick={handleLogout}>Déconnexion</NavbarButton>
              </div>
            )
          }
          
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo/>
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className=""
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              {!user ? (
                <>
                  <NavbarButton
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    variant="primary"
                    className="w-full"
                  >
                    Login
                  </NavbarButton>
                  <NavbarButton
                    href="/inscription"
                    onClick={() => setIsMobileMenuOpen(false)}
                    variant="primary"
                    className="w-full"
                  >
                    Inscription
                  </NavbarButton>
                </>
              ) : (
                <NavbarButton
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  variant="primary"
                  className="w-full"
                >
                  Déconnexion
                </NavbarButton>
              )}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
