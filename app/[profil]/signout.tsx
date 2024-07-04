
import { signOut } from "@/app/auth";
import { Button } from "@/components/ui/button";

export default function SignOut() {
    return (
        <form
            action={async () => {
                "use server";
                await signOut();
            }}
        >
            <Button variant={"outline"} type="submit" className="mt-6">
                Sign out
            </Button>
        </form>
    );
}