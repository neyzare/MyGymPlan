import Image from "next/image";
import { AppleCardsCarousel } from "./ component/AppleCardCarousel";

export default function Home() {
  return (
    <>
      <section className="mt-12 text-center px-4">
  <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight text-black  max-w-4xl mx-auto">
    <span className="text-blue-600">MyGymPlan</span> t’aide à <span className="text-blue-600">transformer</span> <span className="text-black">ton corps</span>,<br />
    <span className="text-black">atteindre tes </span> <span className="text-blue-600">objectifs</span> et  <span className="text-blue-600">progresser</span> <span className="text-black">progresser durablement</span>.
  </h1>
  <p className="mt-6 text-black  text-lg md:text-2xl max-w-3xl mx-auto">
    Des programmes adaptés à chaque niveau, construits pour t’accompagner étape par étape — de la prise de masse à la sèche, en passant par la force.
  </p>
</section>
      <AppleCardsCarousel />

    </>
  );
}
