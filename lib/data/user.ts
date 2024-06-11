
'use server'
import clientPromise from '@/lib/mongodb'
import { User } from '@/types/tables'
import { ObjectId } from 'mongodb';


/**
 * Retrieves a user with the mail from the database.
 * @param {string} email - The email of the user to retrieve.
 * @returns {Promise<User>} A promise that resolves to the user.
    */
export async function getUser(email: string) {
    const client = await clientPromise
    const db = client.db('geets')
    const user = await db.collection('users').findOne({
        email
    })
    const data: User = JSON.parse(JSON.stringify(user)) // Remove ObjectID (not serializable)
    return data
}

/**
 * Retrieves a user with the id from the database.
 * @param {string} id - The id of the user to retrieve.
 * @returns {Promise<User>} A promise that resolves to the user.
    */
export async function getUserById(id: string) {
    console.log('id', id)
    const client = await clientPromise
    const db = client.db('geets')
    const user = await db.collection('users').findOne({
        _id: new ObjectId(id)
    })
    const data: User = JSON.parse(JSON.stringify(user)) // Remove ObjectID (not serializable)
    return data
}

/**
 * Update user information in the database
 * @param {string} email - The email of the user to update.
 * @param {User} user - The user to update. {
  firstName: 'tristan',
  lastName: 'duong',
  phoneNumber: '5',
  pseudo: 'tr',
  age: 3,
  location: 'paris',
  gender: 'hamster',
  experience: 2,
  available: false,
  mobile: '3',
  allowEmails: false

}
    * @returns {Promise<User>} A promise that resolves to the updated user.
 */
export async function updateUser(email: string, user: Partial<User>) {
    const client = await clientPromise
    const db = client.db('geets')
    const updatedUser = await db.collection('users').updateOne({
        email
    }, {
        $set: user
    })
    console.log('updatedUser', updatedUser)
    return 
}
    
