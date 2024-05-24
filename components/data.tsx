"use client";
import React, { useState, useEffect, useRef } from "react";
import { getAllUsers } from "@/lib/actions";

export function Data() {
    useEffect(() => {
        console.log(getAllUsers()); // Correct syntax
    }, []); // Add dependencies array for useEffect

    return <div>Render Maya</div>;
}