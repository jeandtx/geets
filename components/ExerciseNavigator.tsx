"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { createSession } from "@/lib/actions";
import { useToast } from "@/components/ui/use-toast";

interface ExerciseNavigatorProps {
  exercises: string[]; // Tableau de noms d'exercices
  id: string;
}

type InputField = 'sets' | 'weight';

const ExerciseNavigator: React.FC<ExerciseNavigatorProps> = ({ exercises, id }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [exerciseInputs, setExerciseInputs] = useState(
    exercises.reduce((acc, exercise) => {
      acc[exercise] = { sets: '', weight: '' };
      return acc;
    }, {} as { [key: string]: { sets: string, weight: string } })
  );

  const handleNextExercise = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    }
  };

  const handlePreviousExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
    }
  };

  const handleInputChange = (exerciseName: string, field: InputField, value: string) => {
    setExerciseInputs({
      ...exerciseInputs,
      [exerciseName]: {
        ...exerciseInputs[exerciseName],
        [field]: value
      }
    });
  };

  const handleSubmit = async () => {
    if (!id) {
      console.error("Workout ID is missing");
      return;
    }
    try {
      await createSession(id, exerciseInputs);
      console.log("Session created successfully");
      // Afficher un toaster de succès
      toast({
        title: "Session créée avec succès !",
      });
      // Rediriger vers la page précédente après un court délai pour afficher le toaster
      setTimeout(() => {
        router.back();
      }, 2500);
    } catch (error) {
      console.error("Error creating session:", error);
      toast({
        variant: "destructive",
        title: "Échec de la création de la session",
      });
    }
  };

  const currentExercise = exercises[currentExerciseIndex];

  return (
    <div className="flex flex-col items-center w-full h-full">
      <Button
        variant="outline"
        size="icon"
        onClick={handlePreviousExercise}
        disabled={currentExerciseIndex === 0}
        className="absolute left-4"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <div className="flex justify-between items-center w-full relative">
        <div className="flex flex-col items-center mx-4 w-full text-center">
          <div className="text-2xl font-bold pb-10">{currentExercise}</div>
          <div className="mt-4 w-full max-w-md">
            <Input
              type="number"
              placeholder="Sets"
              value={exerciseInputs[currentExercise]?.sets || ''}
              onChange={(e) => handleInputChange(currentExercise, 'sets', e.target.value)}
              className="mb-2"
            />
            <Input
              type="number"
              placeholder="Weight"
              value={exerciseInputs[currentExercise]?.weight || ''}
              onChange={(e) => handleInputChange(currentExercise, 'weight', e.target.value)}
              className="mb-2"
            />
          </div>
        </div>
      </div>
      <Button
        variant="outline"
        size="icon"
        onClick={handleNextExercise}
        disabled={currentExerciseIndex === exercises.length - 1}
        className="absolute right-4"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
      <Button
        onClick={handleSubmit}
        className="mt-4"
      >
        Submit
      </Button>
    </div>
  );
};

export default ExerciseNavigator;
