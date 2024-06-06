"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getSeanceById } from '@/lib/seance';
import { Seance } from '@/types/tables';
import LoadingSpinner from '@/components/ui/loadingSpinner';

const SeancePage: React.FC = () => {
    const { seanceId } = useParams();
    const [seance, setSeance] = useState<Seance | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSeance = async () => {
            if (seanceId) {
                try {
                    const fetchedSeance = await getSeanceById(seanceId as string);
                    setSeance(fetchedSeance);
                } catch (error) {
                    console.error('Error fetching seance:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchSeance();
    }, [seanceId]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!seance) {
        return <div>Seance not found</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center w-full h-screen">
            <h1 className="text-3xl font-bold">{`Séance du ${new Date(seance.date).toLocaleDateString()}`}</h1>
            <div className="mt-4">
                <h2 className="text-xl font-semibold">Détails de la séance</h2>
                {seance.exercises.map((exercise) => (
                    <div key={exercise.name} className="mt-2">
                        <h3 className="text-lg font-medium">{exercise.name}</h3>
                        {exercise.sets.map((set, index) => (
                            <div key={index} className="ml-4">
                                <p>{`Série ${index + 1}: ${set.reps} répétitions, ${set.weight} kg`}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SeancePage;
