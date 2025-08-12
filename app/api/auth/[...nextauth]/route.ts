import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { LaravelLoginResponse } from "@/lib/types"
import axios from "axios"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
            email: credentials?.email,
            password: credentials?.password,
          })

          const result: LaravelLoginResponse = response.data

          if (result.success && result.data) {
            return {
              id: result.data.user.id.toString(),
              email: result.data.user.email,
              name: result.data.user.name,
              role: result.data.user.is_admin ? 'admin' : 'user',
              token: result.data.token,
            }
          }
          
          return null
        } catch (error) {
          console.error('Login error:', error)
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.accessToken = user.token
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role
        session.accessToken = token.accessToken
      }
      return session
    }
  },
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
})

export { handler as GET, handler as POST }
