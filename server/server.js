const express = require("express");
const app = express();
const configExpressServer = require("./config/express");
const routerConfig = require("./config/routes");
const https = require("https");
const fs = require("fs");
const path = require("path");
configExpressServer(app);
app.use("/", routerConfig());
console.log("wt")
app.use(require("./utils/error-handlers"));
let server = https.createServer(
    {
        key: fs.readFileSync(
            path.join(
                __dirname,
                `./ssl/${process.env.NODE_ENV}/${process.env.SSL_KEY_PATH}`
            )
        ),
        cert: fs.readFileSync(
            path.join(
                __dirname,
                `./ssl/${process.env.NODE_ENV}/${process.env.SSL_CRT_PATH}`
            )
        )
    },
);
server.listen(process.env.PORT, () => {
    console.log(`Server running on port: ${process.env.PORT}`)
});