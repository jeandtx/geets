"use client";
import React from "react";

interface WorkoutProps {
    title: string;
}

export function Workout({ title }: WorkoutProps) {
    return (
        <button 
            className="w-64 h-14 bg-cyan-700 text-white font-medium py-2 px-4 rounded-full"
            onClick={() => alert('Séance de musculation')}
        >
            {title}
        </button>
    );
}
