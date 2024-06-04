"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getSeances } from "@/lib/seance"; // Assurez-vous que le chemin est correct
import { Seance } from "@/types/tables";
import LoadingSpinner from "@/components/ui/loadingSpinner";

interface SeanceProps {
  workoutId: string;
  seance: Seance;
}

function SeanceModal({ workoutId, seance }: SeanceProps) {
  return (
    <Link href={`/home/${workoutId}/${seance._id}`}>
      <div className="w-64 h-14 bg-cyan-700 text-white font-medium py-2 px-4 rounded-full flex flex-col items-center justify-center">
        <span>{new Date(seance.date).toLocaleDateString()}</span>
        
      </div>
    </Link>
  );
}

export default function SeanceMenu({ workoutId }: { workoutId: string }) {
  const [seances, setSeances] = useState<Seance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeances = async () => {
      try {
        const allseances = await getSeances(workoutId);
        setSeances(allseances);
      } catch (error) {
        console.error("Error fetching seances:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeances();
  }, [workoutId]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <div className="flex flex-col items-center pt-36 w-full h-screen gap-3">
        <Link href={`/home/${workoutId}/new-seance`}>
          <button className="text-center w-64 h-14 border-2 border-cyan-700 border-dashed text-cyan-700 font-semibold py-2 px-4 rounded-full">
            +
          </button>
        </Link>
        {seances.map((seance) => (
          <SeanceModal key={seance._id} workoutId={workoutId} seance={seance} />
        ))}
      </div>
    </div>
  );
}
