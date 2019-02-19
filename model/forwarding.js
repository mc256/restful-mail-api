const db_pool = require('./database');

class forwarding_operation{
    static async list(source_keyword = '', destination_keyword = '', offset = 0, page_size = parseInt(process.env.DEFAULT_PAGE_SIZE)) {
        let connection;
        try {
            connection = await db_pool.getConnection();
            let result;
            result = await connection.query('SELECT * FROM `forwardings` WHERE `source` LIKE ? AND `destination` LIKE ? LIMIT ? OFFSET ?',
                [
                    '%' + source_keyword + '%',
                    '%' + destination_keyword + '%',
                    page_size,
                    offset
                ]
            );
            let count;
            count = await connection.query('SELECT COUNT(*) AS count FROM `domains`');
            return {
                data: result,
                page: {
                    current: offset,
                    pageSize: page_size,
                    total: count[0].count
                }
            };
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
            return {affectedRows: result.affectedRows};
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
            return {affectedRows: result.affectedRows};
        }catch (e) {
            throw e;
        }finally {
            if (connection) connection.end();
        }
    }


}

module.exports = forwarding_operation;