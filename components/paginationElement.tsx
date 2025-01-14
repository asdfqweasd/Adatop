"use client";

import { Button } from "@/cosmic/elements/Button";
import React from "react";
import Image from "next/image";

type PaginationProps = {
  imageSrc: string;
  text: string;
  onButtonClick: () => void;
};

const PaginationCard: React.FC<PaginationProps> = ({
  imageSrc,
  text,
  onButtonClick,
}) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg w-72 bg-slate-50">
      <div className="h-72 relative m-6">
        <Image
          src={imageSrc}
          alt="Card"
          fill
          className="rounded-t-lg object-contain"
          sizes="(max-width: 768px) 100vw, 288px"
        />
      </div>
      <div className="p-4">
        <p className="text-gray-700 mb-4">{text}</p>
        <Button onClick={onButtonClick}>Apply</Button>
      </div>
    </div>
  );
};

export default PaginationCard;
