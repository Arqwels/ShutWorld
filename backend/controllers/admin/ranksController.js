const sequelize =  require('../../db');
const DurationDonate = require("../../models/Donate/durationRanksModel");
const RankDonate = require("../../models/Donate/ranksModel");
const RankService = require("../../service/admin/rankService");

class RanksController {
  async getAllRanks(req, res) {
    try {
      
      const rank =  await RankDonate.findAll({
        include: DurationDonate
      });

      res.json(rank);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Произошла ошибка при получении данных рангов' });
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
      const relativePath = uploadResult.filePath;
      console.log("Относительный путь к загруженному файлу:", relativePath);

      const rank = await RankDonate.create({
        id: rankData.id,
        name: rankData.name,
        description: rankData.description,
        privilege: JSON.parse(rankData.privilege),
        imageUrl: relativePath
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
}

module.exports = new RanksController();
