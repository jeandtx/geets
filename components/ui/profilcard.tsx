import { useEffect, useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'; 
import { getUser } from '@/lib/actions'; 
import { User } from '@/types/tables'; 

interface ProfileCardProps {
    email: string;
    role: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ email, role }) => {
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
                    <AvatarImage src="https://avatars.githubusercontent.com/u/124599?v=4" alt="Anonymous" />
                    <AvatarFallback>{email.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="ml-4">
                    <div className="text-xl font-bold">{email}</div>
                    <div className="text-sm text-gray-500">{role}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center p-4 bg-white shadow-md rounded-lg">
            <Avatar>
                <AvatarImage src={user.media || ''} alt={user.first_name || 'Anonymous'} />
                <AvatarFallback>{user.email?.charAt(0).toUpperCase() || 'A'}</AvatarFallback>
            </Avatar>
            <div className="ml-4">
                <div className="text-xl font-bold">{user.email || 'Anonymous'}</div>
                <div className="text-sm text-gray-500">{role}</div>
            </div>
        </div>
    );
};

export default ProfileCard;
