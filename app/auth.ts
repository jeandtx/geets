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
      async authorize({ email, password }: any ) {
        const user = await getUser(email);

        if (!user || user.length === 0) {
          return null; // Aucun utilisateur trouvé avec cet email
        }

        // Vérifier si les mots de passe correspondent
        const passwordsMatch = await compare(password, user.password!);
        if (passwordsMatch) {
          return { email: user.email, name: user.name };
        } else {
          return null;
        }
      },
    }),
  ],
});
