import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react'; // Importer l'icône Trash2
import { Series } from '@/types/tables';
interface ExerciseSetterProps {
  exerciseName: string;
  sets: Series[];
  onChange: (data: Series[]) => void;
}

// Utilisation de l'interface pour typer les props du composant
const ExerciseSetter: React.FC<ExerciseSetterProps> = ({ exerciseName, sets, onChange }) => {
  const [localSets, setLocalSets] = useState<Series[]>(sets);

  // Met à jour les valeurs locales quand les props changent
  useEffect(() => {
    setLocalSets(sets);
  }, [sets]);

  // Appelle la fonction onChange quand les valeurs locales changent
  useEffect(() => {
    onChange(localSets);
  }, [localSets]);

  // Fonction pour mettre à jour une série spécifique
  const handleSetChange = (index: number, newSet: Series) => {
    const updatedSets = localSets.map((set, i) => (i === index ? newSet : set));
    setLocalSets(updatedSets);
  };

  const addNewSet = () => {
    setLocalSets([...localSets, { reps: 0, weight: 0 }]); // Assurez-vous d'utiliser des valeurs initiales correctes
  };

  const removeSet = (index: number) => {
    const updatedSets = localSets.filter((_, i) => i !== index);
    setLocalSets(updatedSets);
  };

  return (
    <div className='flex flex-col p-4 border rounded shadow-sm'>
      <h2 className='text-lg font-bold mb-4'>{exerciseName}</h2>
      {localSets.map((set, index) => (
        <div key={index} className='mb-4 flex flex-col'>
          <label className='mb-2'>
            Reps:
            <input
              type='number'
              value={set.reps}
              onChange={(e) => handleSetChange(index, { ...set, reps: Number(e.target.value)})}
              className='border rounded p-2 ml-2'
              placeholder='Entrer le nombre de réps'
            />
          </label>
          <label className='mb-2'>
            Poids
            <input
              type='number'
              value={set.weight}
              onChange={(e) => handleSetChange(index, { ...set, weight: Number(e.target.value) })}
              className='border rounded p-2 ml-2'
              placeholder='Entrer le poids en kg'
            />
          </label>
          {index > 0 && (
            <div className='flex items-center'>
            <button
              onClick={() => removeSet(index)}
              className=' p-2 rounded-full bg-red-500 hover:bg-red-600 text-white'
            >
              <Trash2 size={16} />
            </button>
          </div>
             )}
        </div>
      ))}
      <button onClick={addNewSet} className='mt-4 bg-blue-500 text-white py-2 px-4 rounded'>
        Ajouter série
      </button>
    </div>
  );
};

export default ExerciseSetter;
