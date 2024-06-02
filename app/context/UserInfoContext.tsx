"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { getUser } from '@/lib/data/user'; 

interface User {
  _id: string;
  email: string;
  password: string;
  pseudo?: string;
  projectIds?: string[];
  labels?: string[];
  media?: string;
  first_name?: string;
  lastName?: string;
  birth_date: Date;
  localisation?: string;
  gender?: string;
  experience?: string;
  available?: boolean;
  mobile?: string;
  allowEmails?: boolean;
  created?: Date;
}

interface UserInfoContextType {
  userInfo: User | null;
  status: 'loading' | 'authenticated' | 'unauthenticated';
}

const UserInfoContext = createContext<UserInfoContextType | undefined>(undefined);

export const UserInfoProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status: sessionStatus } = useSession();
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [status, setStatus] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading');

  useEffect(() => {
    if (sessionStatus === 'loading') {
      setStatus('loading');
      return;
    }

    if (session?.user?.email) {
      const fetchUserInfo = async () => {
        try {
          const user = await getUser(session?.user?.email!);
          setUserInfo(user);
          setStatus('authenticated');
        } catch (error) {
          setStatus('unauthenticated');
        }
      };

      fetchUserInfo();
    } else {
      setStatus('unauthenticated');
    }
  }, [session, sessionStatus]);

  return (
    <UserInfoContext.Provider value={{ userInfo, status }}>
      {children}
    </UserInfoContext.Provider>
  );
};

export const useUserInfo = (): UserInfoContextType => {
  const context = useContext(UserInfoContext);
  if (context === undefined) {
    throw new Error('useUserInfo must be used within a UserInfoProvider');
  }
  return context;
};
