const ArtifactDonate = require("../models/Donate/artifactModel");

class ArtifactController {
  async getAllArtifact(req, res) {
    try {
      const artifact = await ArtifactDonate.findAll();
      res.status(200).json(artifact);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Произошла ошибка при получении данных рангов.' });
    }
  }

  async getOneArtifact(req, res) {
    try {
      if(!req.query.idName) {
        return res.status(400).json({ message: 'Ошибка при передачи данных.' })
      }

      const artifact = await ArtifactDonate.findOne({ where: { idName: req.query.idName }});
      if(!artifact) {
        return res.status(400).json({ message: `Артефакт ${req.query.idName} не найден.` })
      }

      res.status(200).json(artifact);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка при получении артефакта.' });
    }
  }
}

module.exports = new ArtifactController();