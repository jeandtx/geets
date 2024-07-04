"use client";
import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { searchUsers } from "@/lib/data/user"; // Assurez-vous d'implémenter cette fonction
import LoadingSpinner from "./ui/spinner";
import { User } from "@/types/tables"; // Assurez-vous de définir un type User

interface UserSearchComponentProps {
    onSelectUser: (user: { name: string; email: string }) => void;
}

const UserSearchComponent: React.FC<UserSearchComponentProps> = ({ onSelectUser }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState<{ _id: string; pseudo: string; email: string }[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchResults = async () => {
            if (searchTerm) {
                setIsLoading(true);
                try {
                    const users: User[] = await searchUsers(searchTerm);
                    const filteredUsers = users
                        .filter(user => user.pseudo && user.email)
                        .map(user => ({
                            _id: user._id,
                            pseudo: user.pseudo!,
                            email: user.email!
                        }));
                    setResults(filteredUsers);
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
        <div className="flex flex-col items-center w-full">
            <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="text-gray-400" />
                </div>
                <Input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Rechercher des utilisateurs"
                    className="w-full bg-white pl-10 pr-5 py-4  text-left text-gray-600 text-sm custom-border duration-300 animation-all focus:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                />
            </div>

            {isLoading && (
                <div className="mt-2">
                    <LoadingSpinner />
                </div>
            )}

            <ul className="list-none p-0 w-full">
                {results.map((user) => (
                    <li
                        key={user._id}
                        className="mt-2 mb-2 cursor-pointer"
                        onClick={() => onSelectUser({ name: user.pseudo, email: user.email })}
                    >
                        <div className="block rounded hover:bg-gray-100">
                            <h3 className="text-lg">{user.pseudo} </h3>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserSearchComponent;
