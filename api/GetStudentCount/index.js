const sql = require('mssql');

module.exports = async function (context, req) {
    const config = {
        user: process.env.SQL_USER,
        password: process.env.SQL_PASSWORD,
        server: process.env.SQL_SERVER,
        database: process.env.SQL_DATABASE,
        options: { encrypt: true }
    };

    try {
        await sql.connect(config);
        const result = await sql.query(`
            SELECT Country, COUNT(*) AS StudentCount
            FROM Students
            GROUP BY Country
        `);

        context.res = {
            status: 200,
            body: result.recordset
        };
    } catch (err) {
        context.res = {
            status: 500,
            body: err.message
        };
    }
};
