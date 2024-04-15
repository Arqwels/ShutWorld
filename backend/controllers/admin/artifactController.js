const ArtifactDonate = require("../../models/Donate/artifactModel");
const Image = require("../../models/imagesModel");
const imagesService = require("../../service/imagesService");

class ArtifactController {
  async addArtifact(req, res) {
    try {
      const artifactData = req.body;

      const artifactIdNameCheck = await ArtifactDonate.findOne({ where: { idName: artifactData.idName } });
      if (artifactIdNameCheck) {
        return res.status(400).json({ message: "Артефакт с таким IdName уже существует!" });
      }

      const imageSave = await imagesService.uploadImage(req.file);
      if (imageSave.id === undefined || imageSave.status === false) {
        return res.status(400).json({ message: 'Ошибка при загрузке фото в БД!', errorMessage: imageSave?.message });
      }

      await ArtifactDonate.create({
        idName: artifactData.idName,
        name: artifactData.name,
        price: artifactData.price,
        maxCount: artifactData.maxCount,
        description: artifactData.description,
        imageId: imageSave.id
      });

      res.status(200).json({ message: 'Артефакт успешно добавлен!' })
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Произошла ошибка при добавлении артефакта!' });
    }
  }
}

module.exports = new ArtifactController();