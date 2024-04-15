const Router = require('express');
const artifactController = require('../controllers/artifactController');
const router = new Router();

// http://localhost:5000/api/artifact/get-all-artifact
router.get('/get-all-artifact', artifactController.getAllArtifact);

module.exports = router;