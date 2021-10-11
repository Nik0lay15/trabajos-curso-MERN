export const CONFIG = {
    port : process.env.PORT || 8080,
};

export const SQLITE_CONFIG = {
    client : "sqlite3",
    connection : {
        filename : "./db/mensajes.sqlite"
    },
    useNullAsDefault : true,
};

export const MYSQL_CONFIG = {
    client : "mysql",
    connection : {
        host : "127.0.0.1",
        port : 3306,
        user : "root",
        password : "",
        database : "productos"
    }
}
