const express = require("express");

const githubRoute = require("./github.route");

const router = express.Router();

router.use("/github", githubRoute);

module.exports = router;
