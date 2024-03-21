const sequelize =  require('../../db');
const DurationDonate = require("../../models/Donate/durationRanksModel");
const RankDonate = require("../../models/Donate/ranksModel");
const Image = require('../../models/imagesModel');
const imagesService = require('../../service/imagesService');

class RanksController {
  async getAllRanks(req, res) {
    try {
      
      const rank = await RankDonate.findAll({
        include: [
          DurationDonate,
          Image
        ]
      });

      res.json(rank);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Произошла ошибка при получении данных рангов' });
    }
  }

  async getOneRank(req, res) {
    try {
      const rank = await RankDonate.findByPk(req.query.rankId, {
        include: DurationDonate
      })
      res.status(200).json(rank);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка при получении 1 Ранга!' });
    }
  }

  async addRank(req, res) {
    let transaction;
    try {
      transaction = await sequelize.transaction();
      const rankData = req.body;

      const rankIdCheck = await RankDonate.findByPk(rankData.id)
      if (rankIdCheck) {
        return res.status(400).json({ message: "Донат с таким Id уже существует!" });
      }

      const imageSave = await imagesService.uploadImage(req.file);
      if (imageSave.id === undefined || imageSave.status === false) {
        return res.status(400).json({ message: 'Ошибка при загрузке фото в БД!', errorMessage: imageSave?.message });
      }

      await RankDonate.create({
        id: rankData.id,
        name: rankData.name,
        description: rankData.description,
        privilege: JSON.parse(rankData.privilege),
        imageId: imageSave.id,
        weight: rankData.weight
      }, { transaction });

      const durations = JSON.parse(rankData.durations);
      await Promise.all(durations.map(async (durationData) => {
      await DurationDonate.create({
        duration: durationData.duration,
        labelDuration: durationData.labelDuration,
        price: durationData.price,
        rankId: rankData.id
      }, { transaction });
      }));

      await transaction.commit();
      res.status(200).json({ message: 'Ранг успешно добавлен!' })
    } catch (error) {
      if (transaction) await transaction.rollback();
      console.error(error);
      res.status(500).json({ message: 'Произошла ошибка при добавлении ранга!' });
    }
  }

  async deleteRank(req, res) {
    try {
      const rankId = req.params.rankId;
      if(!rankId) {
        return res.status(400).json({message: 'Вы не передали значение ранга!'})
      }

      const resultFind = await RankDonate.findByPk(rankId);
      if(!resultFind) {
        return res.status(400).json({message: `Ранг с название ${rankId} не найден!`})
      }

      const imageId = resultFind.dataValues.imageId || resultFind.imageId;
      const deleteImage = await imagesService.deleteImage(imageId);
      if(!deleteImage) {
        return res.status(400).json({ status: false, message: 'Ошибка при удалении фото!', error: resImg.error})
      }
      
      await RankDonate.destroy({ where: { id: rankId }}, {
        include: DurationDonate
      })

      res.status(200).json({message: `Ранг ${rankId} успешно удалён`})
    } catch (error) {
      console.error(error);
      res.status(500).json({message: 'Ошибка при удаление Ранга!'});
    }
  }

  async updateRank(req, res) {
    try {
      const { rankId, name, description, durationDonates } = req.body;

      if (!rankId || !name || !description || !durationDonates || !durationDonates.length) {
        return res.status(400).json({ message: 'Некорректные данные для обновления ранга.' });
      }

      await RankDonate.update(
        { name, description },
        { where: { id: rankId } }
      );

      for (const donate of durationDonates) {
        if (!donate.id || !donate.duration || !donate.labelDuration || !donate.price) {
          console.error(`Пропущено обновление данных для ранга ${rankId}. Некорректные данные продолжительности и стоимости.`);
          continue;
        }

        await DurationDonate.update(
          { duration: donate.duration, labelDuration: donate.labelDuration, price: donate.price },
          { where: { id: donate.id } }
        );
      }

      console.log(`Данные для ранга ${rankId} успешно обновлены.`);
      return res.status(200).json({ message: 'Данные успешно обновлены.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({message: 'Ошибка при обновлении данных о Ранге!'});
    }
  }
}

module.exports = new RanksController();
