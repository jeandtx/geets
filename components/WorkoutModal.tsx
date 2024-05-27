"use client";
import React, { useState, useRef, useEffect } from "react";
import { AddWorkout } from "@/components/AddWorkout";
interface WorkoutModalProps {
    title: string;
}

export function WorkoutModal({ title }: WorkoutModalProps) {
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

    return (
        <>
            <button
                ref={trigger}
                onClick={() => setModalOpen(true)}
                className="w-64 h-14 border-2 border-cyan-700 border-dashed text-cyan-700 font-medium py-2 px-4 rounded-full"
            >
                {title}
            </button>

            {modalOpen && (
                <div className="fixed left-0 top-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-50 px-4 py-5">
                    <div ref={modal} className="bg-white p-8 rounded-md">
                        <AddWorkout closeModal={closeModal} />
                    </div>
                </div>
            )}
        </>
    );
}
