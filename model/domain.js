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
            console.log(e);
            return e;
        }finally {
            if (connection) connection.end();
        }
    }


}

module.exports = domain_operation;