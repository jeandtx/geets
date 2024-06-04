import React, { useState, useEffect } from 'react';

// Définition de l'interface des props
interface ExerciseSetterProps {
  exerciseName: string;
  reps: string;
  weight: string;
  onChange: (data: { reps: string, weight: string }) => void;
}

// Utilisation de l'interface pour typer les props du composant
const ExerciseSetter: React.FC<ExerciseSetterProps> = ({ exerciseName, reps, weight, onChange }) => {
  const [localReps, setLocalReps] = useState(reps);
  const [localWeight, setLocalWeight] = useState(weight);

  // Met à jour les valeurs locales quand les props changent
  useEffect(() => {
    setLocalReps(reps);
    setLocalWeight(weight);
  }, [reps, weight]);

  // Appelle la fonction onChange quand les valeurs locales changent
  useEffect(() => {
    onChange({ reps: localReps, weight: localWeight });
  }, [localReps, localWeight]);

  return (
    <div className='flex flex-col p-4 border rounded shadow-sm'>
      <h2 className='text-lg font-bold mb-4'>{exerciseName}</h2>
      <label className='mb-2'>
        Reps:
        <input
          type='number'
          value={localReps}
          onChange={(e) => setLocalReps(e.target.value)}
          className='border rounded p-2 ml-2'
          placeholder='Enter number of reps'
        />
      </label>
      <label className='mb-2'>
        Weight:
        <input
          type='number'
          value={localWeight}
          onChange={(e) => setLocalWeight(e.target.value)}
          className='border rounded p-2 ml-2'
          placeholder='Enter weight in kg'
        />
      </label>
    </div>
  );
}

export default ExerciseSetter;
