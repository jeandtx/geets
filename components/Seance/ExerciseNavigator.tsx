"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSession } from "next-auth/react";
import ExerciseSetter from "./exerciseSetter";
import { createSeance } from "@/lib/seance"; // Assurez-vous que le chemin est correct

interface ExerciseNavigatorProps {
  exercises: string[]; // Tableau de noms d'exercices
  id: string;
}

interface ExerciseData {
  reps: string;
  weight: string;
}

const ExerciseNavigator2: React.FC<ExerciseNavigatorProps> = ({ exercises, id }) => {
  const router = useRouter();
  const { data: session } = useSession();
  
  // État pour l'index de l'exercice actuel
  const [currentIndex, setCurrentIndex] = useState(0);

  // État pour les données des exercices
  const [exerciseData, setExerciseData] = useState<Record<number, ExerciseData>>({});
  console.log(exerciseData);

  // Fonction pour aller à l'exercice précédent
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : exercises.length - 1));
  };

  // Fonction pour aller à l'exercice suivant
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < exercises.length - 1 ? prevIndex + 1 : 0));
  };

  // Fonction pour mettre à jour les données d'un exercice
  const handleExerciseDataChange = (data: ExerciseData) => {
    setExerciseData((prevData) => ({
      ...prevData,
      [currentIndex]: data,
    }));
  };

  // Fonction de soumission pour créer une séance
  const handleSubmit = async () => {
    if (session?.user?.email) {
      try {
        const seance = await createSeance(session.user.email, id, exerciseData);
        console.log("Seance created:", seance);
        // Redirection ou message de succès ici
      } catch (error) {
        console.error("Error creating seance:", error);
      }
    } else {
      console.error("No user session found");
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex flex-row items-center w-full h-full space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrevious}
          className=""
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <ExerciseSetter
          exerciseName={exercises[currentIndex]}
          reps={exerciseData[currentIndex]?.reps || ''}
          weight={exerciseData[currentIndex]?.weight || ''}
          onChange={handleExerciseDataChange}
        />
        <Button
          variant="outline"
          size="icon"
          onClick={handleNext}
          className=""
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
      <Button className="mt-4" onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default ExerciseNavigator2;
