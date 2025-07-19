"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import Image from "next/image";

import curl from "../assets/biceps-curl.jpeg";
import bench from "../assets/developper-coucher.jpeg";
import triceps from "../assets/extension-triceps.jpeg";
import elevation from "../assets/elevation-laterale.jpeg";

export function AppleCardsCarousel() {
  const cards = data.map((card, index) => (
    <Card key={card.title} card={{ ...card, src: card.src.src }} index={index} />
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
      <div className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg font-sans max-w-3xl mx-auto whitespace-pre-line">
        {description}
      </div>
    </div>
  );
};

const data = [
  {
    category: "Biceps",
    title: "Curl haltères",
    src: curl,
    content: (
      <DummyContent description={`
        🏋️‍♂️ Exécution (version avec haltères)

        1. Position de départ :
           • Debout, pieds écartés à la largeur des hanches
           • Haltères dans chaque main, bras le long du corps, paumes tournées vers l'avant (supination)
           • Poitrine fière, épaules tirées légèrement vers l'arrière, gainage actif

        2. Phase concentrique (montée) :
           • Fléchis les coudes en gardant les bras collés au corps
           • Monte les haltères jusqu'à ce que les avant-bras soient verticaux, ou un peu plus selon ta souplesse
           • Expire en montant

        3. Phase excentrique (descente) :
           • Redescends lentement et sous contrôle en gardant une tension dans les biceps
           • Ne laisse pas les bras retomber ou se balancer
           • Inspire pendant cette phase

        ⸻

        🔁 Variantes possibles :
           • Barre droite ou EZ : meilleure stabilité, moins de stress sur les poignets
           • Curl alterné : un bras à la fois, permet une meilleure concentration
           • Curl marteau (Hammer curl) : prise neutre, renforce davantage le brachial et l'avant-bras
           • Curl incliné : plus d'étirement du chef long du biceps

        ⸻

        ✅ Conseils d'exécution (TIPS de coach) :
           1. Ne balance pas le haut du corps pour aider à monter le poids. Si tu balances, c'est que la charge est trop lourde
           2. Garde les coudes fixes : ils ne doivent pas avancer ou reculer pendant le mouvement
           3. Priorise le contrôle plutôt que la vitesse. Un tempo lent maximise la tension musculaire
           4. Contraction maximale en haut du mouvement : bloque 1 seconde avec les biceps bien contractés
           5. Ne tends pas complètement les bras en bas pour éviter de relâcher la tension musculaire
           6. Regarde droit devant toi, et garde les épaules détendues pour éviter d'impliquer le trapèze
           7. Travaille en amplitude complète, mais sans à-coup

        ⸻

        💡 Astuce bonus :
           En fin de série, lorsque tu es proche de l'échec, passe en curl marteau alterné (plus facile) pour gratter quelques répétitions supplémentaires. Cela augmente le volume sans compromettre la technique.
      `} />
    ),
  },
  {
    category: "Poitrine",
    title: "Développé couché",
    src: bench,
    content: (
            <DummyContent description={`🔍 Muscles ciblés :
        •	Principal : Pectoraux (grand pectoral – faisceaux sterno-costal principalement)
        •	Secondaires :
        •	Triceps brachial
        •	Deltoïdes antérieurs
        •	Dentelé antérieur (stabilisation)
        •	Muscles stabilisateurs du tronc (gainage)

      ⸻

      🛠️ Équipement :
        •	Barre droite olympique + banc plat
        •	Disques de poids
        •	Rack de sécurité (si possible, surtout si vous êtes seul)

      ⸻

      ⚙️ Exécution du mouvement (pas à pas)

      🔹 Position de départ :
        1.	Allonge-toi sur un banc plat.
        2.	Les pieds bien à plat au sol, légèrement en arrière pour un bon ancrage.
        3.	Regarde droit vers le plafond, yeux sous la barre.
        4.	Prise de barre : légèrement plus large que les épaules, paumes vers l’avant (pronation).
        5.	Épaules en arrière et en bas, poitrine sortie, bas du dos légèrement cambré (cambrure naturelle, pas exagérée).
        6.	Barre dans l’axe des poignets et des coudes.

      🔹 Phase excentrique (descente) :
        1.	Inspire profondément et bloque ta respiration (gainage).
        2.	Descends la barre lentement jusqu’au milieu de la poitrine (ligne des tétons).
        3.	Les coudes descendent à environ 45° par rapport au torse (ni trop ouverts, ni collés).
        4.	Les avant-bras restent verticaux.

      🔹 Phase concentrique (montée) :
        1.	Pousse la barre vers le haut en gardant les poignets droits.
        2.	Expire pendant la poussée.
        3.	Finis le mouvement sans verrouiller brutalement les coudes.
        4.	La trajectoire est légèrement diagonale, du bas de la poitrine vers un point juste au-dessus des épaules.

      ⸻

      🔁 Variantes du développé couché :
        •	Haltères : meilleure amplitude et activation des muscles stabilisateurs.
        •	Développé incliné : accent sur les faisceaux supérieurs des pectoraux.
        •	Développé décliné : accent sur les faisceaux inférieurs.
        •	Prise serrée : cible davantage les triceps.
        •	Avec élastiques ou chaînes : résistance progressive.

      ⸻

      ✅ Conseils d’exécution (TIPS de coach) :
        1.	Ne décolle jamais les fesses du banc : cela compromet la sécurité et la stabilité.
        2.	Fixe un point au plafond pour éviter de suivre la barre avec les yeux (déséquilibre).
        3.	Échauffe bien tes épaules avant de commencer (rotateurs, mobilité scapulaire).
        4.	Maîtrise la descente : ne laisse jamais la barre tomber par inertie.
        5.	Poignets dans l’alignement de l’avant-bras : pas cassés vers l’arrière.
        6.	Utilise la respiration abdominale : inspire avant la descente, bloque pendant la poussée, souffle en haut.
        7.	Pas de rebond sur la poitrine : danger pour le sternum et perte d’efficacité.

      ⸻

      💡 Astuce bonus :
      En fin de série, si tu es proche de l’échec, demande un “spotter” (partenaire de sécurité) pour t’aider à finir proprement. Sinon, utilise les racks de sécurité bien positionnés pour éviter tout accident.`} />
    ),
  },
  {
    category: "Triceps",
    title: "Extension triceps",
    src: triceps,
    content: (
          <DummyContent description={`🔍 Muscles ciblés :
      •	Principal : Triceps brachial (les 3 chefs : long, latéral, médial)
      •	Secondaires :
      •	Anconé (petit muscle du coude)
      •	Muscles stabilisateurs des épaules et de la sangle abdominale (selon la position)

    ⸻

    ⚙️ Équipement :
      •	Barre EZ ou droite (version allongée = skull crusher)
      •	Haltères (unilatéral ou bilatéral)
      •	Câble avec corde ou barre droite
      •	Banc plat ou incliné (pour certaines variantes)

    ⸻

    💪 Version 1 : Extensions triceps allongé (Skull Crushers avec barre EZ)

    📍 Position de départ :
      1.	Allonge-toi sur un banc plat.
      2.	Tiens la barre EZ en pronation (paumes vers toi), mains écartées à la largeur des épaules.
      3.	Étends les bras à la verticale, coudes verrouillés mais pas verrouillés brutalement.
      4.	Garde les coudes serrés, pointés vers le haut, sans qu’ils s’écartent.

    🔄 Exécution :
      1.	Descends lentement la barre vers le haut du front ou légèrement derrière, en ne bougeant que les avant-bras.
      2.	Les coudes restent fixes : ne les recule pas, garde-les au-dessus des épaules.
      3.	Une fois la barre proche du front (ou juste derrière), pousse-la vers le haut jusqu’à extension complète.
      4.	Garde une légère flexion des coudes en haut pour maintenir la tension musculaire.

    ⸻

    💪 Version 2 : Extensions au-dessus de la tête avec haltère (Overhead Triceps Extension)

    📍 Position de départ :
      1.	Debout ou assis, tiens un haltère à deux mains (prise en diamant autour du disque supérieur).
      2.	Amène l’haltère derrière la tête, coudes pointés vers le plafond.
      3.	Tronc bien droit, abdos engagés.

    🔄 Exécution :
      1.	Fléchis les bras pour descendre l’haltère derrière la tête.
      2.	Garde les coudes stables et serrés.
      3.	Étends les bras vers le haut sans trop les verrouiller.

    ⸻

    💪 Version 3 : Extensions triceps à la poulie haute (Corde ou barre)

    📍 Position de départ :
      1.	Debout face à la poulie, prise corde ou barre, coudes collés au corps.
      2.	Bras fléchis à 90°, abdos contractés, dos droit.

    🔄 Exécution :
      1.	Pousse vers le bas jusqu’à extension complète des coudes.
      2.	Marque une pause en bas pour bien contracter les triceps.
      3.	Remonte lentement en contrôlant.

    ⸻

    ✅ Conseils d’exécution (TIPS de coach) :
      1.	Coudes fixes = triceps isolés. Si les coudes bougent, les épaules prennent le relais.
      2.	Amplitude complète : descends bien pour étirer le chef long du triceps, surtout sur les variantes overhead.
      3.	Ne verrouille pas brutalement en haut du mouvement.
      4.	Tempo contrôlé : 2 secondes pour descendre, 1 seconde pour monter, 1 seconde de contraction.
      5.	Si tu ressens les coudes trop fortement, réduis la charge ou change la prise (corde souvent plus douce pour les articulations).
      6.	Varie les angles : overhead pour le chef long, poulie pour tension constante, skull crushers pour intensité mécanique.

    ⸻

    💡 Astuce bonus :
    Ajoute un “drop set” sur la dernière série : commence avec la charge lourde, puis diminue immédiatement sans repos pour enchaîner avec une charge plus légère. Excellent pour brûler les triceps en profondeur.`} />
    ),
  },
  {
    category: "Épaules",
    title: "Élévations latérales",
    src: elevation,
    content: (
      <DummyContent description={`
              🔍 Muscles ciblés :
        •	Principal : Deltoïde moyen (faisceau latéral)
        •	Secondaires :
        •	Deltoïde antérieur et postérieur (légèrement engagés)
        •	Trapèze supérieur (stabilisation, à modérer)
        •	Supra-épineux (initiation du mouvement)

      ⸻

      ⚙️ Équipement :
        •	Haltères légers à modérés
        •	Câble (pour variante avec poulie)
        •	Élastiques (option maison)
        •	Banc incliné (pour version isolée)

      ⸻

      💪 Exécution classique avec haltères (debout)

      ⸻

      📍 Position de départ :
        1.	Debout, pieds écartés à la largeur des hanches.
        2.	Haltères dans chaque main, bras le long du corps, paumes face à toi.
        3.	Légère flexion des coudes, poitrine ouverte, épaules abaissées.
        4.	Tronc gainé, genoux légèrement fléchis.

      ⸻

      🔄 Exécution :
        1.	Élève les bras latéralement, jusqu’à ce qu’ils atteignent l’horizontale (angle de 90° environ).
        2.	Les coudes doivent rester au-dessus ou au même niveau que les poignets, jamais plus bas.
        3.	Expire en montant.
        4.	Redescends lentement les bras en gardant la tension musculaire, sans relâcher totalement en bas.
        5.	Inspire pendant la descente.

      ⸻

      🔁 Variantes intéressantes :
        •	Assis sur banc : limite l’élan et améliore l’isolement.
        •	Unilatéral avec haltère : meilleure concentration sur un côté.
        •	Avec poulie basse : tension constante sur toute l’amplitude.
        •	Élévations en inclinaison latérale (buste penché) : étirement maximal du deltoïde.
        •	“Fulls + Partiels” : combiner grandes amplitudes + petites en fin de série (méthode avancée).

      ⸻

      ✅ Conseils d’exécution (TIPS de coach) :
        1.	Charge légère = efficacité maximale. Trop lourd = triche avec les trapèzes ou l’élan.
        2.	Pas d’élan : monte avec les épaules, pas avec le dos ou les jambes.
        3.	Garde les poignets dans l’axe de l’avant-bras, pas de cassure.
        4.	Monte jusqu’à l’horizontale seulement, voire un peu en dessous si tu veux limiter l’engagement des trapèzes.
        5.	Stoppe 5-10° avant de redescendre complètement pour maintenir la tension.
        6.	Imagine que tu verses de l’eau avec les haltères : légèrement incliné vers l’avant pour bien cibler le deltoïde moyen.
        7.	Reste stable, évite les balancements parasites. Pieds bien ancrés.

      ⸻

      💡 Astuce bonus :
      Pour vraiment brûler les épaules, termine ta dernière série avec une technique “21” :
        •	7 répétitions sur la moitié basse de l’amplitude
        •	7 sur la moitié haute
        •	7 complètes
      Cela sature les fibres musculaires efficacement même avec des poids légers.`} />
    ),
  },
];