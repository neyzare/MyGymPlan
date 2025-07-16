"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import Image from "next/image";

import curl from "../assets/curl.jpeg";
import bench from "../assets/developper-coucher.jpeg";
import triceps from "../assets/extension-tricpes.jpeg";

export function AppleCardsCarousel() {
  const cards = data.map((card, index) => (
    <Card key={card.title} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20">
      <Carousel items={cards} />
    </div>
  );
}

const DummyContent = ({ description }: { description: string }) => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          Description :
        </span>{" "}
        {description}
      </p>
    </div>
  );
};

const data = [
  {
    category: "Biceps",
    title: "Curl haltères",
    src: curl,
    content: (
      <DummyContent description="Le curl avec haltères est un exercice d'isolation ciblant les biceps. Idéal pour la prise de volume." />
    ),
  },
  {
    category: "Poitrine",
    title: "Développé couché",
    src: bench,
    content: (
      <DummyContent description="Le développé couché est un exercice de base pour développer la force et la masse des pectoraux." />
    ),
  },
  {
    category: "Triceps",
    title: "Extension poulie",
    src: triceps,
    content: (
      <DummyContent description="L’extension à la poulie est parfaite pour cibler les triceps de façon contrôlée et efficace." />
    ),
  },
  {
    category: "Épaules",
    title: "Élévations latérales",
    src: bench,
    content: (
      <DummyContent description="Les élévations latérales permettent de travailler les deltoïdes moyens pour des épaules plus larges." />
    ),  
  },
];