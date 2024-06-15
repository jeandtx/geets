import { useState } from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, ChevronDown, Trash } from 'lucide-react';

type ExerciseAccordionProps = {
  exerciseName: string;
};

type Set = {
  id: number;
  reps: string;
  weight: string;
};

export default function ExerciseAccordion({ exerciseName }: ExerciseAccordionProps) {
  const [sets, setSets] = useState<Set[]>([{ id: Date.now(), reps: '', weight: '' }]);

  const addSet = () => {
    const newSet = { id: Date.now(), reps: '', weight: '' };
    setSets((prevSets) => {
      console.log("Adding new set:", newSet);
      return [...prevSets, newSet];
    });
  };

  const removeLastSet = () => {
    setSets((prevSets) => {
      const updatedSets = prevSets.slice(0, -1);
      console.log("Removing last set, updated sets:", updatedSets);
      return updatedSets;
    });
  };

  const updateSet = (id: number, field: keyof Set, value: string) => {
    setSets((prevSets) => {
      const updatedSets = prevSets.map((set) => (set.id === id ? { ...set, [field]: value } : set));
      console.log(`Updating set with id ${id}:`, updatedSets);
      return updatedSets;
    });
  };

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full max-w-md rounded-lg border border-gray-200 shadow-sm dark:border-gray-800"
    >
      <AccordionItem value="exercise-1">
        <AccordionTrigger className="flex items-center justify-between px-6 py-4 text-lg font-medium">
          <span>{exerciseName}</span>
        </AccordionTrigger>
        <AccordionContent className="px-6 pb-4 pt-2 text-gray-500 dark:text-gray-400">
          <div className="space-y-4">
            {sets.map((set) => (
              <div key={set.id} className="space-y-2">
                <div>
                  <Label htmlFor={`sets-${set.id}`} className="block text-sm font-medium">
                    Répétitions
                  </Label>
                  <Input
                    id={`sets-${set.id}`}
                    type="number"
                    value={set.reps}
                    onChange={(e) => updateSet(set.id, 'reps', e.target.value)}
                    placeholder="Entrez le nombre de séries"
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-200 dark:focus:border-gray-600 dark:focus:ring-gray-600"
                  />
                </div>
                <div>
                  <Label htmlFor={`reps-${set.id}`} className="block text-sm font-medium">
                    Poids
                  </Label>
                  <Input
                    id={`reps-${set.id}`}
                    type="number"
                    value={set.weight}
                    onChange={(e) => updateSet(set.id, 'weight', e.target.value)}
                    placeholder="Entrez le nombre de répétitions"
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-200 dark:focus:border-gray-600 dark:focus:ring-gray-600"
                  />
                </div>
              </div>
            ))}
            <div className="flex justify-between">
              <Button
                type="button"
                className="flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus:ring-gray-600 dark:focus:ring-offset-gray-950"
                onClick={addSet}
              >
                <Plus className="mr-2 h-5 w-5" />
                Ajouter
              </Button>
              {sets.length > 1 && (
                <Button
                  type="button"
                  className="flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 dark:focus:ring-red-600 dark:focus:ring-offset-gray-950"
                  onClick={removeLastSet}
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
  );
}
