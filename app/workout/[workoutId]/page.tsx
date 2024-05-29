import React from "react";
import { getWorkout } from "@/lib/actions";
import ExerciseNavigator from "@/components/ExerciseNavigator";

export default async function WorkoutPage({
  params,
}: Readonly<{
  params: { workoutId: string };
}>) {
  const { workoutId } = params;
  console.log("here", workoutId);
  const workout = await getWorkout(workoutId);

  if (!workout) {
    return <div>Workout not found</div>;
  }
  console.log("type of id", typeof workout._id)
  

  

  return (
    <section className="flex flex-col items-center w-full h-screen">
      <div className="text-3xl font-bold pt-12">{workout.workoutTitle}</div>
      <div className="py-2">{new Date(workout.date).toLocaleDateString()}</div>
      <div className="pt-10">
        <ExerciseNavigator exercises={workout.exercises} id={workout._id} />
      </div>
    </section>
  );
}
