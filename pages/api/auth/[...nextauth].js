import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import { verifiedPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

export default NextAuth({
    session: { 
        jwt: true
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                const client = await connectToDatabase();

                const usersCollection = client.db().collection('users');

                const user = await usersCollection.findOne({ email: credentials.email });

                if(!user) {
                    client.close();
                    throw new Error('No user found!');
                }

                const isValid = await verifiedPassword(credentials.password, user.password);

                if(!isValid){
                    client.close();
                    throw new Error('Wrong password!');
                }

                client.close();
                return { email: user.email };
            }
        })
    ]
});