const db_pool = require('./database');

class user_operation{

    static async add(email, password){
        let connection;
        try {
            connection = await db_pool.getConnection();
            let result = await connection.query('INSERT INTO `users` (`email`, `password`) VALUES (?, ENCRYPT(?));', [email, password]);
            return JSON.stringify({affectedRows: result.affectedRows});
        }catch (e) {
            if (e.code.toString() === 'ER_DUP_ENTRY'){
                return JSON.stringify({affectedRows:0});
            }
            throw e;
        }finally {
            if (connection) connection.end();
        }
    }

    static async update_password(email, password){
        let connection;
        try {
            connection = await db_pool.getConnection();
            let result = await connection.query('UPDATE `users` SET `password` = ? WHERE `users`.`email` = ?;', [password, email]);
            return JSON.stringify({affectedRows: result.affectedRows});
        }catch (e) {
            throw e;
        }finally {
            if (connection) connection.end();
        }
    }

    static async delete(email){
        let connection;
        try {
            connection = await db_pool.getConnection();
            let result = await connection.query('DELETE FROM `users` WHERE `users`.`email` = ?', [email]);
            return JSON.stringify({affectedRows: result.affectedRows});
        }catch (e) {
            throw e;
        }finally {
            if (connection) connection.end();
        }
    }
}

module.exports = user_operation;