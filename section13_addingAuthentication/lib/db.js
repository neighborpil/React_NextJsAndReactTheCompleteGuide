import { MongoClient } from 'mongodb';
import localFont from "next/dist/compiled/@next/font/dist/local";

export async function connectToDatabase() {
    const client = await MongoClient.connect('mongodb+srv://neighborpil-auth:BldJr5fmeS53RKmk@cluster0.yjchtin.mongodb.net/?retryWrites=true&w=majority')

    return client;
}