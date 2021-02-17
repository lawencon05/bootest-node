import { db } from '../config/db.js';
import { v4 } from 'uuid';

export class UserDao {

    async createUser(user) {
        try {
            let params = [v4(), user.email, user.pwd, user.isActive, user.createdBy, "now()", user.roleId];
            let q = await db.query(`INSERT INTO tb_m_users (id, email, pwd, is_active, created_by, created_date, role_id) 
                            VALUES ($1, $2, $3, $4, $5, $6, $7)`, params);
            if (q.err) throw q.err;
        } catch (error) {
            throw error;
        }
    }

    async getByEmail(email) {
        try {
            let params = [email];
            let q = await db.query(`SELECT * FROM tb_m_users WHERE email = $1`, params);
            return q.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async getById(id) {
        try {
            let params = [id];
            let q = await db.query(`SELECT * FROM tb_m_users WHERE id = $1`, params);
            return q.rows[0];
        } catch (error) {
            throw error;
        }
    }

}