const db_pool = require('./database');

class domain_operation{

    static async list_domain(keyword){
        let connection;
        try {
             connection = await db_pool.getConnection();
            if (keyword === undefined){
                return await connection.query('SELECT * FROM `domains`');
            }else{
                return await connection.query('SELECT * FROM `domains` WHERE `domain` LIKE ?', ['%'+ keyword +'%']);
            }
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
            if (domain_name === undefined){

            }else{
                return await connection.query('INSERT INTO `domains` (`domain`) VALUES (?)');
            }
        }catch (e) {
            throw e;
        }finally {
            if (connection) connection.end();
        }
    }

}

module.exports = domain_operation;