"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Project } from '@/types/tables';
import { searchProjects } from '@/lib/data/project';
import LoadingSpinner from './spinner';

const SearchComponent: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchResults = async () => {
            if (searchTerm) {
                setIsLoading(true);
                try {
                    const projects = await searchProjects(searchTerm);
                    setResults(projects);
                } catch (error) {
                    console.error('Error searching projects:', error);
                }
                setIsLoading(false);
            } else {
                setResults([]);
            }
        };

        const delayDebounceFn = setTimeout(() => {
            fetchResults();
        }, 300); // Délais de 300ms pour éviter trop de requêtes

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    return (
        <div className="flex flex-col items-center">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for projects..."
                className="w-full max-w-2xl p-2 border rounded"
            />

            {isLoading && <div><LoadingSpinner /></div>}

            <ul className="list-none p-0 w-full max-w-2xl">
                {results.map((project) => {
                    const email = Array.isArray(project.participants) ? project.participants[0]?.name : '';
                    const projectId = project._id;
                    const projectUrl = `/${email}/${projectId}`;

                    return (
                        <li key={project._id} className="mt-2 mb-2">
                            <Link href={projectUrl} legacyBehavior>
                                <a className="block p-2 rounded hover:bg-gray-100">
                                    <h3 className="text-lg ">{project.title}</h3>
                                </a>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default SearchComponent;
