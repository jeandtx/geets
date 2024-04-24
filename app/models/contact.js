import { MongoClient } from "mongodb";
//connection logic
let db;
const client = new MongoClient(process.env.MONGODB_URI);
client.connect().then(client => {
    db = client.db(); 
});

class Contact {
    static async create(data) {
        try {
            // Validation de base, vous pouvez étendre cela selon vos besoins
            if (!data.fullname || data.fullname.length < 3 || data.fullname.length > 50) {
                throw new Error("Fullname must be between 3 and 50 characters");
            }
            if (!data.email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) {
                throw new Error("Invalid email format");
            }
            if (!data.message) {
                throw new Error("Message is required");
            }

            const result = await db.collection('posts').insertOne({
                ...data,
                date: data.date || new Date() // should change to have to good utc
            });
            return result;
        } catch (error) {
            throw error;
        }
    }
}

export default Contact;
