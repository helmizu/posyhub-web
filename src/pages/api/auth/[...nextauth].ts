import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import callApi from '@/utils/network';
import { ILoginParams } from '@/types/auth';
import { AxiosRequestConfig } from 'axios';
import { AuthOptions } from 'next-auth';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'Masukkan username',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Masukkan password',
        },
      },
      async authorize(credentials, req) {
        try {
          const payload: ILoginParams = {
            username: credentials?.username as string,
            password: credentials?.password as string,
          };
          const requestConfig: AxiosRequestConfig = {
            method: 'POST',
            baseURL: process.env.API_BASE_URL,
            url: '/login',
            data: payload,
            auth: {
              username: process.env.BASIC_USERNAME || '',
              password: process.env.BASIC_PASSWORD || '',
            },
          };
          const user = await callApi(requestConfig);
          return user;
        } catch (error: any) {
          throw new Error(error?.message);
        }
      },
    }),
  ],
  session: {
    maxAge: 5 * 60 * 60,
  },
  secret: process.env.JWT_SECRET || 'secret',
  pages: {
    signIn: '/login',
    error: '/login'
  },
  callbacks: {
    async jwt({ token, user, account }: any) {
      if (token || user || account) return { ...token, ...user, ...account };
      return null;
    },
    async session({ session, token, user }: any) {
      session.user.accessToken = token?.token;
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
  theme: {
    colorScheme: 'auto', // "auto" | "dark" | "light"
    brandColor: '#fff', // Hex color code
  },
  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === 'development',
};

export default NextAuth(authOptions);
