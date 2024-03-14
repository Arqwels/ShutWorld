const DurationDonate = require("../models/Donate/durationRanksModel");
const RankDonate = require("../models/Donate/ranksModel");

class GetRanksController {
  async getRanks(req, res) {
    try {
      const rank =  await RankDonate.findAll({
        include: DurationDonate
      });
      res.status(200).json(rank);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Ошибка при получении Рангов!' });
    }
  }
}

module.exports = new GetRanksController();