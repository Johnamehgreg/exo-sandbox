import { env } from '@/env';
import { routes } from '@/lib/routes';
import { SessionUser } from '@/types/auth';
import axios from 'axios';
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import type { NextAuthOptions } from 'next-auth';
import { getServerSession, type DefaultSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// You'll need to import and pass this
// to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: SessionUser & DefaultSession['user'];
    token: string;
  }
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const apiUrl = `${env.NEXT_PUBLIC_API_URL}/user/login`;
        return (
          axios
            .post(apiUrl, {
              email: credentials?.email,
              password: credentials?.password,
            })
            .then((response) => {
              return response.data;
            })
            .catch((error) => {
              throw new Error(error?.response?.data?.message);
            }) ?? null
        );
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;

        // @ts-expect-error typescript doesn't know that user has a token property
        token.token = user.token;
        // @ts-expect-error typescript doesn't know that user has a token property
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        // @ts-expect-error unknown error
        session.user = token?.user;
        // @ts-expect-error unknown error
        session.token = token?.token;
        // @ts-expect-error unknown error
        session.refreshToken = token?.refreshToken;
      }
      return session;
    },
  },
  debug: env.NODE_ENV === 'development',
  secret: env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: routes.auth.login,
  },
} satisfies NextAuthOptions;

// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}
