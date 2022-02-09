import { MongoClient } from "mongodb";


export async function connectToDatabase() {
    const client = await MongoClient.connect('mongodb+srv://jkurtev:6KeqLk7J4fPfLifC@cluster0.rovnc.mongodb.net/auth?retryWrites=true&w=majority');

    return client;
}