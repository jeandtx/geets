import React, { useEffect, useRef, useState } from "react";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { redirect } from "next/navigation";

interface Project {
	_id: string;
	name: string;
	owner: string;
}

interface SelectProjectProps {
	onSelectProject: (projectId: string) => void;
	user?: string;
}

export default function SelectProject({
	onSelectProject,
	user,
}: SelectProjectProps) {
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [selectedProjectName, setSelectedProjectName] =
		useState<string>("Ajouter un projet");
	const trigger = useRef<HTMLButtonElement>(null);
	const modal = useRef<HTMLDivElement>(null);
	const [projects, setProjects] = useState<Project[]>();

	useEffect(() => {
		const fetchProjects = async () => {
			const res = await fetch("/api/" + user + "/projects");
			if (res.body !== null) {
				const reader = res.body.getReader();
				const result = await reader.read();
				const decoder = new TextDecoder("utf-8");
				const text = decoder.decode(result.value);
				const projects = JSON.parse(text);
				setProjects(projects.response);
			}
		};
		if (!projects) {
			fetchProjects();
		}
	}, [projects, user]);

	useEffect(() => {
		const clickHandler = ({ target }: MouseEvent) => {
			if (!modal.current) return;
			if (
				!modalOpen ||
				modal.current.contains(target as Node) ||
				(trigger.current && trigger.current.contains(target as Node))
			)
				return;
			setModalOpen(false);
			// console.log("modal is closing because of click outside");
		};

		document.addEventListener("click", clickHandler);
		return () => document.removeEventListener("click", clickHandler);
	}, [modalOpen]);

	useEffect(() => {
		const keyHandler = ({ keyCode }: KeyboardEvent) => {
			if (!modalOpen || keyCode !== 27) return;
			// console.log("modal is closing because of", keyCode);
			setModalOpen(false);
		};

		document.addEventListener("keydown", keyHandler);
		return () => document.removeEventListener("keydown", keyHandler);
	}, [modalOpen]);
	const handleSelectItem = (itemName: string) => {
		// console.log("Selected item name:", itemName);
		setSelectedProjectName(itemName);
		onSelectProject(itemName);
		setModalOpen(false);
	};

	const handleAddProject = () => {
		if (!user) {
			console.log('redirect to "/login"');
			redirect("/login");
		}
		// console.log("Add new project");
		setModalOpen(false);
	};

	return (
		<>
			<button
				type="button"
				ref={trigger}
				onClick={() => setModalOpen(true)}
				className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-white"
				style={{ height: "40px" }}
			>
				{selectedProjectName}
			</button>

			<div
				className={`fixed left-0 top-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-50 px-4 py-5 ${
					modalOpen ? "block" : "hidden"
				}`}
			>
				<div
					ref={modal}
					onFocus={() => setModalOpen(true)}
					// onBlur={() => setModalOpen(false)}
					className="w-full max-w-[570px] rounded-[20px] bg-white px-8 py-12 text-center dark:bg-dark-2 md:px-[70px] md:py-[60px]"
				>
					<h3 className="pb-[18px] text-xl font-semibold text-dark dark:text-white sm:text-2xl">
						Choisi ton projet !
					</h3>
					<div className="flex justify-center pb-5 ">
						<Carousel className={`w-full max-w-sm `}>
							<CarouselContent
								className={`${
									projects?.length === 0
										? "justify-center"
										: ""
								}`}
							>
								{projects?.map((project) => (
									<CarouselItem
										key={project._id}
										onClick={() =>
											handleSelectItem(project.name)
										}
										className="basis-1/3 cursor-pointer "
									>
										<Card>
											<CardContent className="flex items-center justify-center p-6 overflow-hidden">
												<span className="text-xl font-semibold">
													{project.name}
												</span>
											</CardContent>
										</Card>
									</CarouselItem>
								))}
								<Link href="/">
									<CarouselItem
										key="add-new"
										onClick={handleAddProject}
										className="basis-1/3 cursor-pointer "
									>
										<Card>
											<CardContent className="flex items-center justify-center p-6 px-8 overflow-hidden">
												{user ? (
													<span className="text-xl font-bold">
														+
													</span>
												) : (
													<span className="text-xl font-semibold">
														Connecte toi pour
														ajouter un projet
													</span>
												)}
											</CardContent>
										</Card>
									</CarouselItem>
								</Link>
							</CarouselContent>
							<CarouselPrevious />
							<CarouselNext />
						</Carousel>
					</div>

					<div className="-mx-3 flex justify-center">
						<div className="w-1/2 px-3">
							<button
								type="button"
								onClick={() => setModalOpen(false)}
								className="block w-full rounded-md border border-stroke p-3 text-center text-base font-medium text-dark transition hover:border-red-600 hover:bg-red-600 hover:text-white dark:text-white"
							>
								Annuler
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}