import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { compare } from 'bcrypt-ts';
import { getUser } from '@/app/db';
import { authConfig } from '@/app/auth.config';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials: Partial<{ email: string; password: string }>) {
        const user = await getUser(credentials.email as string);

        if (!user) {
          return null; // Aucun utilisateur trouvé avec cet email
        }

        // Vérifier si les mots de passe correspondent
        const passwordsMatch = await compare(credentials.password as string, user.password);
        if (passwordsMatch) {
          return { email: user.email, name: user.pseudo }; // Assure que le nom est correctement renvoyé
        } else {
          return null;
        }
      },
    }),
  ],
});
