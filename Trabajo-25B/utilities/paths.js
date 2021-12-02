import {fileURLToPath} from "url";
import {join,dirname} from "path";

const ROOTPATH = `${dirname(fileURLToPath(import.meta.url))}/..`;

const Joiner = (dirfile) => {
    return join(ROOTPATH,dirfile);
};

export default Joiner;