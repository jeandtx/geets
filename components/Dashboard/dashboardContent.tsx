"use client";
import React from "react";
import Link from "next/link";
import CalendarModal from "./calendarModal";
import Tonnage from "./tonnage";
interface DashboardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardContent({ className }: DashboardProps) {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const datetodisplay = date?.getDate()+"/"+date?.getMonth()+"/"+date?.getFullYear();
    console.log(datetodisplay);

    return (
        <div className="w-auto relative">
            <div className="flex flex-row justify-between">
            <CalendarModal date={date} setDate={setDate} />
            <div className="text-2xl">{datetodisplay}</div>
            </div>

            <div className="flex flex-row pt-6">
                <div className="text-3xl font-bold ">Tonnage</div>
                <Link href="dashboard/tonnage">
                    <div className="text-xl ">?</div>
                </Link>
            </div>
            <div className="">
                <Tonnage/>
            </div>
        </div>
    );
}
