import React from "react";
import Link from "next/link";
interface WorkoutListProps {
    workouts: Array<{ _id: string; workoutTitle: string }>;
}

interface WorkoutProps {
    title: string;
    workoutId: string;
}

function WorkoutComponent({ title, workoutId }: WorkoutProps) {
    return (
        <Link href={`/home/${workoutId}`}>
            <div className="w-64 h-14 bg-cyan-700 text-white font-medium py-2 px-4 rounded-full flex items-center justify-center">
                {title}
            </div>
        </Link>
    );

}

const WorkoutList: React.FC<WorkoutListProps> = ({ workouts }) => {
    return (
        <>
            {workouts.map((workout) => (
                <WorkoutComponent key={workout._id} title={workout.workoutTitle} workoutId={workout._id} />
            ))}
        </>
    );
};

export default WorkoutList;
