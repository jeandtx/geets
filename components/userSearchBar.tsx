"use client";
import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import Link from "next/link";
import { User } from "@/types/tables"; // Assurez-vous de définir un type User
import { searchUsers } from "@/lib/data/user"; // Assurez-vous d'implémenter cette fonction
import LoadingSpinner from "./ui/spinner";

const UserSearchComponent: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchResults = async () => {
            if (searchTerm) {
                setIsLoading(true);
                try {
                    const users = await searchUsers(searchTerm);
                    setResults(users);
                } catch (error) {
                    console.error("Error searching users:", error);
                }
                setIsLoading(false);
            } else {
                setResults([]);
            }
        };

        const delayDebounceFn = setTimeout(() => {
            fetchResults();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-lg font-semibold mt-4 sm:hidden ">Rechercher un utilisateur</h2>
            <div className="relative w-full max-w-2xl">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="text-gray-400" />
                </div>
                <Input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Rechercher"
                    className="w-full bg-white pl-10 pr-5 py-4 rounded-full text-left text-gray-600 font-semibold text-sm custom-border duration-300 animation-all focus:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                />
            </div>

            {isLoading && (
                <div>
                    <LoadingSpinner />
                </div>
            )}

            <ul className="list-none p-0 w-full max-w-2xl">
                {results.map((user) => (
                    <li key={user._id} className="mt-2 mb-2">
                        <Link href={`/user/${user._id}`} legacyBehavior>
                            <div className="block p-2 rounded hover:bg-gray-100 cursor-pointer">
                                <h3 className="text-lg ">
                                    {user.pseudo} ({user.email})
                                </h3>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserSearchComponent;
