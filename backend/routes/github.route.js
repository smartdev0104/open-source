const express = require("express");
const router = express.Router();

const githubController = require("../controllers/github.controller");

router.get("/repos/:org", githubController.getReposByOrg);
router.get("/commits/:org/:repo", githubController.getCommitsByRepo);

module.exports = router;
