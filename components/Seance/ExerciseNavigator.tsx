import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MoveLeft, Plus, Trash } from "lucide-react";
import BackButton from "../ui/backbutton";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Seance } from "@/types/tables";
import { createSeance } from "@/lib/seance";
import { useSession } from "next-auth/react";
import {navigate} from "@/app/actions";
interface ExerciseNavigatorProps {
  exercises: string[];
  id: string;
}

type Set = {
  id: number;
  reps: string;
  weight: string;
};

const ExerciseNavigator2: React.FC<ExerciseNavigatorProps> = ({ exercises, id }) => {
  const [sets, setSets] = useState<Record<number, Set[]>>({});
  const { data: session, status } = useSession();
  const user = session?.user;
  
  console.log("User:", user);

  useEffect(() => {
    console.log("Exercises updated:", exercises);
    if (exercises.length > 0) {
      const initialState = exercises.reduce((acc, exercise, index) => {
        acc[index] = [{ id: Date.now() + index, reps: '', weight: '' }];
        return acc;
      }, {} as Record<number, Set[]>);
      setSets(initialState);
      console.log("Initial sets state:", initialState);
    }
  }, [exercises]);

  const addSet = (exerciseIndex: number) => {
    setSets((prevSets) => {
      const newSets = {
        ...prevSets,
        [exerciseIndex]: [...prevSets[exerciseIndex], { id: Date.now(), reps: '', weight: '' }]
      };
      console.log(`Set added for exercise ${exerciseIndex}:`, newSets);
      return newSets;
    });
  };

  const removeLastSet = (exerciseIndex: number) => {
    setSets((prevSets) => {
      const newSets = {
        ...prevSets,
        [exerciseIndex]: prevSets[exerciseIndex].slice(0, -1)
      };
      console.log(`Last set removed for exercise ${exerciseIndex}:`, newSets);
      return newSets;
    });
  };

  const updateSet = (exerciseIndex: number, setId: number, field: keyof Set, value: string) => {
    setSets((prevSets) => {
      const newSets = {
        ...prevSets,
        [exerciseIndex]: prevSets[exerciseIndex].map((set) =>
          set.id === setId ? { ...set, [field]: value } : set
        )
      };
      console.log(`Set updated for exercise ${exerciseIndex}, set ${setId}:`, newSets);
      return newSets;
    });
  };

  const handleSubmit = async () => {
    const result = exercises.map((exercise, index) => ({
      name: exercise,
      sets: sets[index]?.map(({ reps, weight }) => ({ reps, weight })) || []
    }));

    if (!user?.email) {
      console.error("User is not authenticated.");
      return;
    }

    const seance: Seance = {
      _id: '', // vous pouvez générer un ID ici si nécessaire
      email: user.email, // utilisez l'email de l'utilisateur connecté
      workoutId: id, // utilisez l'ID du workout
      date: new Date(),
      exercises: result
    };

    console.log("Submitting seance:", seance);

    try {
      await createSeance(seance);
      console.log("Seance successfully created:", result);
      navigate(`/home/${id}`);
    } catch (error) {
      console.error('Error creating seance:', error);
    }
  };

  if (!exercises || exercises.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-hidden">
      <BackButton className="p-2 hover:bg-gray-300 text-black">
        <MoveLeft className="h-10 w-10" />
      </BackButton>
      <div className="h-[80vh] flex flex-col p-4 gap-4 overflow-auto">
        {exercises.map((exercise, index) => (
          <Accordion
            key={index}
            type="single"
            collapsible
            className="w-full max-w-md rounded-lg border border-gray-200 shadow-sm dark:border-gray-800"
          >
            <AccordionItem value={`exercise-${index}`}>
              <AccordionTrigger className="flex items-center justify-between px-6 py-4 text-lg font-medium">
                <span>{exercise}</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 pt-2 text-gray-500 dark:text-gray-400">
                <div className="space-y-4">
                  {sets[index]?.map((set) => (
                    <div key={set.id} className="space-y-2">
                      <div>
                        <Label htmlFor={`sets-${set.id}`} className="block text-sm font-medium">
                          Répétitions
                        </Label>
                        <Input
                          id={`sets-${set.id}`}
                          type="number"
                          value={set.reps}
                          onChange={(e) => updateSet(index, set.id, 'reps', e.target.value)}
                          placeholder="Entrez le nombre de répétitions"
                          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-200 dark:focus:border-gray-600 dark:focus:ring-gray-600"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`weight-${set.id}`} className="block text-sm font-medium">
                          Poids
                        </Label>
                        <Input
                          id={`weight-${set.id}`}
                          type="number"
                          value={set.weight}
                          onChange={(e) => updateSet(index, set.id, 'weight', e.target.value)}
                          placeholder="Entrez le poids"
                          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-200 dark:focus:border-gray-600 dark:focus:ring-gray-600"
                        />
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-between">
                    <Button
                      type="button"
                      className="flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus:ring-gray-600 dark:focus:ring-offset-gray-950"
                      onClick={() => addSet(index)}
                    >
                      <Plus className="mr-2 h-5 w-5" />
                      Ajouter
                    </Button>
                    {sets[index] && sets[index].length > 1 && (
                      <Button
                        type="button"
                        className="flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 dark:focus:ring-red-600 dark:focus:ring-offset-gray-950"
                        onClick={() => removeLastSet(index)}
                      >
                        <Trash className="mr-2 h-5 w-5" />
                        Supprimer
                      </Button>
                    )}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
        <Button onClick={handleSubmit}>Envoyer</Button>
      </div>
    </div>
  );
};

export default ExerciseNavigator2;
