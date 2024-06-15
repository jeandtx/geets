import { CalendarIcon } from "lucide-react";
import React, { useRef, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar"; // Assurez-vous que le chemin d'importation est correct

interface CalendarModalProps {
    date: Date | undefined;
    setDate: (date: Date | undefined) => void;
}

export default function CalendarModal({ date, setDate }: CalendarModalProps) {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            setIsModalOpen(false);
        }
    };

    useEffect(() => {
        if (isModalOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isModalOpen]);

    const handleDateSelect = (selectedDate: Date | undefined) => {
        setDate(selectedDate);
        setIsModalOpen(false);
    };

    return (
        <div>
            <button
                onClick={toggleModal}
                className=""
                aria-label="Open Calendar"
            >
                <CalendarIcon size={24} />
            </button>
            {isModalOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-start justify-start p-4">
                    <div ref={modalRef} className="bg-white rounded-md p-4">
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
    );
}
