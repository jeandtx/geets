import BackButton from "@/components/ui/backbutton";
import { MoveLeft } from "lucide-react";

export default function Tonnage() {
    return (
        <div>
            <BackButton className="absolute top-4 left-4 p-2   hover:bg-gray-300 text-black"><MoveLeft className="h-10 w-10"/></BackButton>
            <h1>ça arrive bientôt la team 😉</h1>
        </div>
    );
}