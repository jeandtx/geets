import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoveLeft } from "lucide-react";
import { useSession } from "next-auth/react";
import ExerciseSetter from "./exerciseSetter";
import { createSeance } from "@/lib/seance";
import BackButton from "../ui/backbutton";
import { Exercise, Series } from "@/types/tables";

interface ExerciseNavigatorProps {
  exercises: string[];
  id: string;
}

const ExerciseNavigator2: React.FC<ExerciseNavigatorProps> = ({ exercises, id }) => {
  const router = useRouter();
  const { data: session } = useSession();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [exerciseData, setExerciseData] = useState<Record<number, Series[]>>({});
  console.log(exerciseData);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : exercises.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < exercises.length - 1 ? prevIndex + 1 : 0));
  };

  const handleExerciseDataChange = (data: Series[]) => {
    setExerciseData((prevData) => ({
      ...prevData,
      [currentIndex]: data,
    }));
  };

  const handleSubmit = async () => {
    if (session?.user?.email) {
      try {
        const exercisesFormatted: Exercise[] = exercises.map((exercise, index) => ({
          name: exercise,
          sets: (exerciseData[index] || []).map(set => ({
            reps: Number(set.reps),
            weight: Number(set.weight)
          }))
        }));
        console.log("Exercises formatted:", exercisesFormatted);

        const seance = await createSeance(session.user.email, id, exercisesFormatted);
        console.log("Seance created:", seance);
        // Redirection ou message de succès ici
        router.back(); // Redirection vers la page précédente
      } catch (error) {
        console.error("Error creating seance:", error);
      }
    } else {
      console.error("No user session found");
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 mt-5">
      <BackButton className="absolute top-4 left-4 p-2 hover:bg-gray-300 text-black">
        <MoveLeft className="h-10 w-10" />
      </BackButton>
      <div className="flex flex-col items-center w-full h-full space-x-2">
        <div>
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevious}
            className=""
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          {exercises[currentIndex]}
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            className=""
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
        <ExerciseSetter
          exerciseName={exercises[currentIndex]}
          sets={exerciseData[currentIndex] || [{ reps: 0, weight: 0 }]} // Assurez-vous d'utiliser des valeurs initiales correctes
          onChange={handleExerciseDataChange}
        />
      </div>
      <Button className="mt-4" onClick={handleSubmit}>Envoyer</Button>
    </div>
  );
};

export default ExerciseNavigator2;
