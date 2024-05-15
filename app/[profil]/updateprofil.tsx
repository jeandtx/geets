import { Button } from '@/components/ui/button';
import clientPromise from '@/lib/mongodb';
import React, { useState } from 'react';
import {Input} from '@/components/ui/button';
// import { useDispatch, useSelector } from "react-redux";

export async function getUser(email: string) {
	const client = await clientPromise;
	const db = client.db("geets");
	const user = await db.collection("users").findOne({ email });
	return user;
}
// export function UpdateProfile({ user }) {
//     // Utilisez les états locaux pour les valeurs des champs du formulaire
//     const [formValues, setFormValues] = useState({
//       name: user.name,
//       last_name: user.last_name,
//       age: user.age,
//       location: user.location,
//       sexe: user.sexe,
//       experience: user.experience,
//     });
  
//     // Fonction de gestion du changement des champs
//     const handleChange = (e) => {
//       const { name, value } = e.target;
//       setFormValues({ ...formValues, [name]: value });
//     };
  
//     // Fonction pour soumettre les modifications
//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       // Logique pour mettre à jour le profil dans la base de données
//       const client = await clientPromise;
//       const db = client.db("geets");
//       await db.collection("users").updateOne(
//         { email: user.email },
//         { $set: formValues }
//       );
//     };
  
//     return (
//       <form onSubmit={handleSubmit}>
//         <Label>Nom:</Label>
//         <Input
//           type="text"
//           name="name"
//           value={formValues.name}
//           onChange={handleChange}
//         />
//         <Label>Prénom:</Label>
//         <Input
//           type="text"
//           name="last_name"
//           value={formValues.last_name}
//           onChange={handleChange}
//         />
//         <Label>Age:</Label>
//         <Input
//           type="number"
//           name="age"
//           value={formValues.age}
//           onChange={handleChange}
//         />
//         <Label>Localisation:</Label>
//         <Input
//           type="text"
//           name="location"
//           value={formValues.location}
//           onChange={handleChange}
//         />
//         <Label>Sexe:</Label>
//         <Input
//           type="text"
//           name="sexe"
//           value={formValues.sexe}
//           onChange={handleChange}
//         />
//         <Label>Expérience:</Label>
//         <Input
//           type="text"
//           name="experience"
//           value={formValues.experience}
//           onChange={handleChange}
//         />
//         <Button type="submit">Mettre à jour</Button>
//       </form>
//     );
//   }

export default function UpdateProfil({ user }) {
	// Utilisez les états locaux pour les valeurs des champs du formulaire
	const [formValues, setFormValues] = useState({
	  name: user.name,
	  last_name: user.last_name,
	  age: user.age,
	  location: user.location,
	  sexe: user.sexe,
	  experience: user.experience,
	});
  
	// Fonction de gestion du changement des champs
	const handleChange = (e: { target: { name: any; value: any; }; }) => {
	  const { name, value } = e.target;
	  setFormValues({ ...formValues, [name]: value });
	};
  
	// Fonction pour soumettre les modifications
	const handleSubmit = async (e: { preventDefault: () => void; }) => {
	  e.preventDefault();
	  // Logique pour mettre à jour le profil dans la base de données
	  const client = await clientPromise;
	  const db = client.db("geets");
	  await db.collection("users").updateOne(
		{ email: user.email },
		{ $set: formValues }
	  );
	  // Vous pouvez ajouter une gestion des erreurs et des messages de succès ici
	};
  
	return (
	  <form onSubmit={handleSubmit}>
		<div>Nom:</div>
		<Input
		  type="text"
		  name="name"
		  value={formValues.name}
		  onChange={handleChange}
		/>
		<div>Prénom:</div>
		<Input
		  type="text"
		  name="last_name"
		  value={formValues.last_name}
		  onChange={handleChange}
		/>
		<div>Age:</div>
		<Input
		  type="number"
		  name="age"
		  value={formValues.age}
		  onChange={handleChange}
		/>
		<div>Localisation:</div>
		<Input
		  type="text"
		  name="location"
		  value={formValues.location}
		  onChange={handleChange}
		/>
		<div>Sexe:</div>
		<Input
		  type="text"
		  name="sexe"
		  value={formValues.sexe}
		  onChange={handleChange}
		/>
		<div>Expérience:</div>
		<Input
		  type="text"
		  name="experience"
		  value={formValues.experience}
		  onChange={handleChange}
		/>
		<Button type="submit">Mettre à jour</Button>
	  </form>
	);
  }