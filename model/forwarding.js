const db_pool = require('./database');

class forwarding_operation{
    static async list(source_keyword = '', destination_keyword = '', offset = 0) {
        let connection;
        try {
            connection = await db_pool.getConnection();
            let result;
            result = await connection.query('SELECT * FROM `forwardings` WHERE `source` LIKE ? AND `destination` LIKE ? LIMIT ? OFFSET ?',
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


    static async add(source_account, destination_account){
        let connection;
        try {
            connection = await db_pool.getConnection();
            let result = await connection.query('INSERT INTO `forwardings` (`source`, `destination`) VALUES (?, ?) ON DUPLICATE KEY UPDATE `destination` = ?;',
                [
                    source_account,
                    destination_account,
                    destination_account,
                ]
            );
            return JSON.stringify({"affectedRows": result.affectedRows});
        }catch (e) {
            throw e;
        }finally {
            if (connection) connection.end();
        }
    }

    static async delete(source_account, destination_account){
        let connection;
        try {
            connection = await db_pool.getConnection();
            let result = await connection.query('DELETE FROM `forwardings` WHERE `forwardings`.`source` = ? AND `forwardings`.`destination` = ?',
                [
                    source_account,
                    destination_account
                ]
            );
            return JSON.stringify({"affectedRows": result.affectedRows});
        }catch (e) {
            throw e;
        }finally {
            if (connection) connection.end();
        }
    }


}

module.exports = forwarding_operation;