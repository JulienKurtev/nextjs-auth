import { getSession } from "next-auth/react";
import { hashPassword, verifiedPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

export default async function handler(req, res) {
    if(req.method !== 'PATCH'){
        return;
    }

    const session = await getSession({ req });

    if(!session) {
        res.status(401).json({ message: 'Not authenticated!'});
        return;
    }
    
    
    console.log(req.body.oldPassword)

    const userEmail = session.user.email;
    const oldPassword = req.body.oldPassword;
    const newPassowrd = req.body.newPassword;

    const client = await connectToDatabase();

    const userCollection = client.db().collection('users');

    const user = await userCollection.findOne({ email: userEmail});

    if(!user) {
        res.status(404).json({ message: 'User not found!'});
        client.close();
        return;
    }

    const currPass = user.password;

    const isEqual = await verifiedPassword(oldPassword , currPass);

    if(!isEqual) {
        res.status(403).json ({ message: 'Invalid password!'});
        client.close();
        return;
    }

    const hashedPass = await hashPassword(newPassowrd)

    const result = await userCollection.updateOne(
        { email: userEmail},
        { $set : { password: hashedPass }}
    );

    client.close();
    res.status(200).json({message: 'Password updated'});
}