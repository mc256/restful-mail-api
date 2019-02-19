const db_pool = require('./database');

class transport_operation{
    static async add(source_domain, destination_domain){
        let connection;
        try {
            connection = await db_pool.getConnection();
            let result = await connection.query('INSERT INTO `transport` (`domain`, `transport`) VALUES (?, ?) ON DUPLICATE KEY UPDATE `transport` = ?;',
                [
                    source_domain,
                    destination_domain,
                    destination_domain,
                ]
            );
            return JSON.stringify({affectedRows: result.affectedRows});
        }catch (e) {
            throw e;
        }finally {
            if (connection) connection.end();
        }
    }

    static async list(source_keyword = '', destination_keyword = '', offset = 0) {
        let connection;
        try {
            connection = await db_pool.getConnection();
            let result;
            result = await connection.query('SELECT * FROM `transport` WHERE `domain` LIKE ? AND `transport` LIKE ? LIMIT ? OFFSET ?',
                [
                    '%' + source_keyword + '%',
                    '%' + destination_keyword + '%',
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


    static async delete(source_domain, destination_domain){
        let connection;
        try {
            connection = await db_pool.getConnection();
            let result = await connection.query('DELETE FROM `transport` WHERE `transport`.`domain` = ? AND `transport`.`transport` = ?',
                [
                    source_domain,
                    destination_domain
                ]
            );
            return JSON.stringify({affectedRows: result.affectedRows});
        }catch (e) {
            throw e;
        }finally {
            if (connection) connection.end();
        }
    }
}

module.exports = transport_operation;