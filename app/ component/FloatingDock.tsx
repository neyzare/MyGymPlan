"use client";

import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import Link from "next/link";
import {
  IconBrandGithub,
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
  IconBarbell,
} from "@tabler/icons-react";
import { useAuth } from "../../hooks/useAuth";

export function FloatingDockDemo() {
  const { user } = useAuth();
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-white" />
      ),
      href: "/",
    },
    {
      title: "Programme",
      icon: (
        <IconBarbell className="h-full w-full text-white" />
      ),
      href: "/programme",
    },
    {
      title: "Components",
      icon: (
        <IconNewSection className="h-full w-full text-white" />
      ),
      href: "/dashboard",
    },
    {
      title: "Aceternity UI",
      icon: (
        <img
          src="https://assets.aceternity.com/logo-dark.png"
          width={20}
          height={20}
          alt="Aceternity Logo"
        />
      ),
      href: "#",
    },
    {
      title: "Changelog",
      icon: (
        <IconExchange className="h-full w-full text-white" />
      ),
      href: "#",
    },
  ];
  return (
    !user ? null : (
      <div className="fixed bottom-4 left-0 right-0 flex items-center justify-center z-50">
        <FloatingDock
          desktopClassName="bg-neutral-900 shadow-lg"
          mobileClassName="bg-neutral-900 shadow-lg"
          items={links}
        />
      </div>
    )
  );
}
