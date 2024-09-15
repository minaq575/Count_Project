// libs/mysql.tsx
import mysql from 'mysql2/promise'

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_SCHEMA,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, 
    idleTimeout: 60000, 
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    port: 4000,                         // TiDB Cloud port, usually 4000
    ssl: {
        ca: process.env.TIDB_SSL_CA,    // SSL certificate for secure connection

    }

})
export default pool 




