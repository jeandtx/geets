import { Metadata } from "next";

import clientPromise from "../../../lib/mongodb";

export const metadata: Metadata = {
	title: "Top 1000 Movies by Metacritic",
};

async function getMovies() {
	const client = await clientPromise;
	const db = client.db("sample_mflix");
	const movies = await db
		.collection("movies")
		.find({})
		.sort({ metacritic: -1 })
		.limit(1000)
		.toArray();
	return movies;
}
export default async function Dashboard() {
	const movies = await getMovies();
	("use client");
	const movieList = movies.map((movie) => (
		<li
			key={movie.title}
			className="w-[300px] bg-black-400 rounded-lg shadow-md m-2 p-2 text-center"
		>
			<div>
				<h3 className="text-green-500 text-xl font-extrabold">
					{movie.title}
				</h3>
				<p className="text-green-200 text-lg">Year: {movie.year}</p>
				<div>Plot: {movie.plot}</div>
				<div>Genres: {movie.genres}</div>
				<div>Metacritic: {movie.metacritic}</div>
			</div>
		</li>
	));

	return (
		<div className="py-8">
			<h1 className="title text-green-400 text-center text-3xl font-bold mb-16">
				Top 1000 Movies by Metacritic
			</h1>
			<ul className="flex flex-wrap justify-center m-0 p-0 list-none">
				{movieList}
			</ul>
		</div>
	);
}
