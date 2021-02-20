import { db } from '../config/db.js';
import { v4 } from 'uuid';

export class UserDao {

    async createUser(user) {
        try {
            user._id = v4();
            return db().then(d => d.collection('users').insertOne(user));
        } catch (error) {
            throw error;
        }
    }

    async getByEmail(email) {
        try {
            return db().then(d => d.collection('users').findOne({ email: email }));
        } catch (error) {
            throw error;
        }
    }

    async getById(id) {
        try {
            return db().then(d => d.collection('users').findOne({ _id: id }));
        } catch (error) {
            throw error;
        }
    }

}