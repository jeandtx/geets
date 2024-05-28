"use client";
import React from "react";
import Link from "next/link";

interface WorkoutProps {
  title: string;
  workoutId: string; // Assuming each workout has a unique ID
}

export function Workout({ title, workoutId}: WorkoutProps) {
  return (
    <Link href={`/workout/${workoutId}`}>
      <div className="w-64 h-14 bg-cyan-700 text-white font-medium py-2 px-4 rounded-full flex items-center justify-center">
        {title}
      </div>
    </Link>
  );
}
