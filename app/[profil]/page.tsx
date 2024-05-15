import { auth, signOut } from "@/app/auth";
import clientPromise from "@/lib/mongodb";
import { Button} from "@/components/ui/button";
import Link from "next/link";



async function getUser(email: string) {
	const client = await clientPromise;
	const db = client.db("geets");
	const user = await db.collection("users").findOne({ email });
	return user;
}

function SignOut() {
	return (
		<form
			action={async () => {
				"use server";
				await signOut();
			}}
		>
			<Button variant={"outline"} type="submit">
				Sign out
			</Button>
		</form>
	);
}
function EditProfile() {
	return(
		<form
			action={async () => {
				"use server";
			}}
		>
			<Button variant={"default"} type="submit">
				Edit my profile
			</Button>
		</form>
 	);
}

// function EditProfile() {
// 	function handleEdit() {
// 		console.log("hellooooooooooooooo");
// 		throw new Error('Function not implemented.');
// 	}

// 	return (
// 		<form
// 			action={async () => {
// 				"use server";
// 				console.log("hiiiiiiiiiiiiiiiiii");
// 				// useEffect(()=>{
// 				// 	handleEdit();
// 				// }, []);
// 			}
// 		}
			
// 		>
// 			<Button variant={"default"} type="submit">
// 				Edit my profile
// 			</Button>
// 		</form>
// 	);
// }

// function EditProfile() {
// 	// Ajout d'un console.log à la déclaration de la fonction
// 	console.log('EditProfile component is being rendered');
  
// 	function handleEdit() {
// 	  // Ajout d'un console.log dans une fonction
// 	  console.log('handleEdit function has been called');
// 	  throw new Error('Function not implemented.');
// 	}
  
// 	return (
// 	  <form
// 		action={async () => {
// 		  "use server";
// 		  console.log('Form action triggered');
// 		  // Si vous avez un code asynchrone ici, vous pouvez également ajouter des console.log
// 		  try {
// 			await handleEdit();
// 		  } catch (error) {
// 			console.error('Error in form action:', error);
// 		  }
// 		}}
// 	  >
// 		{/* Ajout d'un console.log lorsque le bouton est rendu */}
// 		<Button variant={"default"} type="submit" onClick={() => console.log('Edit my profile button clicked')}>
// 		  Edit my profile
// 		</Button>
// 	  </form>
// 	);
//   }


export default async function ProfilPage({
	params,
}: Readonly<{
	params: { profil: string };
}>) {
	const session = await auth();
	const { profil } = params;
	const decodeEmail = decodeURIComponent(profil);
	const user = await getUser(decodeEmail);

	return (
		<div className="flex h-screen">
			<div className="w-screen h-screen flex flex-col space-y-5 justify-center items-center text-black">
				<div>Search other profils from the database to try</div>
				<Link href="/sanchezlori@example.com" className="text-textblue">
					{" "}
					for example sanchezlori@example.com
				</Link>
				<div>
					Note that you have to be logged in to access this page and
					any profil page
				</div>
				<h1 className="text-3xl font-bold ">Profil of {decodeEmail}</h1>
				{user ? (
					<>
						<div>Nom: {user.name}</div>
						<div>Prénom: {user.last_name}</div>
						<div>Age: {user.age}</div>
						<div>Localisation: {user.location}</div>
						<div>Sexe: {user.sexe}</div>
						<div>Expérience: {user.experience}</div>
					</>
				) : (
					<div>User not found :</div>
				)}
				<div className="text-2xl font-bold ">
					You are logged in as {session?.user?.email}
				</div>

				<Link
					href={`/${session?.user?.email}`}
					className="text-textblue"
				>
					Back to my profile
				</Link>
				<EditProfile />
				<SignOut />
			</div>
		</div>
	);
}
