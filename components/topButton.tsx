
"use client";
import React, { useEffect, useState, useCallback } from "react";

export default function TopButton() {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = useCallback(() => {
    setIsVisible(window.scrollY > 0);
}, []);

    const scrollToTop = useCallback(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        toggleVisibility(); 
        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, [toggleVisibility]);

    return (
        <div className="fixed bottom-4 right-4">
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700"
                >
                    ↑
                </button>
            )}
        </div>
    );
}


