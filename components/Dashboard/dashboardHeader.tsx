"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar"; // Ensure the import path is correct
import { DropdownMenuCheckboxes } from "./dropDownButton";
import Tonnage from "./tonnage";
import { useSession } from "next-auth/react";
import { Seance } from "@/types/tables";
import { getSeancebyDay } from "@/lib/seance";

interface DashboardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardHeader({ className }: DashboardProps) {
    const [date, setDate] = useState<Date>(new Date());
    const [seances, setSeances] = useState<Seance[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const { data: session } = useSession();
    const datetodisplay = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

    useEffect(() => {
        const fetchSeances = async () => {
            if (session?.user?.email && date) {
                const fetchedSeances = await getSeancebyDay(session.user.email, date);
                setSeances(fetchedSeances);
            }
        };
        fetchSeances();
    }, [session, date]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setIsModalOpen(false);
            }
        };

        if (isModalOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isModalOpen]);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleDateSelect = (selectedDate: Date | undefined) => {
        if (selectedDate) {
            setDate(selectedDate);
        }
        setIsModalOpen(false);
    };

    console.log(datetodisplay);
    console.log(seances);

    return (
        <div className={`w-auto relative ${className}`}>
            <div className="flex flex-row justify-between">
                <div>
                    <button
                        onClick={toggleModal}
                        className=""
                        aria-label="Open Calendar"
                    >
                        <CalendarIcon size={24} />
                    </button>
                    {isModalOpen && (
                        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-start justify-center p-4 z-50">
                            <div ref={modalRef} className="bg-white rounded-md p-4 relative">
                                <button
                                    onClick={toggleModal}
                                    className="absolute top-0 right-0 m-2 p-2"
                                    aria-label="Close Modal"
                                >
                                    &times;
                                </button>
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={handleDateSelect}
                                    className="rounded-md border"
                                />
                            </div>
                        </div>
                    )}
                </div>
                <div className="text-2xl">{datetodisplay}</div>
                <div className="text-2xl"><DropdownMenuCheckboxes /></div>
            </div>

            <div className="flex flex-row pt-6">
                <div className="text-3xl font-bold">Tonnage</div>
                <Link href="/dashboard/tonnage">
                    <div className="text-xl">?</div>
                </Link>
            </div>
            <Tonnage />
        </div>
    );
}
