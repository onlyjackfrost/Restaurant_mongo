const { Router } = require("express");
const bodyParser = require("body-parser");
const main = require("./main");

const apiRouter = Router();

apiRouter.use(bodyParser.urlencoded({ extended: true }));
apiRouter.use(main);
module.exports = apiRouter;
