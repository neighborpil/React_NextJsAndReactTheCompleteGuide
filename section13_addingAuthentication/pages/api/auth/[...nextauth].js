import NextAuth from "next-auth";
// import Providers from "next-auth/react";
import CredentialsProvider from "next-auth/providers/credentials"
import {connectToDatabase} from "../../../lib/db";
import {verifyPassword} from "../../../lib/auth";

export default NextAuth({
    session: {
        jwt: true

    },
    // Configure one or more authentication providers
    providers: [
        // CredentialsProvider({
        //     // The name to display on the sign in form (e.g. 'Sign in with...')
        //     async authorize(credentials) {
        //         const client = await connectToDatabase();
        //
        //         const usersCollection = client.db().collection('users');
        //         const user = await usersCollection.findOne({email: credentials.email});
        //
        //         if (!user) {
        //             client.close();
        //             throw new Error('No user found!');
        //         }
        //
        //         const isValid = await verifyPassword(credentials.password, user.password);
        //
        //         if(!isValid) {
        //             client.close();
        //             throw new Error('Could not log you in!');
        //         }
        //
        //         return {
        //             email: user.email
        //         }
        //
        //         client.close();
        //     }
        // })
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Email" },
                password: { label: "Password", type: "password" }
            },
            // The name to display on the sign in form (e.g. 'Sign in with...')
            async authorize(credentials) {
                const client = await connectToDatabase();

                const usersCollection = client.db().collection('users');
                const user = await usersCollection.findOne({email: credentials.email});
                console.log("1")

                if (!user) {
                    client.close();
                    throw new Error('No user found!');
                }

                console.log("2")
                const isValid = await verifyPassword(credentials.password, user.password);

                console.log("3")
                if(!isValid) {
                    client.close();
                    throw new Error('Could not log you in!');
                }

                console.log("4`")
                return {
                    email: user.email
                }

                client.close();
            }
        })
    ]
});