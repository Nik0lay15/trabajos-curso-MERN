import APP from "../app/app.js";
import {CONFIG} from "../options/globals.js";

const server = APP.listen(CONFIG.port,()=>{
    console.log("Server up",CONFIG.port);
})
