const ArtifactDonate = require("../../models/Donate/artifactModel");
const Image = require("../../models/imagesModel");
const imagesService = require("../../service/imagesService");

class ArtifactController {
  async addArtifact(req, res) {
    try {
      const artifactData = req.body;

      const artifactIdNameCheck = await ArtifactDonate.findOne({ where: { idName: artifactData.idName } });
      if (artifactIdNameCheck) {
        return res.status(400).json({ message: "Артефакт с таким IdName уже существует." });
      }

      const imageSave = await imagesService.uploadImage(req.file);
      if (imageSave.id === undefined || imageSave.status === false) {
        return res.status(400).json({ message: 'Ошибка при загрузке фото в БД.', errorMessage: imageSave?.message });
      }

      await ArtifactDonate.create({
        idName: artifactData.idName,
        name: artifactData.name,
        price: artifactData.price,
        maxCount: artifactData.maxCount,
        description: artifactData.description,
        imageId: imageSave.id
      });

      res.status(200).json({ message: 'Артефакт успешно добавлен.' })
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Произошла ошибка при добавлении артефакта.' });
    }
  }

  async deleteArtifact(req, res) {
    try {
      const artifactId = req.params.artifactId;
      if(!artifactId) {
        return res.status(400).json({ message: 'Значение не задано.' })
      }

      const resultFind = await ArtifactDonate.findOne({ where: { idName: artifactId } });
      if(!resultFind) {
        return res.status(400).json({ message: `Артефакт ${artifactId} не найден.` })
      }

      const imageId = resultFind.dataValues.imageId || resultFind.imageId;
      const deleteImage = await imagesService.deleteImage(imageId);
      if(!deleteImage) {
        return res.status(400).json({ status: false, message: 'Ошибка при удалении фото.', error: resImg.error })
      }

      await ArtifactDonate.destroy({ where: { idName: artifactId } })

      res.status(200).json({ message: `Артефакт ${artifactId} успешно удалён` })
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Произошла ошибка при удалении артефакта.' });
    }
  }

  async updateArtifact(req, res) {
    try {
      const { id, idName, name, price, maxCount, description } = req.body;

      if(!id || !idName || !name || !price || !maxCount || !description) {
        return res.status(400).json({ message: 'Некорректные данные для обновления артефакта.' });
      }

      const findArtifact = await ArtifactDonate.findByPk(id);
      if(!findArtifact) {
        return res.status(400).json({ message: 'Артефакт не найден.' })
      }

      await ArtifactDonate.update(
        { idName, name, price, maxCount, description },
        { where: { id: id } }
      );

      res.status(200).json({ message: 'Данные успешно обновлены.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Произошла ошибка при обновлении артефакта.' });
    }
  }
}

module.exports = new ArtifactController();