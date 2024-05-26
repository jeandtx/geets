"use client";
import React from "react";
import { Calendar } from "@/components/ui/calendar";
interface DashboardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardContent({ className }: DashboardProps) {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    console.log(date)

    return (
        <div className="w-auto">

            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
            />
        </div>
    );
}
