"use client";

import React from "react";
import PaginationCard from "@/components/paginationElement";
import Link from "next/link";
import { useRouter } from "next/navigation";

const OnboardingPage = () => {
  const router = useRouter();

  const cards = [
    {
      id: 1,
      imageSrc: "/image/logoWhite.png",
      text: "Adatop POS Application Form",
      onButtonClick: () => {
        window.location.href =
          "https://docs.google.com/forms/d/1CPOzgp_drAEanMJ8gTEj1x2Zp2_rgxmyPCyveWeJuHo";
      },
    },
    {
      id: 2,
      imageSrc: "/image/logoblack.png",
      text: "ADAPAY APPLICATION FORM",
      onButtonClick: () => {
        window.location.href =
          "https://docs.google.com/forms/d/1eQOpUX2OYezL8-UVD1-1SIsAaiFd6oGIxQtQKFr9MCU";
      },
    },
    {
      id: 3,
      imageSrc: "/image/debit.png",
      text: "Handbook",
      onButtonClick: () => {
        router.push("/handbook");
      },
    },
  ];

  return (
    <main className="p-4 flex flex-col justify-center items-center bg-white dark:bg-black">
      <div className="relative m-auto flex max-w-[950px] flex-col items-center sm:items-start gap-2">
        <div className="flex justify-between w-full items-baseline mb-4">
          <h1 className="text-center sm:text-left md:mx-0 text-3xl md:text-6xl font-display text-zinc-900 dark:text-zinc-100 leading-tight tracking-tighter">
            Support Page
          </h1>
        </div>
        <div className="mt-4 mx-auto grid w-full max-w-screen-lg grid-cols-1 gap-5 pb-24 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {cards.map((card) => (
            <PaginationCard
              key={card.id}
              imageSrc={card.imageSrc}
              text={card.text}
              onButtonClick={card.onButtonClick}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default OnboardingPage;
