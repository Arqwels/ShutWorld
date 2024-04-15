const ArtifactDonate = require("../models/Donate/artifactModel");

class ArtifactController {
  async getAllArtifact(req, res) {
    try {
      const artifact = await ArtifactDonate.findAll();
      res.status(200).json(artifact);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Произошла ошибка при получении данных рангов' });
    }
  }
}

module.exports = new ArtifactController();