// app/workout/[workoutId]/page.tsx
import React from "react";
import { getWorkout } from "@/lib/actions";

export default async function WorkoutPage({
  params,
}: Readonly<{
  params: { workoutId: string };
}>) {
  const { workoutId } = params;
  console.log("here",workoutId);
  const workout = await getWorkout(workoutId);

  if (!workout) {
    return <div>Workout not found</div>;
  }

  return (
    <section className="flex flex-col items-center w-full h-screen">
      <div className="text-3xl font-bold pt-24">Workout Details</div>
      <div className="pt-10">
        <h1 className="text-2xl font-bold">{workout.workoutTitle}</h1>
        <div>Date: {new Date(workout.date).toLocaleDateString()}</div>
        <div>Exercises:</div>
        <ul>
          {workout.exercises.map((exercise: string, index: number) => (
            <li key={index}>{exercise}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
