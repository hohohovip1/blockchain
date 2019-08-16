const fs = require("fs-extra");
const path = require("path");

const listDirFiles = ["assets"];
const source = "../public";


Promise.all(listDirFiles.map(item => fs.copy(path.resolve(__dirname, source + "/" + item), path.resolve(__dirname,"../" + process.env.STATIC_DIR + "/" + item), {overwrite: true})))
    .then(() => console.log("success"))
    .catch((err) => console.log(err))
;
