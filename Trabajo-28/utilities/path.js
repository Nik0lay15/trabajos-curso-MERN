import {dirname,join} from "path";
import {fileURLToPath} from "url";

const ROOTPATH =`${dirname(fileURLToPath(import.meta.url))}/..`;

const Joiner = (dirfile) => {
    return (join(ROOTPATH,dirfile));
};

export default Joiner;
