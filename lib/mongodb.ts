import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

declare const global: any; // Add this line to explicitly define the type of the global variable

if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable to preserve the client across module reloads
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    // In production mode, it's best to not use a global variable
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export default clientPromise;
