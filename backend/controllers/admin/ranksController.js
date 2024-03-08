const sequelize =  require('../../db');
const DurationDonate = require("../../models/Donate/durationRanksModel");
const RankDonate = require("../../models/Donate/ranksModel");
const RankService = require("../../service/admin/rankService");

class RanksController {
  async getAllRanks(req, res) {
    try {
      
      const rank = await RankDonate.findAll({
        include: DurationDonate
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
      const { imageFile } = req.files;
      const rankData = req.body;

      const rankIdCheck = await RankDonate.findByPk(rankData.id)
      if (rankIdCheck) {
        return res.status(400).json({ message: "Донат с таким Id уже существует!" });
      }

      const uploadResult = await RankService.imageUpload(imageFile);
      if (uploadResult.error) {
        return res.status(400).json({ message: uploadResult.error });
      }
      const imageName = uploadResult.fileName;

      const rank = await RankDonate.create({
        id: rankData.id,
        name: rankData.name,
        description: rankData.description,
        privilege: JSON.parse(rankData.privilege),
        imageUrl: imageName
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
      
      await RankDonate.destroy({ where: { id: rankId }}, {
        include: DurationDonate
      })

      res.status(200).json({message: `Ранг ${rankId} успешно удалён`})
    } catch (error) {
      console.error(error);
      res.status(500).json({message: 'Ошибка при удаление Ранга!'});
    }
  }
}

module.exports = new RanksController();
