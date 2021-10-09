export const CONFIG = {
    port : process.env.PORT || 8080,
};

export const SQLITE_CONFIG = {
    client : "sqlite3",
    connection : {
        filename : "../db/mensajes.db"
    },
    useNullAsDefault : true,
};