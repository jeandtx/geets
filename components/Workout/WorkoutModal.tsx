"use client";
import React, { useState, useRef, useEffect } from "react";
import { AddWorkout } from "@/components/Workout/AddWorkout";
import { useSession } from "next-auth/react";

interface WorkoutModalProps {
  title: string;
  addWorkout: (workout: { _id: string; workoutTitle: string }) => void;
}

export function WorkoutModal({ title, addWorkout }: WorkoutModalProps) {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const modal = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!modal.current) return;
      if (
        !modalOpen ||
        modal.current.contains(target as Node) ||
        (trigger.current && trigger.current.contains(target as Node))
      )
        return;
      setModalOpen(false);
    };

    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [modalOpen]);

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleOpenModal = () => {
    if (isAuthenticated) {
      setModalOpen(true);
    } else {
      // Rediriger vers la page de connexion ou afficher un message
      alert("Vous devez être connecté pour ajouter une séance.");
    }
  };

  return (
    <>
      <button
        ref={trigger}
        onClick={handleOpenModal}
        className="w-64 h-14 border-2 border-cyan-700 border-dashed text-cyan-700 font-medium py-2 px-4 rounded-full"
      >
        {title}
      </button>

      {modalOpen && (
        <div className="fixed left-0 top-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-50 px-4 py-5">
          <div ref={modal} className="bg-white p-8 rounded-md">
            <AddWorkout closeModal={closeModal} addWorkout={addWorkout} />
          </div>
        </div>
      )}
    </>
  );
}
