"use client"
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { getAllWorkouts } from "@/lib/actions";
import { useSession } from "next-auth/react";

interface WorkoutContextProps {
    workouts: any[];
    isLoading: boolean;
}

const WorkoutContext = createContext<WorkoutContextProps | undefined>(undefined);

export const WorkoutProvider = ({ children }: { children: ReactNode }) => {
    const { data: session } = useSession();
    const [workouts, setWorkouts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchWorkouts = async () => {
            if (session?.user?.email) {
                try {
                    const userWorkouts = await getAllWorkouts(session.user.email);
                    setWorkouts(userWorkouts);
                    setIsLoading(false);
                } catch (error) {
                    console.error("Error fetching workouts:", error);
                }
            }
        };

        fetchWorkouts();
    }, [session]);

    return (
        <WorkoutContext.Provider value={{ workouts, isLoading }}>
            {children}
        </WorkoutContext.Provider>
    );
};

export const useWorkouts = () => {
    const context = useContext(WorkoutContext);
    if (context === undefined) {
        throw new Error('useWorkouts must be used within a WorkoutProvider');
    }
    return context;
};
