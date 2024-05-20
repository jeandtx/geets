import { useEffect, useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'; 
import { getUser } from '@/lib/actions'; 
import { User } from '@/types/tables'; 

interface ProfileCardProps {
    email: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ email }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const fetchedUser: User = await getUser(email);
                setUser(fetchedUser);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();
    }, [email]);

    if (!user) {
        return (
            <div className="flex items-center p-4 bg-white shadow-md rounded-lg">
                <Avatar>
                    <AvatarImage src="https://avatars.githubusercontent.com/u/124599?v=4" alt="n" />
                    <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <div className="ml-4">
                    <div className="text-xl font-bold">{email}</div>
                    <div className="text-sm text-gray-500">Membre anonyme</div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center p-4 bg-white shadow-md rounded-lg">
            <Avatar>
                <AvatarImage src={user.media || ''} alt={user.first_name || 'Anonymous'} />
                <AvatarFallback>{user.email?.charAt(0) || 'A'}</AvatarFallback>
            </Avatar>
            <div className="ml-4">
                <div className="text-xl font-bold">{user.email || 'Anonymous'}</div>
                <div className="text-sm text-gray-500">Membre du projet</div>
            </div>
        </div>
    );
};

export default ProfileCard;
