const db_pool = require('./database');

class domain_operation{

    static async list_domain(keyword = '', offset = 0) {
        let connection;
        try {
            connection = await db_pool.getConnection();
            let result;
            result = await connection.query('SELECT * FROM `domains` WHERE `domain` LIKE ? LIMIT ? OFFSET ?',
                [
                    '%' + keyword + '%',
                    parseInt(process.env.DEFAULT_PAGE_SIZE),
                    offset
                ]
            );
            return JSON.stringify(result);
        }catch (e) {
            throw e;
        }finally {
            if (connection) connection.end();
        }
    }

    static  async add_domain(domain_name){
        let connection;
        try {
            connection = await db_pool.getConnection();
            let result = await connection.query('INSERT INTO `domains` (`domain`) VALUES (?);', [domain_name]);
            return JSON.stringify({"affectedRows": result.affectedRows});
        }catch (e) {
            if (e.code.toString() === 'ER_DUP_ENTRY'){
                return JSON.stringify({"affectedRows":0});
            }
            throw e;
        }finally {
            if (connection) connection.end();
        }
    }

    static async delete_domain(domain_name){
        let connection;
        try {
            connection = await db_pool.getConnection();
            let result = await connection.query('DELETE FROM `domains` WHERE `domains`.`domain` = ?', [domain_name]);
            return JSON.stringify({"affectedRows": result.affectedRows});
        }catch (e) {
            throw e;
        }finally {
            if (connection) connection.end();
        }
    }

}

module.exports = domain_operation;