"use client";
import { useState } from "react";
import Contact from "@/components/contact";

interface ContactButtonProps {
  className?: string;
  text?: string;
}

export const ContactButton: React.FC<ContactButtonProps> = ({
  className,
  text = "Contact Us",
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOpenForm = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  return (
    <>
      <button
        className={`
  bg-orange-500 text-white 
      py-2 px-6 rounded-md border-2 border-transparent hover:bg-white hover:text-black hover:border-black ${className}`}
        onClick={handleOpenForm}
      >
        {text}
      </button>
      {isFormOpen && <Contact onClose={handleCloseForm} />}
    </>
  );
};
